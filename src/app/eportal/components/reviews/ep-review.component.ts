import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { DlgAddThemeComponent } from '../meetings/dlgtheme.component';
import { DlgMsgInstructionComponent } from 'src/app/eportal/components/dialogs/dlgmsginstruction.component';
import { AlertModalComponent } from 'src/app/shared/components/modals/alert-modal/alert-modal.component';
import { DialogConstants } from 'src/app/shared/components/modals/constants';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { UserContextService } from 'src/app/eportal/services/user-context.service';

/**
 * Component: Code Review
 */
@Component({
  templateUrl: './ep-review.component.html',
  styleUrls: ['../eportal.css']
})
export class EpReviewComponent implements OnInit {
  public idl: string = '';
  public id: string;
  public data: any = {};

  public constructor(
    public usrCtx: UserContextService,
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
            this.eportalSvc.getReview(this.id),
          ).subscribe(
            data => {
              this.data = data[0];
              this.loader.showSpinner(false);
            },
            () => {
              // console.error(err);
              forkJoin(
                this.eportalSvc.getPersData(this.usrCtx.userId),
                this.eportalSvc.getPersData(this.idl),
                this.eportalSvc.getThemes(this.usrCtx.userId, 'reviews'),
              ).subscribe(
                pdata => {
                  const today = new Date();
                  this.data = {
                    'id': this.id,
                    'procdate': today,
                    'name': 'meeting ' + today,
                    'evaluator': {
                      personUN: pdata[0].personUN,
                      personFN: pdata[0].personFN,
                      personID: pdata[0].personID,
                    },
                    'evaluated': {
                      personUN: pdata[1].personUN,
                      personFN: pdata[1].personFN,
                      personID: pdata[1].personID,
                    },
                    'themes': pdata[2].items
                  }
                }
              );
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
    this.eportalSvc.setReview(this.data).subscribe(
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

  public goToLastPath(): void {
    this.eportalSvc.goToLastPath(this.router);
  }
}
