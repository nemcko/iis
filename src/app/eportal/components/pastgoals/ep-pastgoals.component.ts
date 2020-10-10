import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { SearchListFunction } from 'src/app/shared';

/**
 * Component: Ciele z uplynulých rokov
 */
@Component({
  templateUrl: './ep-pastgoals.component.html',
  styleUrls: ['../eportal.css']
})
export class EpPastgoalsComponent implements OnInit {
  public data: any;
  public searchText: string;
  public page: number = 1;
  public numItems: number = 10;
  public type: string;
  public id: number;

  public datafn: SearchListFunction;
  @ViewChild('searchlist') public searchlist;

  public curryear: string = '2020';

  public constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    public eportalSvc: EpService,
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoaderService,
  ) { }

  public ngOnInit(): void {
    this.eportalSvc.storePath(this.route);

    this.loader.showSpinner();
    this.route.params.subscribe(
      (param) => {
        if (param['id']) {
          this.id = param['id'];
          forkJoin(
            this.eportalSvc.getTargets(param['id'])
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

  public expand(idx: number): void {
    this.id = this.id === idx ? -1 : idx;
  }

  public isSel(idx: number): boolean {
    return this.id === idx;
  }

  public goToLastPath():void {
    this.eportalSvc.goToLastPath(this.router);
  }

}
