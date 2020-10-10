import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class UserService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public constructor(
    private http: HttpClient
  ) { }

  public getCurrentUser(): any {
    // return this.http.get(environment.REST_CURRENT_USER, this.httpOptions);
    return this.http.get(`${environment.REST_POZA}${environment.REST_LOGGED_USER}`, this.httpOptions);
  }
}
