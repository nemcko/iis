import { Component, OnInit } from '@angular/core';
import { HolidayVoucherService } from 'src/app/holiday-voucher/services/holiday-voucher.service';
import { VoucherRequestInfoDto } from 'src/app/holiday-voucher/objects/dtos/voucher-request-info-dto';
import { VoucherRequestStatusListDesc, VoucherRequestStatusList, VoucherRequestStatusColorList } from 'src/app/holiday-voucher/objects/enums/enums.enum';
import { VoucherRequestContributionDto } from 'src/app/holiday-voucher/objects/dtos/voucher-request-contribution';
import { HolidayVoucherConstants } from 'src/app/holiday-voucher/objects/values/constants';
import { UserDto } from 'src/app/shared/objects/dtos/user-dto';
import { DataService } from 'src/app/shared/services/data-server.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-voucher-request-list',
  templateUrl: './voucher-request-list.component.html'
})
export class VoucherRequestListComponent implements OnInit {

  public statusList = VoucherRequestStatusList;
  public statusListDesc = VoucherRequestStatusListDesc;
  public statusColorList = VoucherRequestStatusColorList;
  
  public voucherContributionMax: number = null;
  public voucherContribution: number = null;
  public requestList: VoucherRequestInfoDto[] = [];
  public voucherRequestAllowed: boolean = false;

  constructor(
    private voucherService: HolidayVoucherService,
    private dataService: DataService,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    const user: UserDto = this.dataService.getData('uzivatel');
    const contribution: VoucherRequestContributionDto = this.dataService.getData('contributionAmount');
    this.voucherContribution = contribution.contributionAmount;
    this.voucherContributionMax = contribution.contributionAmountMax;
    this.voucherRequestAllowed = !(this.voucherContribution == null || this.voucherContributionMax == null);

    this.loadRecords(user.userId);
  }

  public loadRecords(userId: string) {
    this.loader.show('voucher_loader');
    this.voucherService.getVoucherRequestList(userId, HolidayVoucherConstants.LIST_VOUCHER_REQUEST_COUNT).subscribe(
      (data: VoucherRequestInfoDto[]) => {
        this.requestList = data;
        this.loader.hide('voucher_loader');
      },
      (error) => {
        this.loader.hide('voucher_loader');
        console.error(error);
      }
    );
  }

}
