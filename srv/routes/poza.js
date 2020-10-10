'use strict';

module.exports = function (app, lib, api) {
    lib.createDb('eportal').then(db => {
        var findObjectById = function (req, res, collection) {
            var find = db.get(collection)
                .find({ id: req.query.id })
                .value();
            if (!find) return res.status(500).send('Nespravne ID!');
            res.send(Object.assign({}, find));
        };

        var saveObjectById = function (req, res, collection) {
            var objId = db.get(collection)
                .find({ id: req.body.id })
                .assign(req.body)
                .write()
            res.status(200).send({ status: 'o.k.' });
        };

        var listOfObjects = function (req, res, collection) {
            if (req.query.page) {
                const result = {
                    "items": [],
                    "total": 0
                }

                let query = db.get(collection);
                if (req.query.search) {
                    let re = new RegExp('^' + req.query.search, 'i');
                    switch (collection) {
                        case 'courses':
                        case 'certificates':
                            query = query.filter(record => re.test(record.name));
                            break;
                        case 'meetings':
                        case 'closeouts':
                        case 'reviews':
                            // query = query.filter(record => record.published && re.test(record.name));
                            query = query.filter(record => re.test(record.name));
                            break;
                        case 'projects':
                            query = query.filter(record => re.test(record.projectName));
                            break;
                    }
                }

                query = query.value();

                var { id, page, limit } = req.query;
                var pid = 0;
                page = parseInt(page);
                limit = parseInt(limit);

                for (var i = 0; i <= 20; i++) {
                    query.forEach(item => {
                        var x = Object.assign({}, item);
                        ++pid;
                        if ((pid > (page - 1) * limit) && (pid <= page * limit)) {
                            result.items.push(x);
                        }
                        result.total++;
                    })
                }
                res.send(result)
            } else {
                var items = [];
                var count = 0;

                db.get(collection).value().forEach(item => {
                    if (++count < 6) {
                        switch (collection) {
                            case 'courses':
                            case 'certificates':
                            case 'projects':

                                var x = Object.assign({}, item);
                                items.push(x);
                                break;
                            case 'meetings':
                            case 'closeouts':
                            case 'reviews':
                                // if (item.published || (item.evaluated && item.evaluated.personID)===req.query.id) {
                                var x = Object.assign({}, item);
                                items.push(x);
                                // }
                                break;
                        }
                    }
                })
                res.send(items)
            }
        };


        const users = db.get('users').value()
        var empcards = []
        users.forEach(usr => {
            var x = Object.assign({}, db.get('persdata').value())
            x.personID = usr.personID
            x.personFN = usr.personFN
            x['mem'] = parseInt(usr.personID) < 100
            x['fav'] = parseInt(usr.personID) >= 100
            if (empcards.length) {
                x.photoref = x.photoref + 'x';
                // x.email="";
            }
            empcards.push(x)
        })

        app.get(api.REST_LOGGED_USER, (req, res) => {
            res.send(db.get('current_user').value());
        })

        app.get(api.REST_POZA_USRS, (req, res) => {
            res.send(db.get('users').value().reduce((lst, itm) => (lst.push({ ...itm, 'photoref': itm.photoref ? itm.photoref : 'empty.jpg', 'position': 'Software Engineer' }), lst), []));
        })

        app.get(api.REST_POZA_USRGRPS, (req, res) => {
            res.send(db.get('usrgrps').value());
        })

        app.get(api.REST_POZA_PERSDATA, (req, res) => {
            res.send(db.get('persdata').value());
        })

        app.post(api.REST_POZA_PERSDATA, (req, res) => {
            var objId = db.get('persdata')
                .assign(req.body)
                .write()

            res.status(200).send({ status: 'o.k.' });
        })

        app.post(api.REST_POZA_UPDPERSDOC, (req, res) => {
            res.status(200).send({ status: 'o.k.' });
        })

        app.post(api.REST_POZA_DELPERSDOC, (req, res) => {
            res.status(200).send({ status: 'o.k.' });
        })

        app.get(api.REST_POZA_COURSES, (req, res) => {
            listOfObjects(req, res, 'courses');
        })

        app.get(api.REST_POZA_COURSE, (req, res) => {
            findObjectById(req, res, 'courses');
        })

        app.post(api.REST_POZA_COURSE, (req, res) => {
            saveObjectById(req, res, 'courses');
        })

        app.get(api.REST_POZA_PROFCOMPS, (req, res) => {
            res.send(db.get('profcomps').value());
        })

        app.get(api.REST_POZA_PERSCOMPS, (req, res) => {
            res.send(db.get('perscomps').value());
        })

        app.get(api.REST_POZA_CERTIFICATES, (req, res) => {
            res.send(db.get('certificates').value());
        })

        app.get(api.REST_POZA_CERTIFICATE, (req, res) => {
            findObjectById(req, res, 'certificates');
        })

        app.post(api.REST_POZA_CERTIFICATE, (req, res) => {
            saveObjectById(req, res, 'certificates');
        })

        app.get(api.REST_POZA_PROJECTS, (req, res) => {
            listOfObjects(req, res, 'projects');
        })

        app.get(api.REST_POZA_PROJECT, (req, res) => {
            var proj = Object.assign({}, db.get('projects')
                .find({ id: req.query.id })
                .value());

            if (!proj) return res.status(500).send('Nespravne ID!');

            proj.members.forEach(mem => {
                var review = db.get('reviews').value()[0];
                if (review) {
                    mem['datelastReview'] = review.procdate || '';
                    mem['lastReviewId'] = review.id || '';
                }
                mem['datelastMeeting'] = db.get('meetings').sortBy('procdate').value()[0].procdate || '';
            })

            res.send(proj);
        })

        app.post(api.REST_POZA_UPDPROJECT, (req, res) => {
            saveObjectById(req, res, 'projects');
        })

        app.get(api.REST_POZA_PROEVALS, (req, res) => {
            var filter = {};
            if (req.query.idp) {
                filter = { idp: req.query.idp };
            }
            var list = db.get('proevals')
                .filter(filter)
                .map((itm) => {
                    return {
                        id: itm.id,
                        idp: itm.idp,
                        name: itm.name,
                        type: itm.type,
                        procdate: itm.procdate,
                        perprogress: itm.perprogress,
                        evaluator: itm.evaluator,
                        members: itm.members,
                        locked: itm.locked,
                        published: itm.published,
                        evaluations: itm.evaluations
                    }
                }).value();
            if (!list) return res.status(500).send('Nespravne ID!');
            res.send(Object.assign({}, list));
        })

        app.post(api.REST_POZA_NEWPROEVAL, (req, res) => {
            var nid = 'E' + new Date().getTime();
            res.status(200).send({ docId: nid });
        })

        app.get(api.REST_POZA_PROEVAL, (req, res) => {
            findObjectById(req, res, 'proevals');
        })

        app.post(api.REST_POZA_UPDPROEVALUATION, (req, res) => {
            var find = db.get('proevals')
                .find({ 'id': req.query.id })
                .value();

            if (find) {
                db.get('proevals')
                    .find({ id: req.query.id })
                    .assign(req.body)
                    .write()
            } else {
                db.get('proevals')
                    .push(req.body)
                    .write();
            }
            res.status(200).send({ status: 'ok' });
        })

        app.get(api.REST_POZA_PROMEMBERS, (req, res) => {
            var find = db.get('projects')
                .find({ id: req.query.id })
                .value();
            if (!find) return res.status(500).send('Nespravne ID!');
            res.send(Object.assign({}, find.members));
        })

        app.post(api.REST_POZA_UPDPROMEMBERS, (req, res) => {
            var objId = db.get('projects')
                .find({ id: req.body.id })
                .assign({ members: req.body.users })
                .write()
            res.status(200).send({ status: 'o.k.' });
        })

        app.get(api.REST_POZA_MEETINGS, (req, res) => {
            listOfObjects(req, res, 'meetings');
        })

        app.post(api.REST_POZA_NEWMEETING, (req, res) => {
            var nid = 'M' + new Date().getTime();
            res.status(200).send({ docId: nid });
        })


        app.get(api.REST_POZA_MEETING, (req, res) => {
            findObjectById(req, res, 'meetings');
        })

        app.post(api.REST_POZA_MEETING, (req, res) => {
            saveObjectById(req, res, 'meetings');
        })

        app.get(api.REST_POZA_CLOSEOUTS, (req, res) => {
            listOfObjects(req, res, 'closeouts');
        })

        app.get(api.REST_POZA_CLOSEOUT, (req, res) => {
            findObjectById(req, res, 'closeouts');
        })

        app.post(api.REST_POZA_UPDCLOSEOUT, (req, res) => {
            saveObjectById(req, res, 'closeouts');
        })

        app.post(api.REST_POZA_NEWROR, (req, res) => {
            try {
                var data = db.get('targets')
                    .find({ personID: req.body.evaluated })
                    .get('interviews')
                    .value()[req.body.period];
            }
            catch (err) {
                data = undefined;
            }
            if (data) {
                res.status(200).send({ id: data });
                return;
            }
            var today = new Date();
            var nid = 'I' + today.getTime();
            data = {
                'id': nid,
                'datefrom': new Date(today.getFullYear(), today.getMonth(), today.getDate(), today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds()),
                'dateto': new Date(today.getFullYear() + 1, today.getMonth(), today.getDate() - 1, today.getHours(), today.getMinutes(), today.getSeconds(), today.getMilliseconds()),
                'title': 'Ročný rozhovor ' + req.body.period,
                'evaluator': db.get('users')
                    .find({ 'personID': req.body.evaluator })
                    .value(),
                'evaluated': db.get('users')
                    .find({ 'personID': req.body.evaluated })
                    .value(),
                'targets': [],
                'competences': db.get('themes')
                    .find({ 'type': 'interviews' })
                    .get('items')
                    .value(),
            }

            let interviews = db.get('targets')
                .find({ personID: req.body.evaluated })
                .get('interviews')
                .value();

            interviews[req.body.period] = nid;

            db.get('targets')
                .find({ personID: req.body.evaluated })
                .assign(interviews)
                .write();

            db.get('interviews')
                .push(data)
                .write();

            res.status(200).send({ id: nid });
        })

        app.get(api.REST_POZA_RORS, (req, res) => {
            var list = db.get('interviews')
                // .filter({ evaluated: { personID: req.query.evaluated } })
                .map((itm) => ({
                    id: itm.id,
                    title: itm.title,
                    datefrom: itm.datefrom,
                    dateto: itm.dateto,
                    evaluator: itm.evaluator,
                    evaluated: itm.evaluated,
                    endlevel: itm.endlevel,
                    targets: itm.targets.map((trg) => {
                        return {
                            name: trg.name,
                            desc: trg.desc
                        }
                    })
                }))
                .value();
            res.send(list);
        })

        app.get(api.REST_POZA_ROR, (req, res) => {
            findObjectById(req, res, 'interviews');
        })

        app.post(api.REST_POZA_UPDROR, (req, res) => {
            saveObjectById(req, res, 'interviews');
        })

        app.get(api.REST_POZA_TARGETS, (req, res) => {
            let targets = {};
            let interviews = db.get('targets')
                .find({ personID: req.query.id })
                .get('interviews')
                .value();
            for (let [key, value] of Object.entries(interviews)) {
                targets[key] = db.get('interviews').find({ id: value }).value();
            }
            res.send(targets);
        })

        app.get(api.REST_POZA_REVIEWS, (req, res) => {
            // find id ->req.query.id
            res.send(db.get('reviews').value());
        })

        app.post(api.REST_POZA_NEWREVIEW, (req, res) => {
            var nid = 'R' + new Date().getTime();
            res.status(200).send({ docId: nid });
        })

        app.get(api.REST_POZA_REVIEW, (req, res) => {
            findObjectById(req, res, 'reviews');
        })

        app.post(api.REST_POZA_UPDREVIEW, (req, res) => {
            saveObjectById(req, res, 'reviews');
        })

        app.get(api.REST_POZA_EMPALL, (req, res) => {
            res.send(empcards);
        })

        app.get(api.REST_POZA_EMPMY, (req, res) => {
            var list = []
            empcards.forEach(usr => {
                if (usr.mem) {
                    list.push(usr)
                }
            })
            res.send(list)
        })

        app.get(api.REST_POZA_EMPFAV, (req, res) => {
            var list = []
            empcards.forEach(usr => {
                if (usr.fav) {
                    list.push(usr)
                }
            })
            res.send(list)
        })

        app.post(api.REST_POZA_EMPFADD, (req, res) => {
            res.status(200).send({ status: 'ok' });
        })

        app.post(api.REST_POZA_EMPFDEL, (req, res) => {
            res.status(200).send({ status: 'ok' });
        })

        app.get(api.REST_POZA_THEMES, (req, res) => {
            var { id, type } = req.query;
            var find = db.get('themes')
                .find({ 'leaderId': id, 'type': type })
                .value();
            if (!find) return res.status(500).send('Nespravne ID!');
            res.send(Object.assign({}, find));
        })

        app.post(api.REST_POZA_SETTHEME, (req, res) => {
            var { id, type } = req.query;

            var find = db.get('themes')
                .find({ 'leaderId': id, 'type': type })
                .value();
            if (find) {
                db.get('themes')
                    .find({ 'leaderId': id, 'type': type })
                    .assign({ items: req.body })
                    .write()
            } else {
                var data = {
                    'leaderId': id,
                    'type': type,
                    'items': req.body
                }

                db.get('themes')
                    .push(data)
                    .write();
            }


            res.status(200).send({ status: 'ok' });
        })

        app.get(api.REST_POZA_TLCARDS, (req, res) => {
            var find = db.get('tlcards')
                .find({ leader: { personID: req.query.id } })
                .value();
            if (!find) return res.status(500).send('Nespravne ID!');
            res.send(Object.assign({}, find));
        })

    })
}

