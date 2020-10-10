import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RatingModel } from 'src/app/ror/objects/models/rating-model';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json;charset=utf-8',
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getRatingsList(count: number, query?:string):Observable<any> {
    let params: string = (count) ? '' + count : '';
    let param:HttpParams = new HttpParams().set('count', params);
    if (query && query.length > 0) {
      param = param.append('query', query);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_ROR_GET_RATINGS, this.httpOptions);  
  }

  getCompetenceList():Observable<any> {
    this.httpOptions['params'] = null;
    return this.http.get(environment.REST_ROR_GET_COMPETENCES, this.httpOptions);  
  }

  getRating(id: string):Observable<any> {
    let param:HttpParams;
    if (id && id.length > 0) {
      param = new HttpParams().set('id', id);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_ROR_GET_RATING, this.httpOptions);
  }

  getRatingId():Observable<any> {
    this.httpOptions['params'] = null;
    return this.http.get(environment.REST_ROR_CREATE_ID, this.httpOptions);
  }

  getRatingWFActions(id: string): Observable<any> {
    let param:HttpParams;
    if (id && id.length > 0) {
      param = new HttpParams().set('id', id);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_ROR_GET_WFFN_ACTIONS, this.httpOptions);
  }

  setRating(rating: RatingModel ,action: string) : Observable<any> {
    let param:HttpParams;
    if (action && action.length > 0) {
      param = new HttpParams().set('act', action);
    }
    this.httpOptions['params'] = param;
    return this.http.post(environment.REST_ROR_SET_RATING, JSON.stringify(rating), this.httpOptions);
  }

}
