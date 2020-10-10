import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams, HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SearchListFunction } from 'src/app/shared';
import { PortalDataService } from 'src/app/eportal/services/data.service';

export interface IUserAccess {
  userId: string,
  isHR: boolean,
  isSDD: boolean,
  isTL(accdata: any): boolean
}

/**
 * Servisná služba portálového REST Api
 */
@Injectable({
  providedIn: 'root'
})
export class EpService extends PortalDataService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Referer': environment.REST_POZA,
    })
  };

  public constructor(
    private http: HttpClient
  ) {
    super();
  }

  public getEmployees(type: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', this.currentUser);
    switch (type) {
      case 'my':
        return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_EMPMY}`, this.httpOptions);
      case 'fav':
        return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_EMPFAV}`, this.httpOptions);
      default:
        return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_EMPALL}`, this.httpOptions);
    }
  }

  public changeFav(add: boolean, id: string, fav: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id).set('fav', fav);
    if (add) {
      return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_EMPFADD}`, null, this.httpOptions);
    }
    else {
      return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_EMPFDEL}`, null, this.httpOptions);
    }
  }

  public getPersData(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_PERSDATA}`, this.httpOptions);
  }

  public setPersData(data: any): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('personID', data.personID);
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_UPDPERSDATA}`, JSON.stringify(data), this.httpOptions);
  }

  public delPersDoc(personID: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', personID);
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_DELPERSDOC}`, null, this.httpOptions);
  }

  public getTargets(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_TARGETS}`, this.httpOptions);
  }

  public getUsers(): Observable<any> {
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_USRS}`, this.httpOptions);
  }

  public getUsrGrps(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_USRGRPS}`, this.httpOptions);
  }

  public getKickoffDetail(id: string): Observable<any> {
    let param: HttpParams;
    if (id && id.length > 0) {
      param = new HttpParams().set('id', id);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_PROJECT_KICKOFF, this.httpOptions);
  }

  public getWorkGroups(): Observable<any> {
    let param: HttpParams;
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_PROJECT_WORKGROUPS, this.httpOptions);
  }

  public getProjectCREval(id: string): Observable<any> {
    let param: HttpParams;
    if (id && id.length > 0) {
      param = new HttpParams().set('id', id);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_PROJECT_CREVAL, this.httpOptions);
  }

  public getCourse(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_COURSE}`, this.httpOptions);
  }

  public setCourse(data: any): Observable<any> {
    this.httpOptions['params'] = data;
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_COURSE}`, JSON.stringify(data), this.httpOptions);
  }

  public getCertificate(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_CERTIFICATE}`, this.httpOptions);
  }

  public setCertificate(data: any): Observable<any> {
    this.httpOptions['params'] = data;
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_CERTIFICATE}`, JSON.stringify(data), this.httpOptions);
  }

  public addMeeting(): Observable<any> {
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_NEWMEETING}`, null);
  }

  public getMeeting(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_MEETING}`, this.httpOptions);
  }

  public setMeeting(data: any): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', data.id);
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_UPDMEETING}`, JSON.stringify(data), this.httpOptions);
  }

  public getCloseout(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_CLOSEOUT}`, this.httpOptions);
  }

  public setCloseout(data: any): Observable<any> {
    this.httpOptions['params'] = data;
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_UPDCLOSEOUT}`, JSON.stringify(data), this.httpOptions);
  }

  public addReview(): Observable<any> {
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_NEWREVIEW}`, null, this.httpOptions);
  }

  public getReview(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_REVIEW}`, this.httpOptions);
  }

  public setReview(data: any): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', data.id);
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_UPDREVIEW}`, JSON.stringify(data), this.httpOptions);
  }

  public getInterviews(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_RORS}`, this.httpOptions);
  }

  public nextInterview(data: any): Observable<any> {
    return new Observable(observer => {
      const params = new HttpParams({
        fromObject: {
          period: data.period,
          evaluator: data.evaluator,
          evaluated: data.evaluated
        }
      });

      forkJoin(
        this.getPersData(data.evaluator),
        this.getPersData(data.evaluated),
        this.getThemes(data.evaluator, 'interviews'),
      ).subscribe(
        pdata => {
          const today = new Date();
          const lastday = new Date(today);
          lastday.setDate(today.getDate() + 365);

          const payload = {
            'datefrom': today,
            'dateto': lastday,
            'title': 'Ročný rozhovor ' + data.period,
            'evaluator': {
              personUN: pdata[0].personUN,
              personFN: pdata[0].personFN,
              personID: pdata[0].personID,
            },
            'evaluated': {
              personUN: pdata[1].personUN,
              personFN: pdata[1].personFN,
              personID: pdata[1].personID,
            },
            'targets': [],
            'competences': pdata[2]
          }
          this.httpOptions['params'] = params;
          return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_NEWROR}`, payload ? JSON.stringify(payload) : null, this.httpOptions)
            .subscribe(
              (dta) => {
                observer.next(dta['docId']);
                observer.complete();
              }
              , () => {
                observer.next('');
                observer.complete();
              }
            );
        }
      );
    });
  }

  public getInterview(id: string): Observable<any> {
    let params: HttpParams;
    if (id && id.length > 0) {
      params = new HttpParams().set('id', id);
    }
    this.httpOptions['params'] = params;
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_ROR}`, this.httpOptions);
  }

  public setInterview(data: any): Observable<any> {
    this.httpOptions['params'] = data;
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_UPDROR}`, JSON.stringify(data), this.httpOptions);
  }

  public getThemes(id: string, type: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        id: id,
        type: type,
      }
    });
    this.httpOptions['params'] = params;
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_THEMES}`, this.httpOptions);
  }

  public addTheme(id: string, type: string, title: string, desc: string = ''): Observable<any> {
    return Observable.create(
      observer => {
        this.getThemes(id, type).subscribe(
          (odata: any) => {
            const params = new HttpParams({
              fromObject: {
                id: id,
                type: type,
              }
            });
            this.httpOptions['params'] = params;
            const item = {
              'code': 'T' + new Date().getTime(),
              'name': title,
              'desc': desc
            }
            const payload = odata.items;
            payload.push(item)
            this.http.post(`${environment.REST_POZA}${environment.REST_POZA_SETTHEME}`, JSON.stringify(payload), this.httpOptions).subscribe(
              () => {
                observer.next(item);
                observer.complete();
              },
              (error) => {
                observer.error(error);
                observer.complete();
              })
          },
          (error) => {
            observer.error(error);
            observer.complete();
          }
        );
      }
    );
  }

  public getProject(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_PROJECT}`, this.httpOptions);
  }

  public setProject(data: any): Observable<any> {
    this.httpOptions['params'] = data;
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_UPDPROJECT}`, JSON.stringify(data), this.httpOptions);
  }

  public getProevals(id: string, idp: string = ''): Observable<any> {
    const params = new HttpParams({
      fromObject:
        idp ? {
          id: id,
          idp: idp
        } : { id: id }
    });
    this.httpOptions['params'] = params;
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_PROEVALS}`, this.httpOptions);
  }

  public addProEval(id: string, idp: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('idp', idp);
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_NEWPROEVAL}`, null, this.httpOptions)
  }

  public loadProEval(id: string, idp: string, ide: string): Observable<any> {
    return new Observable(observer => {
      this.httpOptions['params'] = new HttpParams().set('id', ide);
      this.http.get(`${environment.REST_POZA}${environment.REST_POZA_PROEVAL}`, this.httpOptions)
        .subscribe(
          (data) => {
            observer.next(data);
            observer.complete();
          }
          , () => {
            this.httpOptions['params'] = new HttpParams().set('idp', idp);
            forkJoin(
              this.http.post(`${environment.REST_POZA}${environment.REST_POZA_NEWPROEVAL}`, null, this.httpOptions),
              this.getPersData(id),
              this.getThemes(id, 'projects'),
              this.getProMembers(idp),
            ).subscribe(
              pdata => {
                const newdata = {
                  'id': pdata[0]['docId'],
                  'idp': idp,
                  'procdate': new Date(),
                  'name': name,
                  'type': 'mesačné',
                  'evaluator': {
                    personUN: pdata[1].personUN,
                    personFN: pdata[1].personFN,
                    personID: pdata[1].personID,
                  },
                  'competences': pdata[2]['items'],
                  'members': [],
                  'evaluations': {},
                  'locked': false,
                  'verbeval': '',
                  'published': false
                };
                Object.entries(pdata[3]).forEach((mem) => {
                  newdata.members.push({
                    personUN: mem[1]['personUN'],
                    personFN: mem[1]['personFN'],
                    personID: mem[1]['personID'],
                  });
                  const defcomp = {};
                  newdata.competences.forEach(com => {
                    defcomp[com.code] = 0;
                  });
                  newdata.evaluations[mem[1]['personID']] = {
                    competences: defcomp,
                    verbal: '',
                    locked: false
                  }
                })

                observer.next(newdata);
                observer.complete();
              }, err => {
                observer.error(err);
                observer.complete();
              }
            )
          });
    })
  }



  public getProEval(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_PROEVAL}`, this.httpOptions);
  }

  public saveEvaluation(data: any): Observable<any> {
    this.httpOptions['params'] = data;
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_UPDPROEVALUATION}`, JSON.stringify(data), this.httpOptions);
  }

  public getProMembers(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_PROMEMBERS}`, this.httpOptions);
  }

  public setProMembers(data: any): Observable<any> {
    this.httpOptions['params'] = data;
    return this.http.post(`${environment.REST_POZA}${environment.REST_POZA_UPDPROMEMBERS}`, JSON.stringify(data), this.httpOptions);
  }

  public getTlcard(id: string): Observable<any> {
    this.httpOptions['params'] = new HttpParams().set('id', id);
    return this.http.get(`${environment.REST_POZA}${environment.REST_POZA_TLCARDS}`, this.httpOptions);
  }

  public getShortList(id: string, collection: string): Observable<any> {
    const params = new HttpParams({
      fromObject: {
        id: id
      }
    });
    this.httpOptions['params'] = params;
    return this.http.get(this.urlFromCollection(collection), this.httpOptions);
  }

  public listCourses: SearchListFunction = (http: HttpClient, id: string, search: string = null, page: number = 1, limit: number = 10) => this.searchList('courses', http, id, search, page, limit)

  public listCertificates: SearchListFunction = (http: HttpClient, id: string, search: string = null, page: number = 1, limit: number = 10) => this.searchList('certificates', http, id, search, page, limit)

  public listProjects: SearchListFunction = (http: HttpClient, id: string, search: string = null, page: number = 1, limit: number = 10) => this.searchList('projects', http, id, search, page, limit)

  public listMeetings: SearchListFunction = (http: HttpClient, id: string, search: string = null, page: number = 1, limit: number = 10) => this.searchList('meetings', http, id, search, page, limit)

  public listReviews: SearchListFunction = (http: HttpClient, id: string, search: string = null, page: number = 1, limit: number = 10) => this.searchList('reviews', http, id, search, page, limit)

  public listInterviews: SearchListFunction = (http: HttpClient, id: string, search: string = null, page: number = 1, limit: number = 10) => this.searchList('interviews', http, id, search, page, limit)

  public listCloseouts: SearchListFunction = (http: HttpClient, id: string, search: string = null, page: number = 1, limit: number = 10) => this.searchList('closeouts', http, id, search, page, limit)

  public listTargets: SearchListFunction = (http: HttpClient, id: string, search: string = null, page: number = 1, limit: number = 10) => this.searchList('targets', http, id, search, page, limit)


  protected urlFromCollection(collection: string): string {
    switch (collection) {
      case 'profcomps': return `${environment.REST_POZA}${environment.REST_POZA_PROFCOMPS}`;
      case 'perscomps': return `${environment.REST_POZA}${environment.REST_POZA_PERSCOMPS}`;
      case 'courses': return `${environment.REST_POZA}${environment.REST_POZA_COURSES}`;
      case 'certificates': return `${environment.REST_POZA}${environment.REST_POZA_CERTIFICATES}`;
      case 'meetings': return `${environment.REST_POZA}${environment.REST_POZA_MEETINGS}`;
      case 'closeouts': return `${environment.REST_POZA}${environment.REST_POZA_CLOSEOUTS}`;
      case 'reviews': return `${environment.REST_POZA}${environment.REST_POZA_REVIEWS}`;
      case 'projects': return `${environment.REST_POZA}${environment.REST_POZA_PROJECTS}`;
      case 'interviews': return `${environment.REST_POZA}${environment.REST_POZA_COURSES}`;
      case 'targets': return `${environment.REST_POZA}${environment.REST_POZA_TARGETS}`;
    }
  }

  protected searchList(collection: string, http: HttpClient, id: string, search: string = null, page: number = 1, limit: number = 10): Observable<any> {
    let params: HttpParams = new HttpParams()
    const opt = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json;charset=utf-8',
      })
    };
    params = params.set('id', id);

    if (search) {
      params = params.set('search', search)
    }
    if (page) {
      params = params.set('page', String(page))
    }
    if (limit) {
      params = params.set('limit', String(limit))
    }

    opt['params'] = params;
    return http.get(this.urlFromCollection(collection), opt);
  }

  public get currentUser(): string {
    return this.getData('uzivatel')['userId'] || '';
  }
}
