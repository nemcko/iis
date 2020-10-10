import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { DlgAddThemeComponent } from '../meetings/dlgtheme.component';
import { DlgMsgInstructionComponent } from 'src/app/eportal/components/dialogs/dlgmsginstruction.component';
import { AlertModalComponent } from 'src/app/shared/components/modals/alert-modal/alert-modal.component';
import { DialogConstants } from 'src/app/shared/components/modals/constants';

/**
 * Component: Detail Close-out hodnotenia
 */
@Component({
  templateUrl: './ep-closeout.component.html',
  styleUrls: ['../eportal.css']
})
export class EpCloseoutComponent implements OnInit {
  public idl: string = '';
  public id: string;
  public data: any = {};

  public constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private eportalSvc: EpService,
  ) { }

  public ngOnInit(): void {
    this.eportalSvc.storePath(this.route);

    this.loader.showSpinner();
    this.route.params.subscribe(
      (param) => {
        if (param['idl']) {
          this.idl = param['idl'];
        }
        if (param['id']) {
          this.id = param['id'];
          forkJoin(
            this.eportalSvc.getCloseout(this.id),
          ).subscribe(
            data => {
              this.data = data[0];
              this.loader.showSpinner(false);
            },
            err => {
              console.error(err);
              this.loader.showSpinner(false);
            }
          );
        }

      },
      (error) => {
        console.error(error);
        this.loader.showSpinner(false);
      }
    );

  }

  public get hasThemes(): boolean {
    return this.data && this.data.items && this.data.items.length;
  }

  public addTheme(): void {
    const modalRef = this.modalService.open(DlgAddThemeComponent, { backdrop: 'static', windowClass: 'dlgopen', centered: true });
    modalRef.componentInstance.displayData(this);
  }

  public showInstructions(): void {
    const modalRef = this.modalService.open(DlgMsgInstructionComponent, { backdrop: 'static', windowClass: 'dlgopen', centered: true });
    modalRef.componentInstance.displayData(this);
  }

  public saveData(publish: boolean = false): void {
    this.loader.showSpinner();
    this.data.published = publish;
    this.eportalSvc.setCloseout(this.data).subscribe(
      () => {
        this.loader.showSpinner(false);

        const message = ['Údaje boli uložené'];
        const modalInstance = this.modalService.open(AlertModalComponent, { size: 'sm', centered: true });
        modalInstance.componentInstance.dialogData = {
          message: message,
          ok: DialogConstants.DIALOG_DEFAULT_OK
        };

      },
      err => {
        console.error(err);
        this.loader.showSpinner(false);
      }
    );
  }

  public goToLastPath():void {
    this.eportalSvc.goToLastPath(this.router);
  }

}
