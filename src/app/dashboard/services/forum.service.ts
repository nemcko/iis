import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ForumItemDto } from '../objects/dtos/forum-item-dto';

@Injectable()
export class ForumService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json;charset=utf-8',
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getForumList( oznamId: string) {
    let param:HttpParams = new HttpParams().set('oznamId', oznamId);
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_FORUM_LIST, this.httpOptions);
  }

  createTopic( topic: string, oznamId: string) {
    let forumItem: ForumItemDto = {
      "id" : '',
      "oznamId" : oznamId,
      "parentId" : '',
      "description" : topic
    };
    return this.http.post(environment.SET_FORUM_ITEM, JSON.stringify(forumItem), this.httpOptions);
  }

  updateTopic( topic: string, oznamId: string, id: string) {
    let forumItem: ForumItemDto = {
      "id" : id,
      "oznamId" : oznamId,
      "parentId" : '',
      "description" : topic
    };
    return this.http.post(environment.SET_FORUM_ITEM, JSON.stringify(forumItem), this.httpOptions);
  }

  createResponse(response: string, parentId: string, oznamId: string) {
    let forumItem: ForumItemDto = {
      "id" : '',
      "oznamId" : oznamId,
      "parentId" : parentId,
      "description" : response
    };
    return this.http.post(environment.SET_FORUM_ITEM, JSON.stringify(forumItem), this.httpOptions);
  }

  updateResponse(response: string, parentId: string, oznamId: string, id: string) {
    let forumItem: ForumItemDto = {
      "id" : id,
      "oznamId" : oznamId,
      "parentId" : parentId,
      "description" : response
    };
    return this.http.post(environment.SET_FORUM_ITEM, JSON.stringify(forumItem), this.httpOptions);
  }

  getForumSumar(count: number, sortType: string) {
    let param:HttpParams = new HttpParams().set('count', '' + count).append('sort', sortType);
    this.httpOptions['params'] = param;

    return this.http.get(environment.REST_FORUM_SUMAR, this.httpOptions);
  }

}
