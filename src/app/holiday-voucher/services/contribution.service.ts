import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VoucherRequestContributionDto } from '../objects/dtos/voucher-request-contribution';
import { DataService } from 'src/app/shared/services/data-server.service';

@Injectable({
  providedIn: 'root'
})
export class ContributionService {

  public voucherAllowed:boolean = false;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json;charset=utf-8',
    })
  };

  constructor(
    private http:HttpClient,
    private dataService: DataService
  ) {
    this.initialize();
  }

  public initialize() {
    this.getContributionAmount().subscribe(
      (voucherRequestContribution:VoucherRequestContributionDto) => {
        this.dataService.addData('contributionAmount', voucherRequestContribution);
        this.voucherAllowed = (voucherRequestContribution.contributionAmount != null && voucherRequestContribution.contributionAmount > 0 && voucherRequestContribution.contributionAmountMax != null);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public getContributionAmount(personId?: string) :Observable<any> {
    let param: HttpParams;
    if (personId && personId.length > 0) {
      param = new HttpParams().set('id', personId);
    }
    this.httpOptions['params'] = param;
    return this.http.get(environment.REST_RP_GET_CONTRIBUTION, this.httpOptions);
  }
}
