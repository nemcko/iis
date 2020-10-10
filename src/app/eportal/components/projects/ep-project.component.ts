import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { UserContextService } from 'src/app/eportal/services/user-context.service';
import { DlgSelectUsers } from '../dialogs/dlgselusers.component';

/**
 * Component: Rodný list projektu
 */
@Component({
  templateUrl: './ep-project.component.html',
  styleUrls: ['../eportal.css']
})
export class EpProjectComponent implements OnInit {
  public idl: string = '';
  public id: string = '';
  public data: any = {};
  public users: any = [];

  public constructor(
    public usrCtx: UserContextService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private eportalSvc: EpService,
  ) {
    usrCtx.setPortalSharedFunctions(this);
  }

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
            this.eportalSvc.getProject(this.id),
            this.eportalSvc.getUsers(),
          ).subscribe(
            data => {
              this.data = data[0];
              this.users = data[1];
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

  /**
   * Manages team: Dialóg výberu členov tímu
   */
  public manageTeam(): void {
    const modalRef = this.modalService.open(DlgSelectUsers, { backdrop: 'static', windowClass: 'dlgopen', centered: true, size: 'lg' });
    modalRef.componentInstance.displayData(this, this.id);
  }


  public gotoLastReview($event, item): void {
    this.router.navigate(['portal', item.personID, 'reviews', item.lastReviewId]);
    $event.stopPropagation();
  }

  public gotoPersCard($event, item): void {
    this.router.navigate(['portal', item.personID, 'detail']);
    $event.stopPropagation();
  }

  // public getWorktime(date1: Date, date2: Date = null): string {
  //   const msec = date2.getMilliseconds() - (date2 ? date1.getMilliseconds() : 0);
  //   const mins = Math.floor(msec / 60000) % 60;
  //   const hrs = Math.floor(msec / 60000 / 60);
  //   return (hrs ? hrs + 'h ' : '') + (mins ? mins + 'min ' : '')
  // }
  public getWorktime(item: any): string {
    let decimalTime = item.workhours * 60 * 60;
    const hours = Math.floor(decimalTime / (60 * 60));
    decimalTime = decimalTime - hours * 60 * 60;
    const minutes = Math.floor(decimalTime / 60);
    return (hours ? hours + 'h ' : '') + (minutes ? minutes + 'min ' : '');
  }



}
