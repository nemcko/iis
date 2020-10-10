import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { YesnoModalComponent } from 'src/app/shared/components/modals/yesno-modal/yesno-modal.component';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { AttachmentType } from 'src/app/shared/objects/enums/attachments.enum';
import { VoucherRequestStatusList, VoucherRequestWFActions } from 'src/app/holiday-voucher/objects/enums/enums.enum';
import { VoucherRequestModel } from 'src/app/holiday-voucher/objects/models/voucher-request-model';
import { DataService } from 'src/app/shared/services/data-server.service';
import { UserDto } from 'src/app/shared/objects/dtos/user-dto';
import { ActivatedRoute, Router } from '@angular/router';
import { VoucherRequestDto } from 'src/app/holiday-voucher/objects/dtos/voucher-request-dto';
import { HolidayVoucherService } from 'src/app/holiday-voucher/services/holiday-voucher.service';
import { FormGroup } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { DialogConstants } from 'src/app/shared/components/modals/constants';
import { HolidayVoucherConstants } from '../../objects/values/constants';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-voucher-request-edit',
  templateUrl: './voucher-request-edit.component.html'
})
export class VoucherRequestEditComponent implements OnInit {

  public isHR: boolean = false;
  public requestId: string = null;
  public request: VoucherRequestModel = new VoucherRequestModel();
  public oldModel: string = null;
  public wfActions: string[] = [];
  public isFormReady: boolean = false;

  public statusList = VoucherRequestStatusList;
  public voucherRequestWFActions = VoucherRequestWFActions;

  /* calendars */
  public datePickerOptionsFrom = {
    format: "DD.MM.YYYY",
    allowInputToggle: true,
    locale: 'sk'
  };

  public datePickerOptionsTo = {
    format: "DD.MM.YYYY",
    allowInputToggle: true,
    locale: 'sk'
  };

  
  public modelDateFrom: moment.Moment = moment();
  public modelDateTo: moment.Moment = moment();

  public templateRequestURL: string = '';
  
  /* upload control */
  public fileUploadConfig = {
    url: environment.REST_RP_IMAGE_UPLOAD + '?docId',
    acceptedFiles: '.jpg,.jpeg,.png,.gif,.pdf,.doc,.docx',
    createImageThumbnails: true,
    maxFiles: 10,
    maxFilesize: 10,
    autoReset: 2000,
    errorReset: 2000,
    cancelReset: 2000
  };
  
  public attachmentTypes = AttachmentType;
  
  /* dropzone customized messages */
  public dropzoneCustomMessages = {
    dictDefaultMessage: "Presuňte sem súbory na nahranie.",
    dictFallbackMessage: "Váš prehliadač nepodporuje drag'n'drop nahrávanie obrázkov.",
    dictFallbackText: "Použite prosím formulár nižšie na nahratie obrázkov ako za starých čias.",
    dictFileTooBig: "Súbor je príliš veľký ({{filesize}}MiB). Maximálna veľkosť: {{maxFilesize}}MiB.",
    dictInvalidFileType: "Nemôžete nahrávať súbory tohto typu.",
    dictResponseError: "Server odpovedal stavovým kódom {{statusCode}}.",
    dictCancelUpload: "Zrušiť nahrávanie",
    dictCancelUploadConfirmation: "Ste si istý, že chcete zrušiť nahrávanie?",
    dictRemoveFile: "Odstrániť súbor",
    dictMaxFilesExceeded: "Nemôžete nahrať viac súborov."
  }
  
  private dateFormats = ["DD. MM. YYYY", "DD.MM.YYYY"];
  private validationMessage: string = '';

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private ngbModal: NgbModal,
    private dataService: DataService,
    private voucherService: HolidayVoucherService,
    private loader: LoaderService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const observables: Observable<any>[] = [];
    const user: UserDto = this.dataService.getData('uzivatel');
    this.isHR = user.roles.includes('[HR]') || user.roles.includes('[Manager]');

    this.route.params.subscribe(
      (param) => {
        if (param['id']) {
          /* otvorenie existujuceho oznamu */
          this.requestId = param['id'];
          observables.push(this.loadVoucherRequest(this.requestId));

        } else {
          /* vytvorenie noveho oznamu */
          observables.push(this.createVoucherRequest());
        }

        //observables.push(this.getTemplateRequestURL());

        forkJoin(observables).subscribe(
          // po dokonceni vsetkych observables...
          () => {
            this.oldModel = JSON.stringify(this.request);
            this.loader.show('wf_voucher_loader');
            this.voucherService.getVoucherRequestWFActions(this.request.id).subscribe(
              (data) => {
                /* setTimeout(
                  ()=>{
                    this.wfActions = data['actions'];
                    this.isFormReady = true;
                    this.loader.hide('wf_voucher_loader'); 
                  },2000
                ); */
                this.wfActions = data['actions'];
                this.isFormReady = true;
                this.loader.hide('wf_voucher_loader');
              },
              (error) => {
                this.loader.hide('wf_voucher_loader');
                console.error(error);
              }
            );
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );

  }

  public createVoucherRequest() :Observable<any> {
    return Observable.create(
      observer => {
        this.voucherService.getVoucherRequestId().subscribe(
          (id: any) => {
            this.requestId = id.docId;
            this.request = new VoucherRequestModel();
            this.request.id = id.docId;
            this.request.status = this.statusList.DRAFT;
            this.modelDateFrom = moment();
            this.datePickerOptionsTo['minDate'] = this.modelDateFrom;
            this.modelDateTo = moment();
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
    );
  }

  public loadVoucherRequest(id: string): Observable<any> {
    return Observable.create(
      observer => {
        this.voucherService.getVoucherRequest(id).subscribe(
          (data: VoucherRequestDto) => {
            this.request = new VoucherRequestModel(data);
            this.modelDateFrom = moment(this.request.dateFrom, this.dateFormats);

            if (!this.modelDateFrom.isValid()) {
              this.modelDateFrom = moment();
            }

            this.datePickerOptionsTo['minDate'] = this.modelDateFrom;
            this.modelDateTo = moment(this.request.dateTo, this.dateFormats);

            if (!this.modelDateTo.isValid()) {
              this.modelDateTo = moment();
            }
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
    );
  }

  public getTemplateRequestURL(): Observable<any> {
    return Observable.create(
      observer => {
        this.voucherService.getTemplateRequestURL().subscribe(
          (data) => {
            this.templateRequestURL = data.url;
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
    );
  }

  public removeAttachment(attachmentName: string): void {
    const index = this.request.attachments.indexOf(attachmentName);
    if (index >= 0) {
      this.request.attachments.splice(index, 1);
    }
  }

  public fileUploadError(args: any): void {
    this.toastr.error('Chyba pri odoslaní súboru. <br>' + args[1]);
    console.error(args);
  }

  public fileUploadSuccess(args: any): void {
    try {
      const fileUrl = JSON.parse(args[1])['location'];
      this.request.attachments.push(fileUrl);
    } catch (e) {
      console.error(e);
      this.toastr.error(e);
    }
  }

  public save(form: FormGroup, action: string): void {

    if (action == VoucherRequestWFActions.SAVE || this.isValid(form)) {
      this.loader.show('voucher_loader');
      //udalost volana pri ulozeni formulara
      this.request.dateFrom = this.modelDateFrom.format("DD.MM.YYYY");
      this.request.dateTo = this.modelDateTo.format("DD.MM.YYYY");
      this.request.nights = this.modelDateTo.diff(this.modelDateFrom, 'days');

      this.sendRequest(action);
      
    } else {
      this.toastr.error(this.validationMessage, '', {messageClass: 'text-formated'});
    }
  }

  public resetChanges(): void {
    // stlacenie tlacitka zrusit zmeny
    if (this.isDirty()) {
      //kontrolny modalny dialog, po potvrdeni vykonat zmenu kompetencii a nastavit oldModel.
      const modalInstance: NgbModalRef = this.ngbModal.open(YesnoModalComponent, { size: 'lg', centered: true });

      // vstupne parametre
      modalInstance.componentInstance.dialogData = {
        message: ['Naozaj si prajete zahodiť zmeny vykonané v dokumente a vrátiť sa na prehľad žiadostí?'],
        yes: DialogConstants.DIALOG_DEFAULT_YES,
        no: DialogConstants.DIALOG_DEFAULT_NO,
        cancel: DialogConstants.DIALOG_DEFAULT_CANCEL
      };

      modalInstance.result.then(
        (data) => {
          if (data) {
            //v pripade potvrdenia dialogu, prejdeme na zoznam dokumentov 
            this.oldModel = JSON.stringify(this.request);
            this.router.navigateByUrl('/holiday-voucher');
          }
        },
        () => {
          //pri zavreti alebo zruseni dialogu nerobit nic.
        }
      );
    } else {
      // ak nebol modifikovany formular, zavrieme ho bez kontrolnej otazky
      this.router.navigateByUrl('/holiday-voucher');
    }
  }

  public removeRequest(): void {
    /* modalny dialog na kontrolnu otazku */
    const modalInstance: NgbModalRef = this.ngbModal.open(YesnoModalComponent, { size: 'lg', centered: true });

    // vstupne parametre
    modalInstance.componentInstance.dialogData = {
      message: ['Chcete odstrániť žiadosť?'],
      cancel: DialogConstants.DIALOG_DEFAULT_CANCEL,
      yes: DialogConstants.DIALOG_DEFAULT_YES,
      no: DialogConstants.DIALOG_DEFAULT_NO
    };

    modalInstance.result.then(
      (data) => {
        if (data) {
          /* potvrdime odstranenie ziadosti */
          /* TODO */
          /* zavolanie servisu na odstranenie ziadosti / nastavenie stavu na zruseny... 
          podla navratovej hodnoty zobrazime informaciu do toastera */
          this.loader.show('voucher_loader');
          this.voucherService.setVoucherRequest(this.request, VoucherRequestWFActions.DELETE).subscribe(
            () => {
              this.loader.hide('voucher_loader');
              this.oldModel = JSON.stringify(this.request);
              this.toastr.success('Žiadosť bola odstránená.');
              this.router.navigateByUrl('/holiday-voucher');
            },
            (error) => {
              this.loader.hide('voucher_loader');
              console.error(error);
              this.toastr.error(error['error-message'], 'Chyba pri spracovaní');
            }
          );
          
        } else {
          /* zamietneme odstranenie ziadosti */

        }

      },
      () => {
        /* zavrieme dialog cez dismiss */

      }
    )
  }

  public dateFromChange(dateFrom: string): void {
    const dtFrom: moment.Moment = moment(dateFrom, this.dateFormats);
    if (dtFrom.isValid()) {
      this.modelDateFrom = dtFrom;
      if (!this.modelDateTo) {
        this.modelDateTo = dtFrom;
      }
      this.datePickerOptionsTo['minDate'] = dtFrom;
      if (dtFrom.isAfter(this.modelDateTo)) {
        this.modelDateTo = dtFrom;
      }
    }
  }

  public dateToChange(dateTo: string): void {
    const dtTo: moment.Moment = moment(dateTo, this.dateFormats);
    this.modelDateTo = dtTo;
  }

  private isDirty(): boolean {
    //kontrola, ci sa zmenili data formulara
    return JSON.stringify(this.request) != this.oldModel;;
  }

  private isValid(form: FormGroup): boolean {
    // kontrola na pocet priloh
    this.validationMessage = '';
    this.validationMessage += (form.valid) ? '' : 'Nie sú vyplnené požadované údaje.\n';

    const validName = (this.request.name && this.request.name.length > 0);
    this.validationMessage += (validName) ? '' : 'Zadajte prosím názov rekreačného zariadenia.\n';

    const validLocation = (this.request.location && this.request.location.length > 0);
    this.validationMessage += (validLocation) ? '' : 'Zadajte prosím miesto rekreácie.\n';

    const validDateFrom = (this.modelDateFrom && this.modelDateFrom.isValid());
    this.validationMessage += (validDateFrom ? '' : 'Zadajte dátum príchodu.\n');

    const validDateTo = (this.modelDateTo && this.modelDateTo.isValid());
    this.validationMessage += (validDateFrom ? '' : 'Zadajte dátum odchodu.\n');

    const validNights = (this.modelDateTo.diff(this.modelDateFrom, 'days') >= HolidayVoucherConstants.MIN_NIGHTS);
    this.validationMessage += (validNights ? '' : 'Pobyt musí byť minimálne na 2 noci.\n');

    const validPrice = (this.request.price > 0);
    this.validationMessage += (validPrice) ? '' : 'Zadajte prosím celkovú cenu.\n';

    const validPersonsCount = (this.request.personsCount >= 1);
    this.validationMessage += (validPersonsCount) ? '' : 'Zadajte prosím počet osôb.\n';

    let validPersons = true;

    if (this.request.personsCount > 1) {
      validPersons = (this.request.aditionalPersons.length > 0);
      this.validationMessage += (validPersons) ? '' : 'Pri viac ako jednej osobe vyplňte aj zoznam ďalších osôb.\n';
    }
    
    const validAttachment = (this.request.attachments && this.request.attachments.length > 0);
    this.validationMessage += (validAttachment) ? '' : 'Pridajte k žiadosti prílohu - faktúru.\n';

    this.validationMessage += (this.request.accepted) ? '' : 'Potvrďte prosím čestné prehlásenie.\n';
    
    return form.valid && validName && validLocation && validDateFrom && validDateTo && validNights && validPrice && validPersonsCount && validPersons && validAttachment && this.request.accepted;
  }

  private sendRequest(action: string ):void {
    this.voucherService.setVoucherRequest(this.request, action).subscribe(
      () => {
        this.loader.hide('voucher_loader');
        this.oldModel = JSON.stringify(this.request);
        this.toastr.success('Akcia bola úspešne vykonaná');
        switch (action) {
          case VoucherRequestWFActions.SAVE:
            /* pri ulozeni nerobime po akcii nic, uzivatel moze pokracovat v praci */
            break;

          default:

            this.router.navigateByUrl('/holiday-voucher/vouchers');
            break;
        }
      },
      (error) => {
        this.loader.hide('voucher_loader');
        console.error(error);
        this.toastr.error(error['error-message'], 'Chyba pri ukladaní údajov');
      }
    );
  }

}
