import { Resolve } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "src/app/shared/services/data-server.service";
import { VoucherRequestContributionDto } from "../dtos/voucher-request-contribution";
import { Injectable } from "@angular/core";
import { ContributionService } from "../../services/contribution.service";

@Injectable()
export class ContributionResolver implements Resolve<Observable<any>> {

  constructor(
    private contributionService: ContributionService,
    private dataService: DataService
  ) {}

  resolve(): Observable<any> {
    return Observable.create(
      observer => {
        const contributionAmount = this.dataService.getData('contributionAmount');
        console.debug('contribution resolver ... ', contributionAmount);

        if (contributionAmount) {
          observer.next();
          observer.complete();
        } else {
          this.contributionService.getContributionAmount().subscribe(
            (voucherRequestContribution:VoucherRequestContributionDto) => {
              console.debug('contribution resolver set ... ', voucherRequestContribution);
              this.dataService.addData('contributionAmount', voucherRequestContribution);
              observer.next();
              observer.complete();
            },
            (error) => {
              console.error(error);
              observer.next();
              observer.complete();
            }
          );
        }
      }
    )
  }

}
