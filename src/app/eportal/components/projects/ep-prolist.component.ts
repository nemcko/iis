import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { UserContextService } from 'src/app/eportal/services/user-context.service';

/**
 * Component: Zoznam hodnotení projektu
 */
@Component({
  selector: 'prolist',
  templateUrl: './ep-prolist.component.html',
  styleUrls: ['../eportal.css']
})
export class EpProlistComponent implements OnInit {
  @Input() public datatype: string = 'card';
  @Input('projectid') public idp: string = '';
  @Input('portalid') public id: string = '';
  @Input('projects') public projects: Array<any> = null;
  @Input() public accdata: any;

  public data: any = {};

  public loading$: Observable<any>;

  public constructor(
    public usrCtx: UserContextService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private eportalSvc: EpService,
  ) {
  }

  /**
   * on init: Inicializácia zoznamu Rodný list projektu/Karta zamestnanca
   */
  public ngOnInit(): void {
    this.eportalSvc.storePath(this.route);
    this.loading$ = new Observable(observer => {
      if (this.datatype === 'project') {
        this.loadProevals(observer, this.id, this.idp);
      }
      else {
        this.loadProevals(observer, this.id);
      }
    });
  }

  public loadProevals(observer: any, id: string, idp: string = ''): void {
    const objVals = (obj: any): Array<any> => Object.keys(obj).map(key => obj[key]);
    this.loader.showSpinner();
    forkJoin(
      this.eportalSvc.getProevals(id, idp),
    ).subscribe(
      data => {
        // this.data = Object.values(data[0]);
        // this.data = Object.values(data[0]);
        this.data = objVals(data[0]);
        this.loader.showSpinner(false);
        if (observer) {
          observer.next(this.data);
          observer.complete();
        }
      },
      err => {
        console.error(err);
        this.loader.showSpinner(false);
        if (observer) {
          observer.complete();
        }
      }
    );
  }

  public isMemberLocked(item: any, mem: any): boolean {
    if (item.evaluations && item.evaluations[mem.personID]) {
      return item.evaluations[mem.personID].locked || false;
    }
    else {
      return item.locked || false;
    }
  }

  public getProgressPerc(item: any): string {
    return this.getProgress(item) + '%';
  }

  public getProgress(item: any): Number {
    const objVals = (obj: any): Array<any> => Object.keys(obj).map(key => obj[key]);
    const cnt = objVals(item.evaluations || {}).length + 1;
    let lck = 0;
    if (item.locked) {
      lck += 1;
    }
    objVals(item.evaluations || {}).reduce((lck, item) => item && item['locked'] ? 1 : 0, lck);
    return Math.round(lck / cnt * 100);
  }

  /**
 * Adds pro eval: Nové hodnotenie projektu
 */
  public addProEval($event): void {
    this.loader.showSpinner();
    this.eportalSvc.addProEval(this.usrCtx.userId, this.idp).subscribe(
      data => {
        this.router.navigate(['/portal', this.usrCtx.userId, 'project', this.idp, 'evaluations', data.docId]);
        this.loader.showSpinner(false);
        this.activeModal.close();
      },
      err => {
        console.error(err);
        this.loader.showSpinner(false);
      }
    );

    $event.stopPropagation();
  }

}

