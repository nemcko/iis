import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApplicationsService {

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  public constructor(
    private http: HttpClient
  ) { }

  public getAplikacie(): any {
    return this.http.get(environment.REST_APLIKACIE, this.httpOptions);
  }
}
