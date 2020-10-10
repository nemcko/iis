import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { UserContextService } from 'src/app/eportal/services/user-context.service';

/**
 * Component: Karta tímlídera
 */
@Component({
  // selector: 'tlcard',
  templateUrl: './ep-tlcard.component.html',
  styleUrls: ['../eportal.css']
})
export class EpTlcardComponent implements OnInit {
  public data: any;
  public id: string;

  public constructor(
    public usrCtx: UserContextService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    public eportalSvc: EpService,
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoaderService,
  ) {
    usrCtx.setPortalSharedFunctions(this);
  }

  public ngOnInit(): void {
    this.eportalSvc.storePath(this.route);

    this.loader.showSpinner();
    this.route.params.subscribe(
      (param) => {
        if (param['id']) {
          this.id = param['id'];
          forkJoin(
            this.eportalSvc.getTlcard(this.id),
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
}
