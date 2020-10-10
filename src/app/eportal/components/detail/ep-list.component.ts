import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { UserContextService } from 'src/app/eportal/services/user-context.service';
import { environment } from 'src/environments/environment';

/**
 * Component: Zoznam zamestnancov
 */
@Component({
  templateUrl: './ep-list.component.html',
  styleUrls: ['../eportal.css']
})
export class EpListComponent implements OnInit {
  public data: any;
  public searchText: string;
  public type: string;
  public listOptions = [];
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

  public ngOnInit(): void {
    this.eportalSvc.storePath(this.route);

    this.listOptions.push({ id: 'list', name: 'Všetci' })
    if (this.usrCtx.isTL(null)) {
      this.listOptions.push({ id: 'my', name: 'Moji zamestnanci' })
    }
    this.listOptions.push({ id: 'fav', name: 'Obľúbení' })

    $('.js-basic-select').select2();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.loadData(this.type);
    });

    this.loadData();
  }

  public loadData(type: string = 'list'): void {

    // if (this.route.snapshot.url.length === 2) {
    //   id = this.route.snapshot.url[0].path;
    //   // type = this.route.snapshot.url[1].path;
    // }
    // else {
    //   id = '0';
    //   // type = this.route.snapshot.url[0].path;
    // }

    if (this.type !== type) {
      this.type = type;
      this.data = [];

      this.loader.showSpinner();
      forkJoin(
        this.eportalSvc.getEmployees(this.type)
      ).subscribe(
        data => {
          data[0].forEach(item => {
            item.photoref = item.photoref.replace('http://http', environment.SERVER_URL);
            if (type === 'list' || type === 'my' || type === 'fav' && item.fav) {
              this.data.push(item);
            }
          })
          this.loader.showSpinner(false);
        },
        err => {
          console.error(err);
          this.loader.showSpinner(false);
        }
      );
    }
  }

  public changeFav($e, item): void {
    this.eportalSvc.changeFav(!item.fav, this.usrCtx.userId, item.personID).subscribe(
      result => {
        if (result && result.status && result.status === 'ok') {
          item.fav = !item.fav;
        }
      }
    );
  }
}
