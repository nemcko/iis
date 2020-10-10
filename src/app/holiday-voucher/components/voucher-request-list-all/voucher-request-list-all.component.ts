import { Component, OnInit } from '@angular/core';
import { VoucherRequestStatusList, VoucherRequestStatusListDesc, VoucherRequestStatusColorList } from 'src/app/holiday-voucher/objects/enums/enums.enum';
import { VoucherRequestInfoDto } from 'src/app/holiday-voucher/objects/dtos/voucher-request-info-dto';
import { HolidayVoucherService } from 'src/app/holiday-voucher/services/holiday-voucher.service';
import { HolidayVoucherConstants } from '../../objects/values/constants';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-voucher-request-list-all',
  templateUrl: './voucher-request-list-all.component.html'
})
export class VoucherRequestListAllComponent implements OnInit {

  public statusList = VoucherRequestStatusList;
  public statusListDesc = VoucherRequestStatusListDesc;
  public statusColorList = VoucherRequestStatusColorList;
  public requestList: VoucherRequestInfoDto[] = [];
  public search: string;
  public categoryList: any[] = null;
  public selectedCategories: string[] = [];

  constructor(
    private voucherService: HolidayVoucherService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let key:string = '';
    this.setCategories();
    this.route.params.subscribe(
      (param) => {
        if (param['category']) {
          key = unescape(param['category']);
        }
        this.selectCategory(key);
      },
      () => {
        this.selectCategory(key);
      }
    );
    
    this.loadRecords();
  }

  public loadRecords() :void {
    if (this.selectedCategories && this.selectedCategories.length > 0) {
      this.voucherService.getVoucherRequestListAllByStatus(HolidayVoucherConstants.LIST_VOUCHER_REQUEST_COUNT, this.search, this.selectedCategories).subscribe(
        (data:VoucherRequestInfoDto[]) => {
          this.requestList = data;
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.voucherService.getVoucherRequestListAll(HolidayVoucherConstants.LIST_VOUCHER_REQUEST_COUNT, this.search).subscribe(
        (data: VoucherRequestInfoDto[]) => {
          this.requestList = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  private selectCategory(key: string) :void {
    if (key != '') {
      this.selectedCategories.push(key);
      this.selectedCategories = _.uniq(this.selectedCategories);
    }
    this.loadRecords();
  }

  private setCategories():void {
    this.categoryList = [];
    this.categoryList.push({label: this.statusListDesc.DRAFT, value: this.statusList.DRAFT});
    this.categoryList.push({label: this.statusListDesc.PENDING_APPROVAL, value: this.statusList.PENDING_APPROVAL});
    this.categoryList.push({label: this.statusListDesc.ACCEPTED, value: this.statusList.ACCEPTED});
    this.categoryList.push({label: this.statusListDesc.DECLINED, value: this.statusList.DECLINED});
    this.categoryList.push({label: this.statusListDesc.RETURNED, value: this.statusList.RETURNED});
    this.categoryList.push({label: this.statusListDesc.PAID, value: this.statusList.PAID});
  }

}
