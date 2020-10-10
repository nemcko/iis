import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AnswerDto } from '../objects/dtos/answer-dto';
import { VotingDto } from '../objects/dtos/voting-dto';
import { EmotikonDto } from '../objects/dtos/emotikon-dto';
import { AnnouncementDto } from '../objects/dtos/announcement-dto';
import { ToastrService } from 'ngx-toastr';

declare var feed,feedsvc;

@Injectable()
export class AnnouncementsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json;charset=utf-8',
    })
  };

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { feedsvc=this; }

  getAnnouncements(count: number, query?:string) {
    let params: string = (count) ? '' + count : '';
    let param:HttpParams = new HttpParams().set('count', params);
    if (query && query.length > 0) {
      param = param.append('query', query);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_OZNAMY, this.httpOptions);  
  }

  getAnnouncementsByCategory(id: string, count: number, category: string[]) {
    return this.http.post(environment.REST_OZNAMY_BY_CATEGORY, JSON.stringify({parentId: id, count: count, category: category}), this.httpOptions);
  }

  getQuickAnnouncement(count: number, query?:string) {
    let params: string = (count) ? '' + count : '';
    let param:HttpParams = new HttpParams().set('count', params);
    if (query && query.length > 0) {
      param = param.append('query', query);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_RYCHLY_OZNAM, this.httpOptions);
  }

  getThanks(count: number, query?: string) {
    let params: string = (count) ? '' + count : '';
    let param:HttpParams = new HttpParams().set('count', params);
    if (query && query.length > 0) {
      param = param.append('query', query);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_PODAKOVANIA, this.httpOptions);
  }

  setThanks(title: string, id?: string) {
    this.httpOptions['params'] = null;
    id = id || null;
    return this.http.post(environment.REST_SET_PODAKOVANIE, JSON.stringify({id: id, title: title}), this.httpOptions);
  }

  removeThanks(id: string) {
    if (id && id.length > 0) {
      this.httpOptions['params'] = null;
      return this.http.post(environment.REST_PODAKOVANIE_REMOVE, JSON.stringify({id: id}), this.httpOptions );
    }
  }

  getAnnouncement(id: string) {
    let param:HttpParams = new HttpParams().set('id', id);
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_OZNAM, this.httpOptions);
  }

  getAnnouncementId() {
    this.httpOptions['params'] = null;
    return this.http.get(environment.REST_CREATE_ID, this.httpOptions);
  }

  setAnnouncement(oznamData: AnnouncementDto, action: string) {
    let param:HttpParams = new HttpParams().set('act', action);
    this.httpOptions['params'] = param;
    return this.http.post(environment.REST_SET_OZNAM, JSON.stringify(oznamData), this.httpOptions);
  }

  getAnnouncementsCategories() {
    this.httpOptions['params'] = null;
    return this.http.get(environment.REST_OZNAMY_CATEGORIES, this.httpOptions);
  }

  getQuickQuestion(count: number, query?:string) {
    let params: string = (count) ? '' + count : '';
    let param:HttpParams = new HttpParams().set('count', params);
    if (query && query.length > 0) {
      param = param.append('query', query);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_RYCHLA_OTAZKA, this.httpOptions);  
  }

  getEmotikon(questionId) {
    let param:HttpParams = new HttpParams().set('parentId', questionId);
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_EMOTIKON, this.httpOptions);
  }

  setEmotikon(emotikon: EmotikonDto) {
    this.httpOptions['params'] = null;
    return this.http.post(environment.SET_EMOTIKON, JSON.stringify(emotikon), this.httpOptions);
  }

  setAnswer(odpoved: AnswerDto) {
    this.httpOptions['params'] = null;
    return this.http.post(environment.SET_ODPOVED, JSON.stringify(odpoved), this.httpOptions);
  }

  getEvents(count?: number, query?: string) {
    let params: string = (count) ? '' + count : '';
    let param:HttpParams = new HttpParams().set('count', params);
    if (query && query.length > 0) {
      param = param.append('query', query);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_UDALOSTI, this.httpOptions);
  }

  getVoting(oznamId: string) {
    let param:HttpParams = new HttpParams().set('parentId', oznamId);
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_GET_VOTING, this.httpOptions);
  }

  setVoting(voting: VotingDto) {
    this.httpOptions['params'] = null;
    return this.http.post(environment.REST_SET_VOTING, JSON.stringify(voting), this.httpOptions);
  }

  setQuestionHR(question: string) {
    this.httpOptions['params'] = null;
    return this.http.post(environment.REST_SET_QUESTION_HR, JSON.stringify({question: question}), this.httpOptions);
  }

  getFeed(query:string,id:string) {
    feedsvc.http.get(`${environment.REST_OZNAMY}/vyjadrenie?openagent&v=${query}&id=${id}`).subscribe(
      (data: any) => {
        feedsvc.toastr.success('Odpoveď bola uložená.','',{onActivateTick:true});
      },
      (error) => {
        feedsvc.toastr.error('Chyba pri ukladaní odpovede.','',{onActivateTick:true});
      }
    );
  }

}
