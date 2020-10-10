import { Component, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../../../shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { environment } from 'src/environments/environment';

/**
 * Component: Dialógové okno pre personálne údaje zamestnanca
 */
@Component({
  templateUrl: './dlgpinfo.component.html',
  styleUrls: ['../eportal.css']
})
export class DlgPinfoComponent {
  public parent: any;
  public lngs = [
    { label: 'Slovenský', value: 'sk' },
    { label: 'Anglický', value: 'en' },
    { label: 'Švédsky', value: 'sv' },
    { label: 'Rumunský', value: 'ro' }
  ];

  public personID = '';
  public languages = [];
  public description = '';
  public docname = '';

  @ViewChild('dlg') public dlg;

  public documentUploadConfig = {
    url: `${environment.REST_POZA}${environment.REST_POZA_UPDPERSDOC}?id=`,
    acceptedFiles: '',
    createImageThumbnails: true,
    maxFiles: 1,
    maxFilesize: 10,
    autoReset: 2000,
    errorReset: 2000,
    cancelReset: 2000
  };

  public constructor(
    public activeModal: NgbActiveModal,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private loader: LoaderService,
    private eportalSvc: EpService,
  ) {
  }

  public displayData(parent: any, id: string): void {
    this.parent = parent;
    this.loadData(id);
  }

  public loadData(id: string): void {
    if (id) {
      this.documentUploadConfig['url'] = this.documentUploadConfig['url'] + id;
      this.loader.showSpinner();
      forkJoin(
        this.eportalSvc.getPersData(id),
      ).subscribe(
        data => {
          this.personID = data[0].personID;
          this.description = data[0].desc;
          this.languages = data[0].languages;
          this.docname = data[0].docname;
          this.loader.showSpinner(false);
        },
        err => {
          console.error(err);
          this.loader.showSpinner(false);
        }
      );
    }
  }

  public documentUploadSuccess(args: any): void {
    try {
      this.docname = args[0]['name'];
    }
    catch (e) {
      this.toastr.error(e);
    }
  }

  public documentUploadError(args: any): void {
    this.toastr.error('Chyba pri odoslaní súboru ' + args[0]['name']);
    console.error(args);
  }

  public documentDelete(): void {
    this.loader.showSpinner();
    this.eportalSvc.delPersDoc(this.personID).subscribe(
      () => {
        this.loader.showSpinner(false);
        this.parent.refreshPersinfo();
        this.docname = '';
      },
      err => {
        this.loader.showSpinner(false);
        this.toastr.error(err);
      }
    );

  }

  public save(): void {
    this.loader.showSpinner();
    this.eportalSvc.setPersData({
      personID: this.personID,
      desc: this.description,
      docname: this.docname,
      languages: JSON.stringify(this.languages)
    }).subscribe(
      () => {
        this.loader.showSpinner(false);
        this.parent.refreshPersinfo();
        this.dlg.close();
      },
      err => {
        console.error(err);
        this.loader.showSpinner(false);
      }
    );
  }
}
