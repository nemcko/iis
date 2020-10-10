import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { VoucherRequestModel } from 'src/app/holiday-voucher/objects/models/voucher-request-model';
import { Observable } from 'rxjs';
import { HolidayVoucherConstants } from '../objects/values/constants';
import { delay } from 'q';

@Injectable({
  providedIn: 'root'
})
export class HolidayVoucherService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json;charset=utf-8',
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  getFaqList(count: number, query?:string) :Observable<any> {
    let params: string = (count) ? '' + count : '';
    let param:HttpParams = new HttpParams().set('count', params);
    if (query && query.length > 0) {
      param = param.append('query', query);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_RP_GET_FAQ_LIST, this.httpOptions);  
  }

  addQuestion(question: string) :Observable<any> {
    this.httpOptions['params'] = null;
    return this.http.post(environment.REST_RP_SET_FAQ_QUESTION, JSON.stringify({"question": question}), this.httpOptions);
  }

  getVoucherRequestList(userId: string, count: number, query?:string) :Observable<any> {
    let params: string = (count) ? '' + count : '' + HolidayVoucherConstants.LIST_VOUCHER_REQUEST_COUNT;
    let param:HttpParams = new HttpParams().set('count', params);

    if (userId && userId.length > 0) {
      param = param.append('userId', userId);
    }

    if (query && query.length > 0) {
      param = param.append('query', query);
    }

    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_RP_GET_REQUEST_LIST_BY_USER, this.httpOptions);
  }

  getVoucherRequestListAll(count: number, query?:string) :Observable<any> {
    let params: string = (count) ? '' + count : '' + HolidayVoucherConstants.LIST_VOUCHER_REQUEST_COUNT;
    let param:HttpParams = new HttpParams().set('count', params);

    if (query && query.length > 0) {
      param = param.append('query', query);
    }

    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_RP_GET_REQUEST_LIST, this.httpOptions);
  }

  getVoucherRequestListAllByStatus(count: number, query?:string, category?: string[]) :Observable<any> {
    this.httpOptions['params'] = null;
    return this.http.post(environment.REST_RP_GET_REQUEST_LIST_BY_STATUS, JSON.stringify({count: count, query: ((query && query.length > 0) || ''), category: category}), this.httpOptions);
  }

  getVoucherRequest(id: string) :Observable<any> {
    let param:HttpParams;
    if (id && id.length > 0) {
      param = new HttpParams().set('id', id);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_RP_GET_REQUEST, this.httpOptions);
  }

  getVoucherRequestId() :Observable<any> {
    this.httpOptions['params'] = null;
    return this.http.get(environment.REST_RP_CREATE_ID, this.httpOptions);
  }

  setVoucherRequest( voucherRequest: VoucherRequestModel, action: string) :Observable<any> {
    let param: HttpParams;
    if (action && action.length > 0) {
      param = new HttpParams().set('act', action);
    }
    this.httpOptions['params'] = param;
    return this.http.post(environment.REST_RP_SET_REQUEST, JSON.stringify(voucherRequest), this.httpOptions);
  }

  getTemplateRequestURL() :Observable<any> {
    this.httpOptions['params'] = null;
    return this.http.get(environment.REST_RP_GET_TEMPLATE_URL, this.httpOptions);
  }

  getVoucherRequestWFActions(id: string): Observable<any> {
    let param:HttpParams;
    if (id && id.length > 0) {
      param = new HttpParams().set('id', id);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_RP_GET_WFFN_ACTIONS, this.httpOptions);
  }

}
