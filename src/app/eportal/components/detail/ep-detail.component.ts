import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SafeHtml } from '@angular/platform-browser';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { UserContextService } from 'src/app/eportal/services/user-context.service';
import { TabsComponent } from 'src/app/shared/components/tabs/tabs.component';
import { DlgCourseComponent } from '../courses/dlgcourse.component';
import { DlgCertComponent } from '../certificates/dlgcert.component';
import { DlgPinfoComponent } from '../dialogs/dlgpinfo.component';
import { DlgMsgCertComponent } from '../certificates/dlgmsgcert.component';
import { DlgMsgCoursComponent } from '../courses/dlgmsgcourses.component';

/**
 * Component: Detail záznamu karty zamestnanca
 */
@Component({
  templateUrl: './ep-detail.component.html',
  styleUrls: ['../eportal.css']
})
export class EpDetailComponent implements OnInit, AfterViewInit {
  public isEditing: boolean = false;
  public id: string;
  public data: any;
  @ViewChild(TabsComponent) public tabs: TabsComponent;

  public curryear: string = '2020';

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

  /**
   * on init: Inicializácia zoznamov a personálnych údajov
   */
  public ngOnInit(): void {
    this.eportalSvc.storePath(this.route);
    this.loader.showSpinner();
    this.route.params.subscribe(
      (param) => {
        if (param['id']) {
          this.id = param['id'];
          forkJoin(
            this.eportalSvc.getPersData(this.id),
            this.eportalSvc.getShortList(this.id, 'profcomps'),
            this.eportalSvc.getShortList(this.id, 'perscomps'),
            this.eportalSvc.getShortList(this.id, 'courses'),
            this.eportalSvc.getShortList(this.id, 'certificates'),
            this.eportalSvc.getShortList(this.id, 'projects'),
            this.eportalSvc.getShortList(this.id, 'meetings'),
            this.eportalSvc.getShortList(this.id, 'closeouts'),
            this.eportalSvc.getShortList(this.id, 'reviews'),
            // this.eportalSvc.getShortList(this.id, 'interviews'),
            this.eportalSvc.getInterviews(this.id),
            this.eportalSvc.getTargets(this.id)
          ).subscribe(
            data => {
              this.data = {};
              this.data.persdata = data[0];
              this.data.profcomps = data[1];
              this.data.perscomps = data[2];
              this.data.courses = data[3];
              this.data.certificates = data[4];
              this.data.projects = data[5];
              this.data.meetings = data[6];
              this.data.closeouts = data[7];
              this.data.reviews = data[8];
              this.data.interviews = data[9];
              this.data.targets = data[10];
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
   * after view init: Prepnutie do tabu podľa query parametra url
   */
  public ngAfterViewInit(): void {
    const numsec = 1000;
    this.route.queryParams.subscribe(params => {
      if (params['tab'] && params['tab'] === 'goals') {
        setTimeout(() => {
          this.tabs.selectTab('Ciele');
        }, numsec);
      }
      else if (params['tab'] && params['tab'] === 'ror') {
        setTimeout(() => {
          this.tabs.selectTab('Ročný rozhovor');
        }, numsec);
      }
      else if (params['tab'] && params['tab'] === 'eval') {
        setTimeout(() => {
          this.tabs.selectTab('Hodnotenie');
        }, numsec);
      }
    });
  }

  public back(): void {
    if (this.isEditing) {
      this.isEditing = false;
      return;
    }
  }

  /**
   * Infos add cert: Dialógové okno nápovedy
   */
  public infoAddCert(): void {
    const modalRef = this.modalService.open(DlgMsgCertComponent, { backdrop: 'static', windowClass: 'dlgopen', centered: true, size: 'lg' });
    modalRef.componentInstance.displayData(this);
  }

  /**
   * Adds cert: Nový certifikát
   */
  public addCert(): void {
    const modalRef = this.modalService.open(DlgCertComponent, { backdrop: 'static', windowClass: 'dlgopen', centered: true, size: 'lg' });
    modalRef.componentInstance.displayData(this);
  }

  /**
   * Upds pinfo: Dialóg pre zmenu personálnych údajov zamestnanca
   */
  public updPinfo(): void {
    const modalRef = this.modalService.open(DlgPinfoComponent, { backdrop: 'static', windowClass: 'dlgopen', centered: true, size: 'lg' });
    modalRef.componentInstance.displayData(this, this.id);
  }

  /**
   * Zobrazenie po zmene personálnych údajov zamestnanca
   */
  public refreshPersinfo(): void {
    this.eportalSvc.getPersData(this.id).subscribe(data => {
      this.data.persdata = data
    })
  }

  /**
   * Infos add course: Nový záznam o absolvovanom školení
   */
  public infoAddCourse(): void {
    const modalRef = this.modalService.open(DlgMsgCoursComponent, { backdrop: 'static', windowClass: 'dlgopen', centered: true, size: 'lg' });
    modalRef.componentInstance.displayData(this);
  }

  /**
   * Upds course: Zmena záznamu absolvovaného školenia
   * @param id : identifikátor záznamu
   */
  public updCourse(id: string = null): void {
    const modalRef = this.modalService.open(DlgCourseComponent, { backdrop: 'static', windowClass: 'dlgopen', centered: true, size: 'lg' });
    modalRef.componentInstance.displayData(this, id);
  }

  /**
   * Upds cert: Dialógové okno pre zmenu záznamu certifikátu
   * @param id :identifikátor záznamu
   */
  public updCert(id: string = null): void {
    const modalRef = this.modalService.open(DlgCertComponent, { backdrop: 'static', windowClass: 'dlgopen', centered: true, size: 'lg' });
    modalRef.componentInstance.displayData(this, id);
  }

  /**
   * Lasts evaluation: Poslendé hodnotenie
   * @returns identifikátor záznamu posledného ROR 
   */
  public lastEvaluation(): string {
    try {
      if (this.data && this.data.targets) {
        return this.data.targets[Object.keys(this.data.targets).pop()].id;
      }
    }
    catch (e) {
      const payload = {
        period: new Date().getFullYear().toString(),
        evaluator: this.usrCtx.userId,
        evaluated: this.id
      }
      this.eportalSvc.nextInterview(payload).subscribe(
        nid => nid
        , () => {
          return '';
        }
      )
    }
    return '';
  }

  /**
   * Interviews ep detail component: Navigácia na posledný ROR
   */
  public interview(): void {
    const lid = this.lastEvaluation();
    if (this.usrCtx.isTL(null)) {
      this.router.navigate(['portal', this.id, 'interviews', lid, 'evaluator']);
    }
    else {
      this.router.navigate(['portal', this.id, 'interviews', lid, 'evaluated']);
    }
  }

  /**
   * Gets rortileleft: Zobrazenie textu pre počet dní do ROR
   */
  public get rortileleft(): SafeHtml {
    if (this.data && this.data.targets) {
      let sta = new Date().getTime();
      const one = 24 * 60 * 60 * 1000;
      try {
        sta = new Date(this.data.targets[Object.keys(this.data.targets).pop()].dateto).getTime();
      }
      catch (e) {
        //
      }
      const end = new Date().getTime();
      const days = String(Math.round((sta - end) / one));
      const txt = String(Math.round(Math.abs((sta - end) / one))).split('').reduce((txt, val) => txt + `<span class="e-wrapped-text">${val}</span>`, 'o ');
      return txt + ' dní' + (days[0] === '-' ? ' <span class="text-danger">po termíne</span>' : '');
    }
    return '';
  }

  /**
   * Determines whether finished is : Test ukončenia Ročného rozhovoru
   */
  public isFinished(): boolean {
    if (this.data && this.data.targets) {
      const item = Object.keys(this.data.targets).pop();
      if (this.data.targets[item]) {
        return this.data.targets[item].joinDate;
      }
    }
    return false;
  }
}
