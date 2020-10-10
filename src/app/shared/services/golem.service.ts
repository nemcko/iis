import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class GolemService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=utf-8',
    })
  };

  public constructor(
    private http: HttpClient
  ) { }

  public getGolemData(): Observable<any> {
    return this.http.get(environment.REST_GOLEM, this.httpOptions);
  }
}
