import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { SearchListFunction } from 'src/app/shared';

/**
 * Component: Zoznam projektov
 */
@Component({
  templateUrl: './ep-projects.component.html',
  styleUrls: ['../eportal.css']
})
export class EpProjectsComponent implements OnInit, AfterViewInit {
  public data: any;
  public searchText: string;
  public page: number = 1;
  public numItems: number = 10;
  public type: string;
  public id: string;

  public datafn: SearchListFunction;
  @ViewChild('searchlist') public searchlist;

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

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.changeUrl(this.type);
    });
  }

  public ngAfterViewInit(): void {
    if (this.route.snapshot.url.length >= 2) {
      this.id = this.route.snapshot.url[0].path;
    }
    this.searchlist.open(this.eportalSvc.listProjects, this.id);
  }

  public changeUrl(type: string = 'projects'): void {
    let id = '';

    if (this.route.snapshot.url.length === 2) {
      id = this.route.snapshot.url[0].path;
    }
    else {
      id = '0';
    }

    if (this.type !== type || this.id !== id) {
      this.type = type;
      this.id = id;
      this.searchlist.changeId(this.id);
    }
  }

  public goToLastPath(): void {
    // this.eportalSvc.goToLastPath(this.router);
    this.router.navigate(['portal', this.id, 'detail']);
  }

}
