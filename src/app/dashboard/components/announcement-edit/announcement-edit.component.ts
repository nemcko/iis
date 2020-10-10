import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementDataService } from 'src/app/dashboard/services/announcement-data.service';
import { AnnouncementDto } from 'src/app/dashboard/objects/dtos/announcement-dto';
import { AnnouncementModel } from 'src/app/dashboard/objects/models/announcement-model';
import { environment } from 'src/environments/environment';
import { Select2OptionData } from 'ng2-select2';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { Privileges, DocumentType } from 'src/app/dashboard/objects/enums/enums.enum';
import { GolemService } from 'src/app/shared/services/golem.service';
import * as _ from 'lodash';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { RecipientDto } from 'src/app/shared/objects/dtos/recipient-dto';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from 'src/app/shared/components/modals/confirmation-modal/confirmation-modal.component';
import { AlertModalComponent } from 'src/app/shared/components/modals/alert-modal/alert-modal.component';
import { UserDto } from 'src/app/shared/objects/dtos/user-dto';
import { YesnoModalComponent } from 'src/app/shared/components/modals/yesno-modal/yesno-modal.component';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data-server.service';
import { Observable, forkJoin } from 'rxjs';
import { DialogConstants } from 'src/app/shared/components/modals/constants';
import { AttachmentType } from 'src/app/shared/objects/enums/attachments.enum';
import { RecipientsCollectionType, RecipientsCollectionTypeDesc } from 'src/app/shared/objects/enums/recipients.enum';

@Component({
  selector: 'app-announcement-edit',
  templateUrl: './announcement-edit.component.html'
})
export class AnnouncementEditComponent implements OnInit {

  @ViewChild('oznamForm') oznamForm: NgForm;

  /* general info */
  public user: UserDto;
  public oznam: AnnouncementModel = new AnnouncementModel;
  
  public isHR: boolean = false;
  public isAnnouncement: boolean = true;
  public isThank: boolean = false;
  public isQuestion: boolean = false;
  public isQuickAnnouncement: boolean = false;
  public defaultAuthor: Select2OptionData = null;
  public formTitle: string = '';

  public attachmentTypes = AttachmentType;
  public privilegesList = Privileges;
  public documentTypes = DocumentType;

  public imageUploadURL: string = environment.REST_IMAGE_UPLOAD;

  /* tags */
  public oznamyCategories: string[] = [];
  
  /* recipients */
  public authorList: Select2OptionData[] = null;
  public currentCollection: Select2OptionData[] = null;

  public recipientsCollectionTypes = RecipientsCollectionType;
  public recipientsCollectionTypeDesc = RecipientsCollectionTypeDesc;
  public currentCollectionType: string = '';

  public options: Select2Options = {
    minimumInputLength: 0,
    multiple: false,
    closeOnSelect: true,
    width: '100%'
  };

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

  public datePickerOptions = {
    format: "DD.MM.YYYY",
    allowInputToggle: true,
    locale: 'sk'
  };

  public modelCalendarFrom: moment.Moment = moment();
  public modelCalendarTo: moment.Moment = moment();
  public modelDatePublishing: moment.Moment = moment();
  public modelHourPublishing: number = 0;
  public modelMinutePublishing: number = 0;

  public editorParams: any = {
    theme: 'modern',
    plugins: ['image', 'imagetools', 'media', 'link', 'paste', 'table', 'lists', 'noneditable', 'textcolor', 'code'],
    skin_url: 'assets/scripts/tinymce/skins/lightgray',
    language_url: 'assets/scripts/tinymce/langs/sk.js',
    menubar: false,
    paste_data_images: true,
    image_advtab: true,
    height: "800",
    indentation: '70px',
    elementpath: false,
    statusbar: false,
    readonly: false,
    branding: false,
    custom_undo_redo_levels: 10,
    toolbar: 'undo redo | styleselect | forecolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | removeformat code',

    automatic_uploads: true,
    images_upload_url: this.imageUploadURL,

    allow_script_urls: true,
  };

  /* dropzone */
  public imageUploadConfig = {
    url: environment.REST_IMAGE_UPLOAD + '?docId',
    acceptedFiles: 'image/jpg,image/gif,image/png,image/jpeg',
    createImageThumbnails: true,
    maxFiles: 1,
    maxFilesize: 2,
    autoReset: 2000,
    errorReset: 2000,
    cancelReset: 2000
  };

  public fileUploadConfig = {
    url: environment.REST_IMAGE_UPLOAD + '?docId',
    acceptedFiles: '',
    createImageThumbnails: true,
    maxFiles: 10,
    maxFilesize: 10,
    autoReset: 2000,
    errorReset: 2000,
    cancelReset: 2000
  };

  /* dropzone customized messages */
  /* private dropzoneCustomMessages = {
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
  } */

  /* private optionsAuthor: Select2Options = {
    minimumInputLength: 0,
    multiple: false,
    closeOnSelect: true,
    width: '100%'
  }; */


  private dateFormats = ["DD. MM. YYYY", "DD.MM.YYYY", "DD.MM.YYYY H:mm", "DD. MM. YYYY H:mm"];

  private golemTeams: Select2OptionData[] = null;
  private golemUnits: Select2OptionData[] = null;
  private golemFunctions: Select2OptionData[] = null;

/* editor params */

  /* private content: string; */
  /* private buttonVisibility: boolean = true; */

  /* private tags: string[] = []; */
  private oznamId: string = null;
  /* private JSON = JSON; */
  private oldModel: string = '';
  private param;

  constructor(
    private AnnouncementDataService: AnnouncementDataService,
    private dataService: DataService,
    private AnnouncementsService: AnnouncementsService,
    private golemService: GolemService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private ngbModal: NgbModal
  ) { }

  ngOnInit() {
    const observables: Observable<any>[] = [];
    this.user = this.dataService.getData('uzivatel');
    this.defaultAuthor = { id: this.user.userName, text: this.user.fullName };
    this.isHR = this.user.roles.includes('[HR]') || this.user.roles.includes('[Manager]');

    this.route.params.subscribe(
      (param) => {
        this.param = param;
        if (this.param['id']) {
          /* otvorenie existujuceho oznamu */
          this.oznamId = this.param['id'];
          observables.push(this.loadAnnouncement(this.oznamId));

        } else {
          /* vytvorenie noveho oznamu */
          observables.push(this.createAnnouncement());
        }
      }
    );

    // vzdy dotiahneme ciselniky
    observables.push(this.loadCategories());

    //zoznam adresatov
    observables.push(this.loadGolemData());

    // po dokonceni vsetkych observables...
    forkJoin(observables).subscribe(
      () => {
        this.defaultAuthor = { id: this.oznam.author, text: this.oznam.authorFN };
      }
    );

  }

  createAnnouncement(): Observable<any> {
    return Observable.create(
      observer => {
        this.AnnouncementsService.getAnnouncementId().subscribe(
          (id: any) => {
            this.oznamId = id.docId;
            this.oznam = new AnnouncementModel();
            this.oznam.id = id.docId;
            this.oznam.author = this.user.userName;
            this.oznam.authorFN = this.user.fullName;

            /* podla parametra typ nastavime typ dokumentu */
            this.oznam.docType = this.param['type'];
            switch (this.param['type']) {
              case DocumentType.QUESTION:
                this.formTitle = 'Nová rýchla otázka';
                break;
    
              case DocumentType.QUICK_ANNOUNCEMENT:
                this.formTitle = 'Nový rýchly oznam';
                break;
    
              default:
                this.oznam.docType = DocumentType.ANNOUNCEMENT;
                this.formTitle = 'Nový interný oznam';
                break;
            }

            this.initializeAnnouncement();

            this.oznam.draft = true;
            this.oznam.privileges = ['CAN_PUBLISH', 'CAN_EDIT'];

            this.modelCalendarFrom = moment();
            this.modelCalendarTo = moment();

            observer.next();
            observer.complete();
          },
          (error) => {
            console.error(error);
            observer.next();
            observer.complete();
          }
        );

      });
  }

  loadAnnouncement(id: string): Observable<any> {
    return Observable.create(
      observer => {
        this.AnnouncementDataService.setOznamIdEditable(id);
        this.AnnouncementDataService.getOznamData().subscribe(
          (data: AnnouncementDto) => {
            this.oznam = new AnnouncementModel(data);

            /* podla parametra typ nastavime typ dokumentu */
            switch (this.oznam.docType) {
              case DocumentType.ANNOUNCEMENT:
                this.formTitle = 'Úprava interného oznamu';
                break;

              case DocumentType.QUESTION:
                this.formTitle = 'Úprava rýchlej otázky';
                break;

              case DocumentType.QUICK_ANNOUNCEMENT:
                this.formTitle = 'Úprava rýchleho oznamu';
                break;
            }

            this.initializeAnnouncement();
            
            this.modelCalendarFrom = moment(this.oznam.calendarFrom, this.dateFormats);
            if (!this.modelCalendarFrom.isValid()) {
              this.modelCalendarFrom = moment();
            }

            this.modelCalendarTo = moment(this.oznam.calendarTo, this.dateFormats);
            if (!this.modelCalendarTo.isValid()) {
              this.modelCalendarTo = moment();
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
    )
  }

  loadCategories(): Observable<any> {
    // kategorie
    return Observable.create(
      observer => {
        this.AnnouncementsService.getAnnouncementsCategories().subscribe(
          (data: string[]) => {
            this.oznamyCategories = data;
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

  loadGolemData(): Observable<any> {
    return Observable.create(
      observer => {
        this.golemService.getGolemData().subscribe(
          (data: {}[]) => {
            this.golemTeams = [{ 'id': '', 'text': '' }].concat(data[RecipientsCollectionType.TEAMS]);
            this.golemFunctions = [{ 'id': '', 'text': '' }].concat(data[RecipientsCollectionType.FUNCTIONS]);
            this.golemUnits = [{ 'id': '', 'text': '' }].concat(data[RecipientsCollectionType.UNITS]);
            this.authorList = [{ 'id': '', 'text': '' }].concat(data[RecipientsCollectionType.USERS]);
            this.setCollectionType(RecipientsCollectionType.UNITS);

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

  initializeAnnouncement(): void {

    this.datePickerOptionsTo['minDate'] = this.modelCalendarFrom;

    this.isAnnouncement = (this.oznam.docType == DocumentType.ANNOUNCEMENT);
    this.isQuestion = (this.oznam.docType == DocumentType.QUESTION);
    this.isQuickAnnouncement = (this.oznam.docType == DocumentType.QUICK_ANNOUNCEMENT);

    this.imageUploadURL = environment.REST_IMAGE_UPLOAD + '?docId=' + this.oznam.id;
    this.imageUploadConfig.url = environment.REST_IMAGE_UPLOAD + '?docId=' + this.oznam.id;
    this.fileUploadConfig.url = environment.REST_IMAGE_UPLOAD + '?docId=' + this.oznam.id;

    this.oldModel = JSON.stringify(this.oznam);

  }

  isDirty(): boolean {
    return JSON.stringify(this.oznam) != this.oldModel;
  }

  onSave(formValid: boolean, action: string): void {
    if (formValid) {
      this.prepareData();

      /* ak je zakliknute odosielanie notifikacie, upozornime pouzivatela */
      if (this.oznam.docType == DocumentType.ANNOUNCEMENT && this.oznam.sendNotification) {
        const modalInstance: NgbModalRef = this.ngbModal.open(YesnoModalComponent, { size: 'lg', centered: true });

        // vstupne parametre
        modalInstance.componentInstance.dialogData = {
          message: ['Chcete odoslať notifikáciu?'],
          cancel: DialogConstants.DIALOG_DEFAULT_CANCEL,
          yes: DialogConstants.DIALOG_DEFAULT_YES,
          no: DialogConstants.DIALOG_DEFAULT_NO
        };

        modalInstance.result
          .then(
            (data) => {
              if (!data) {
                // v pripade odpovede NIE, zrusime priznak odosielania notifikacie
                this.oznam.sendNotification = false;
              }

              this.AnnouncementsService.setAnnouncement(this.oznam, action).subscribe(
                () => {
                  this.oldModel = JSON.stringify(this.oznam);
                  if (action === 'publish') {
                    this.toastr.success('Úspešné publikovanie.');
                    this.router.navigateByUrl('/dashboard/oznam/' + this.oznam.id);
                  } else {
                    this.toastr.success('Formulár bol uložený.');
                  }
                },
                (error) => {
                  this.toastr.error('Nastala chyba pri ukladaní dát.');
                  console.error(error);
                }
              );

            },
            () => {
              // ked je dialog zatvoreny cez dismiss, nerobime nic - ani nevolame servis na ulozenie dat.  
            }
          );
      } else {
        this.AnnouncementsService.setAnnouncement(this.oznam, action).subscribe(
          () => {
            this.oldModel = JSON.stringify(this.oznam);
            if (action === 'publish') {
              this.toastr.success('Úspešné publikovanie.');
              this.router.navigateByUrl('/dashboard/oznam/' + this.oznam.id);
            } else {
              this.toastr.success('Formulár bol uložený.');
            }
          },
          (error) => {
            this.toastr.error('Nastala chyba pri ukladaní dát.');
            console.error(error);
          }
        );
      }
    } else {
      this.toastr.error('Formulár nemá vyplnené všetky údaje.');
    }

  }

  resetChanges(): void {
    this.toastr.success('Zmeny neuložené.');
    this.oldModel = JSON.stringify(this.oznam);

    if (this.oznam.draft) {
      /* v pripade noveho oznamu otvorime dashboard */
      this.router.navigateByUrl('/dashboard');
    } else {
      /* v pripade existujuceho oznamu otvorime tento oznam v read rezime */
      this.router.navigateByUrl('/dashboard/oznam/' + this.oznam.id);
    }
  }

  prepareData(): void {
    this.oznam.recipients = this.convertRecipients(this.oznam.recipients);
    this.oznam.calendarFrom = this.modelCalendarFrom.format("DD.MM.YYYY");
    this.oznam.calendarTo = this.modelCalendarTo.format("DD.MM.YYYY");
    this.modelDatePublishing = (this.modelDatePublishing && this.modelDatePublishing.isValid()) ? moment(this.modelDatePublishing.format("DD.MM.YYYY") + ' ' + this.modelHourPublishing + ':' + this.modelMinutePublishing, this.dateFormats) : null;
    this.oznam.datePublishing = (this.modelDatePublishing && this.modelDatePublishing.isValid()) ? this.modelDatePublishing.format("DD.MM.YYYY H:mm") : '';

    console.debug('oznam ... ', this.oznam);
  }

  convertRecipients(inputList: Select2OptionData[]): RecipientDto[] {
    let outputList: RecipientDto[] = [];
    inputList.forEach(
      (item) => {
        outputList.push({ id: item.id, text: item.text });
      }
    )
    return outputList;

  }

  toggleVisibility(): void {
    this.isAnnouncement = (this.oznam.docType == DocumentType.ANNOUNCEMENT);
  }

  checkAttachment(): void {
    let message = [];

    if (this.oznam.openAttachment && this.oznam.attachmentUrl && this.oznam.attachmentUrl.length != 1) {
      message = ['Na otvorenie prílohy potrebujete vybrať práve jednu prílohu.'];
    }

    if (message.length > 0) {
      const modalInstance: NgbModalRef = this.ngbModal.open(AlertModalComponent, { size: 'lg', centered: true });

      // vstupne parametre
      modalInstance.componentInstance.dialogData = {
        message: message,
        ok: DialogConstants.DIALOG_DEFAULT_OK
      };

      modalInstance.result
        .then(
          () => {
            // dialog zatvoreny cez ok
            // nedovolime nastavit automaticke otvorenie prilohy
            this.oznam.openAttachment = false;
          },
          () => {
            // dialog zatvoreny cez dismiss
            // nedovolime nastavit automaticke otvorenie prilohy
            this.oznam.openAttachment = false;
          }
        );

    }
  }

  /* dropzone */
  imageUploadSuccess(args: any): void {
    try {
      const imgUrl = JSON.parse(args[1])['location'];
      this.oznam.imgUrl = imgUrl;
    } catch (e) {
      console.error(e);
      this.toastr.error(e);
    }

  }

  imageUploadError(args: any): void {
    this.toastr.error('Chyba pri odoslaní obrázku. <br>' + args[1]);
    console.error(args);
  }

  fileUploadSuccess(args: any): void {
    try {
      const fileUrl = JSON.parse(args[1])['location'];
      this.oznam.attachmentUrl.push(fileUrl);
    } catch (e) {
      console.error(e);
      this.toastr.error(e);
    }

  }

  fileUploadError(args: any): void {
    this.toastr.error('Chyba pri odoslaní súboru. <br>' + args[1]);
    console.error(args);
  }

  preview(): void {
    this.prepareData();

    if (window.localStorage) {
      window.localStorage.setItem('oznamPreview', JSON.stringify(this.oznam));
      window.open('/index.html#/dashboard/oznam-preview', 'preview');
    }

  }

  removeAttachment(attachmentType: number, attachmentName?: string): void {
    const modalInstance: NgbModalRef = this.ngbModal.open(ConfirmationModalComponent, { size: 'lg', centered: true });

    // vstupne parametre
    modalInstance.componentInstance.dialogData = {
      message: ['Naozaj si prajete odstrániť pripojený súbor/obrázok?'],
      cancel: DialogConstants.DIALOG_DEFAULT_CANCEL,
      ok: DialogConstants.DIALOG_DEFAULT_OK
    };

    modalInstance.result
      .then(
        (result) => {
          if (result) {
            // v pripade potvrdenia odstranime subor
            switch (attachmentType) {
              case this.attachmentTypes.FILE:
                const index = this.oznam.attachmentUrl.indexOf(attachmentName);
                if (index >= 0) {
                  this.oznam.attachmentUrl.splice(index, 1);
                }
                break;

              case this.attachmentTypes.IMAGE:
                this.oznam.imgUrl = '';
                break;

            }
          }
        },
        () => {
          // ignorujeme situaciu, ked je dialog zatvoreny cez dismiss
        }
      )

  }

  dateFromChange(dateFrom: string): void {
    const dtFrom: moment.Moment = moment(dateFrom, this.dateFormats);
    this.modelCalendarFrom = dtFrom;
    if (!this.modelCalendarTo) {
      this.modelCalendarTo = dtFrom;
    }
    this.datePickerOptionsTo['minDate'] = dtFrom;
    if (dtFrom.isAfter(this.modelCalendarTo)) {
      this.modelCalendarTo = dtFrom;
    }
  }

  dateToChange(dateTo: string): void {
    const dtTo: moment.Moment = moment(dateTo, this.dateFormats);
    this.modelCalendarTo = dtTo;
  }

  dateChange(date: string): void {
    const dt: moment.Moment = moment(date, this.dateFormats);
    this.modelDatePublishing = dt;
  }

  timeChange(e: any): void {
    let inputValue = parseFloat(e.target.value);
    let minValue = parseInt(e.target.min);
    let maxValue = parseInt(e.target.max);

    if (!(isNaN(inputValue) || isNaN(minValue))) {
      if (inputValue < minValue) {
        e.target.value = minValue;
      }
    }

    if (!(isNaN(inputValue) || isNaN(maxValue))) {
      if (inputValue > maxValue) {
        e.target.value = maxValue;
      }
    }
  }

  removeRecipient(recipient: Select2OptionData): void {
    const indexOfRecipient = this.oznam.recipients.findIndex(
      (item) => {
        return (item.id === recipient.id);
      }
    );
    if (indexOfRecipient != -1) {
      this.oznam.recipients.splice(indexOfRecipient, 1);
    }

  }

  setCollectionType(type: string): void {
    this.currentCollectionType = type;
    switch (type) {
      case RecipientsCollectionType.FUNCTIONS:
        this.currentCollection = this.golemFunctions;
        break;

      case RecipientsCollectionType.TEAMS:
        this.currentCollection = this.golemTeams;
        break;

      case RecipientsCollectionType.UNITS:
        this.currentCollection = this.golemUnits;
        break;
    }

  }

  addRecipient(e: any): void {

    if (e) {
      const recipient = e.data[0];
      const indexOfRecipient = this.oznam.recipients.findIndex(
        (item) => {
          return (item.id === recipient.id);
        }
      );

      if (indexOfRecipient === -1 && recipient.id != '') {
        this.oznam.recipients.push(recipient);
      }

    }
  }

  addAuthor(e: any): void {
    console.log('e ... ', e);
    console.debug('user ... ', this.user);
    if (e && e.data && e.data.length > 0 && e.data[0].id && e.data[0].text) {
      this.oznam.author = e.data[0].id;
      this.oznam.authorFN = e.data[0].text;
    }
  }


  get diagnostic(): string {
    return JSON.stringify(this.oznam);
  }

}
