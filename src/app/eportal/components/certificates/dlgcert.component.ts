import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { LoaderService } from '../../../shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { UserContextService } from 'src/app/eportal/services/user-context.service';


/**
 * Component: Dialóg detailu záznamu o certifikáte
 */
@Component({
  templateUrl: './dlgcert.component.html',
  styleUrls: ['../eportal.css']
})
export class DlgCertComponent implements OnInit {
  public parent: any;
  public datePickerOptions = {
    format: 'DD.MM.YYYY',
    allowInputToggle: true,
    locale: 'sk'
  };
  public data: any = {};
  public title: string;

  @ViewChild('dlg') public dlg;

  public constructor(
    public usrCtx: UserContextService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private loader: LoaderService,
    private eportalSvc: EpService,
  ) { }


  public ngOnInit(): void {
    this.title = 'Pridanie nového certifikátu';
  }

  public displayData(parent: any, id: string): void {
    this.parent = parent;
    this.loadData(id);
  }

  /**
   * Loads data: Načítanie údajov zo servera
   * @param id :Identifikátor záznamu
   */
  public loadData(id: string): void {
    if (id) {
      this.loader.showSpinner();
      forkJoin(
        this.eportalSvc.getCertificate(id),
      ).subscribe(
        data => {
          this.data = data[0];
          this.title = 'Certifikát';
          this.loader.showSpinner(false);
        },
        err => {
          console.error(err);
          this.loader.showSpinner(false);
        }
      );
    }
    else {
      this.data.id = null;
    }
  }


  /**
   * Saves : Uloženie údajov
   */
  public save(): void {
    this.loader.showSpinner();
    this.eportalSvc.setCertificate(this.data).subscribe(
      () => {
        this.loader.showSpinner(false);
        this.dlg.close();
      },
      err => {
        console.error(err);
        this.loader.showSpinner(false);
      }
    );
  }
}
