import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class CareerService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getPracovnePonuky(count?: number) {
    let paramCount: string = (count) ? '' + count : ''
    let param:HttpParams = new HttpParams().set('count', paramCount);
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_UCHADZACI, this.httpOptions);  
  }
}
