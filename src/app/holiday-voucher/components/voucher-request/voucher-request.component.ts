import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VoucherRequestDto } from 'src/app/holiday-voucher/objects/dtos/voucher-request-dto';
import { HolidayVoucherService } from 'src/app/holiday-voucher/services/holiday-voucher.service';
import { VoucherRequestModel } from 'src/app/holiday-voucher/objects/models/voucher-request-model';
import { VoucherRequestStatusListDesc, VoucherRequestStatusList, VoucherRequestStatusColorList, VoucherRequestWFActions } from 'src/app/holiday-voucher/objects/enums/enums.enum';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PromptModalComponent } from 'src/app/shared/components/modals/prompt-modal/prompt-modal.component';
import { ToastrService } from 'ngx-toastr';
import { VoucherRequestContributionDto } from 'src/app/holiday-voucher/objects/dtos/voucher-request-contribution';
import { PromptNumberModalComponent } from 'src/app/shared/components/modals/prompt-number-modal/prompt-number-modal.component';
import { DialogConstants } from 'src/app/shared/components/modals/constants';
import { HolidayVoucherConstants } from '../../objects/values/constants';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ContributionService } from '../../services/contribution.service';

@Component({
  selector: 'app-voucher-request',
  templateUrl: './voucher-request.component.html'
})
export class VoucherRequestComponent implements OnInit {

  public requestId:string = null;
  public voucherRequest: VoucherRequestModel = new VoucherRequestModel();
  public wfActions: string[] = [];
  public voucherContribution: number = null;
  public voucherContributionAllowed: number = null;
  public voucherContributionMax: number = null;
  public workingTime: number = 1; //default predpokladame plny pracovny uvazok - 100%

  public statusList = VoucherRequestStatusList;
  public statusListDesc = VoucherRequestStatusListDesc;
  public statusColorList = VoucherRequestStatusColorList;
  public voucherRequestWFActions = VoucherRequestWFActions;

  constructor(
    private route: ActivatedRoute,
    private ngbModal: NgbModal,
    private voucherService: HolidayVoucherService,
    private contributionService: ContributionService,
    private toastr: ToastrService,
    private loader: LoaderService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (parameter) => {
        if (parameter.hasOwnProperty('id')) {
          this.requestId = parameter['id'];
          this.voucherService.getVoucherRequest(this.requestId).subscribe(
            (data:VoucherRequestDto) => {
              this.voucherRequest = new VoucherRequestModel(data);
              if (this.voucherRequest.dateFrom.indexOf('.') > 0) {
                this.voucherRequest.dateFromTo = this.voucherRequest.dateFrom.substring(0, this.voucherRequest.dateFrom.lastIndexOf('.') + 1) + '-' + this.voucherRequest.dateTo;
              }

              /* nacitanie naroku na dovolenkovy poukaz */
              this.loadContribution(this.voucherRequest.authorId);

            },
            (error) => {
              console.error(error);
            }
          );

          /* nacitanie akcii  z WF */
          this.loader.show('wf_voucher_loader');
          this.voucherService.getVoucherRequestWFActions(parameter['id']).subscribe(
            (data) => {
              /* setTimeout(
                ()=>{
                  this.loader.hide('wf_voucher_loader');
                  this.wfActions = data['actions'];
                },3000
              ); */
              this.loader.hide('wf_voucher_loader');
              this.wfActions = data['actions'];
            },
            (error) => {
              this.loader.hide('wf_voucher_loader');
              console.error(error);
            }
          );
        }
      },
      (error) => {
        console.error(error);
      }
    )
  }

  public loadContribution(personId: string) {
    this.contributionService.getContributionAmount(personId).subscribe(
      (data:VoucherRequestContributionDto) => {
        this.voucherContribution = data.contributionAmount;
        this.voucherContributionMax = data.contributionAmountMax;
        this.workingTime = data.workingTime;
        let minValue = Math.min(this.voucherContribution, this.workingTime * HolidayVoucherConstants.MAX_CONTRIBUTION_PERCENT * this.voucherRequest.price);
        this.voucherContributionAllowed = Math.round( minValue * 100) / 100; //ponechame len 2 desatinne miesta
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public acceptRequest():void {
    /* modalny dialog na zadanie sumy */
    const modalInstance: NgbModalRef = this.ngbModal.open(PromptNumberModalComponent, { size: 'lg', centered: true });

    // vstupne parametre
    modalInstance.componentInstance.dialogData = {
      subTitle: 'Zadajte výšku príspevku na rekreáciu.',
      minValue: HolidayVoucherConstants.MIN_CONTRIBUTION_AMOUNT,
      maxValue: this.voucherContributionAllowed,
      value: this.voucherContributionAllowed, 
      message: ['Môžete zadať maximálne ' + this.voucherContributionAllowed + ' EUR.'],
      placeholder: 'EUR',
      cancel: DialogConstants.DIALOG_DEFAULT_CANCEL,
      ok: DialogConstants.DIALOG_DEFAULT_OK
    };

    modalInstance.result.then(
      (data) => {
        if (data && data >= HolidayVoucherConstants.MIN_CONTRIBUTION_AMOUNT && data <= this.voucherContributionAllowed) {
          /* zadame dovod vratenia/zamietnutia ziadosti */
          /* zavolanie servisu na odstranenie ziadosti / nastavenie stavu na zruseny... 
          podla navratovej hodnoty zobrazime informaciu do toastera */
          this.loader.show('voucher_loader');
          this.voucherRequest.contributionAmount = data;
          this.voucherService.setVoucherRequest(this.voucherRequest, VoucherRequestWFActions.ACCEPT).subscribe(
            () => {
              this.loader.hide('voucher_loader');
              this.toastr.success('Žiadosť bola schválená.');
              this.router.navigateByUrl('/holiday-voucher');
            },
            (error) => {
              this.loader.hide('voucher_loader');
              console.error(error);
              this.toastr.error(error['error-message'], 'Chyba pri spracovaní');
            }
          );
        } else {
          this.toastr.error('Zadaná hodnota nie je v povolenom rozsahu.');
        }

      },
      () => {
        /* zavrieme dialog cez dismiss */

      }
    )
  }

  public payRequest(): void {
    this.loader.show('voucher_loader');
    this.voucherService.setVoucherRequest(this.voucherRequest, VoucherRequestWFActions.PAY).subscribe(
      () => {
        this.loader.hide('voucher_loader');
        this.toastr.success('Požadovaná čiastka bola vyplatená.');
        this.router.navigateByUrl('/holiday-voucher');
      },
      (error) => {
        this.loader.hide('voucher_loader');
        console.error(error);
        this.toastr.error(error['error-message'], 'Chyba pri spracovaní');
      }
    );
  }

  public declineRequest():void {
    /* modalny dialog na kontrolnu otazku */
    const modalInstance: NgbModalRef = this.ngbModal.open(PromptModalComponent, { size: 'lg', centered: true });

    // vstupne parametre
    modalInstance.componentInstance.dialogData = {
      message: ['Uveďte dôvod zamietnutia žiadosti'],
      cancel: DialogConstants.DIALOG_DEFAULT_CANCEL,
      ok: DialogConstants.DIALOG_DEFAULT_OK
    };

    modalInstance.result.then(
      (data) => {
        if (data && data.length > 0) {
          /* zadame dovod vratenia/zamietnutia ziadosti */
          /* zavolanie servisu na odstranenie ziadosti / nastavenie stavu na zruseny... 
          podla navratovej hodnoty zobrazime informaciu do toastera */
          this.loader.show('voucher_loader');
          this.voucherRequest.reasonForReturn = data;
          this.voucherService.setVoucherRequest(this.voucherRequest, VoucherRequestWFActions.DECLINE).subscribe(
            () => {
              this.loader.hide('voucher_loader');
              this.toastr.success('Žiadosť bola zamietnutá.');
              this.router.navigateByUrl('/holiday-voucher');
            },
            (error) => {
              this.loader.hide('voucher_loader');
              console.error(error);
              this.toastr.error(error['error-message'], 'Chyba pri spracovaní');
            }
          );
        }

      },
      () => {
        /* zavrieme dialog cez dismiss */

      }
    )
  }

  public returnRequest():void {
    /* modalny dialog na kontrolnu otazku */
    const modalInstance: NgbModalRef = this.ngbModal.open(PromptModalComponent, { size: 'lg', centered: true });

    // vstupne parametre
    modalInstance.componentInstance.dialogData = {
      message: ['Uveďte dôvod vrátenia žiadosti'],
      cancel: DialogConstants.DIALOG_DEFAULT_CANCEL,
      ok: DialogConstants.DIALOG_DEFAULT_OK
    };

    modalInstance.result.then(
      (data) => {
        if (data && data.length > 0) {
          /* zadame dovod vratenia/zamietnutia ziadosti */
          /* zavolanie servisu na odstranenie ziadosti / nastavenie stavu na zruseny... 
          podla navratovej hodnoty zobrazime informaciu do toastera */
          this.loader.show('voucher_loader');
          this.voucherRequest.reasonForReturn = data;
          this.voucherService.setVoucherRequest(this.voucherRequest, VoucherRequestWFActions.RETURN).subscribe(
            () => {
              this.loader.hide('voucher_loader');
              this.toastr.success('Žiadosť bola vrátená na prepracovanie.');
              this.router.navigateByUrl('/holiday-voucher');
            },
            (error) => {
              this.loader.hide('voucher_loader');
              console.error(error);
              this.toastr.error(error['error-message'], 'Chyba pri spracovaní');
            }
          );

        }

      },
      () => {
        /* zavrieme dialog cez dismiss */

      }
    )
  }

}
