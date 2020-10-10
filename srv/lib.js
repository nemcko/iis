'use strict';

module.exports.createDb = function (name) {
    const low = require('lowdb')
    const FileAsync = require('lowdb/adapters/FileAsync')
    const path = require('path')
    const adapter = new FileAsync(path.join(__dirname, '/data', name + '.json' ))

    return low(adapter)
}


module.exports.writeHead = function (res) {
    res.writeHead(200, {
        'Content-Type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
        "Access-Control-Allow-Headers": "If-Modified-Since"
    });
}

module.exports.sendFile = function (res, name) {
    var fs = require('fs')
        , path = require('path')
        , data
        ;

    fs.readFile(path.join(__dirname, '/data', name), 'utf8', function (err, data) {
        if (err) return res.status(500).json({ err: err });

        exports.writeHead(res);

        res.write(data);
        res.end();
    });

}