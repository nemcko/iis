import { Component, ComponentFactoryResolver, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { forkJoin } from 'rxjs';
import { filter } from 'rxjs/operators';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { UserContextService } from 'src/app/eportal/services/user-context.service';
import { WorkflowPanelDirective } from 'src/app/shared';
import { WorkflowPanel } from 'src/app/shared';
import { EpInterviewTargetsComponent } from 'src/app/eportal/components/interview/ep-interview-targets.component';
import { EpInterviewEvaluateComponent } from 'src/app/eportal/components/interview/ep-interview-evaluate.component';
import { AlertModalComponent } from 'src/app/shared/components/modals/alert-modal/alert-modal.component';
import { DialogConstants } from 'src/app/shared/components/modals/constants';

/**
 * Component: Ročný rozhovor - workflow
 */
@Component({
  template: '<ng-template wfpanel></ng-template>',
  styleUrls: ['../eportal.css']
})
export class EpInterviewComponent implements OnInit {
  public idl: string = '0';
  public id: string;
  public persdata: any = {};
  public data: any = {};
  public type: string;

  @ViewChild(WorkflowPanelDirective) public wfPanel: WorkflowPanelDirective;
  // private panelRef: ComponentRef<WorkflowPanel> = null;
  private panelRef: WorkflowPanel = null;

  public constructor(
    public usrCtx: UserContextService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private eportalSvc: EpService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cd: ChangeDetectorRef,
  ) {
    this.cd.detach();
  }

  public ngOnInit(): void {
    this.eportalSvc.storePath(this.route);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.changeUrl();
    });
  }

  public ngAfterViewInit(): void {
    this.changeUrl();
  }

  public ngOnDestroy(): void {
    this.cd.detach();
    // if (this.panelRef) {
    //   this.panelRef.changeDetectorRef.detach();
    // }
  }

  public changeUrl(): void {
    const type = this.route.snapshot.url[this.route.snapshot.url.length - 1].path;
    let idl = '';
    let id = '';

    if (this.route.snapshot.url.length === 4) {
      idl = this.route.snapshot.url[0].path;
      id = this.route.snapshot.url[2].path;
    }
    else {
      idl = '0';
      id = '0';
    }

    if (this.type !== type) {
      this.type = type;
      this.setPanel();
    }

    if (this.idl !== idl || this.id !== id) {
      this.idl = idl;
      this.id = id;
      if (this.panelRef) {
        this.panelRef.idl = this.idl;
        this.panelRef.id = this.id;
      }
      this.loadData();
    }
  }


  /**
   * Loads data: Načítanie údajov podľa používateľa TL/member a stavu spracovania ROR, navigácia na príslušnú stránku
   * Kroky workflow: nastavenie cieľov (targets), 
   *                 hodnotenie TL(evaluator)/member(evaluated), 
   *                 spoločné zhodnotenie (jointevaluation)
   */
  public loadData(): void {
    this.loader.showSpinner();
    forkJoin(
      this.eportalSvc.getPersData(this.idl),
      this.eportalSvc.getInterview(this.id),
    ).subscribe(
      data => {
        this.cd.reattach();
        this.persdata = data[0];
        this.data = data[1];
        if (this.panelRef) {
          this.panelRef.parent = this;
          this.panelRef.data = this.data;
          this.panelRef.idl = this.idl;
          this.panelRef.id = this.id;
        }
        // this.cd.detach(); 
        this.loader.showSpinner(false);

        if (this.usrCtx.isTL(this.data)) {
          if (this.type !== 'targets' && !this.data['targDate']) {
            this.eportalSvc.revertLastPath();
            this.router.navigate(['portal', this.idl, 'interviews', this.id, 'targets']);
            return;
          }
          if (this.type !== 'targets' && this.type !== 'evaluator' && !this.data['evalDate']) {
            this.eportalSvc.revertLastPath();
            this.router.navigate(['portal', this.idl, 'interviews', this.id, 'evaluator']);
            return;
          }
          if (this.type !== 'targets' && this.type !== 'jointevaluation' && this.data['evalDate'] && !this.data['joinDate']) {
            this.eportalSvc.revertLastPath();
            this.router.navigate(['portal', this.idl, 'interviews', this.id, 'jointevaluation']);
            return;
          }
          if (this.type !== 'targets' && this.type !== 'jointevaluation' && this.data['joinDate']) {
            this.eportalSvc.revertLastPath();
            this.router.navigate(['portal', this.idl, 'interviews', this.id, 'jointevaluation']);
            return;
          }
        }
        else {
          if (this.type === 'targets') {
            if (this.data['targDate']) {
              this.eportalSvc.revertLastPath();
              this.router.navigate(['portal', this.idl, 'interviews', this.id, 'evaluated']);
            }
            else {
              this.eportalSvc.revertLastPath();
              this.router.navigate(['portal', this.idl, 'detail'], { queryParams: { tab: 'ror' } });
            }
            return;
          }

          if (this.type === 'evaluated') {
            if (this.data['ratedDate']) {
              this.eportalSvc.revertLastPath();
              this.router.navigate(['portal', this.idl, 'interviews', this.id, 'jointevaluation']);
            }
            return;
          }

          if (this.type === 'evaluator' && this.data['evalDate']) {
            this.eportalSvc.revertLastPath();
            this.router.navigate(['portal', this.idl, 'interviews', this.id, 'jointevaluation']);
          }
          else
            if (this.type !== 'jointevaluation' && this.data['joinDate']) {
              this.eportalSvc.revertLastPath();
              this.router.navigate(['portal', this.idl, 'interviews', this.id, 'jointevaluation']);
            }
            else {
              if (!this.data['joinDate']) {
                this.eportalSvc.revertLastPath();
                this.router.navigate(['portal', this.idl, 'detail'], { queryParams: { tab: 'ror' } });
                return;
              }
            }
        }
      },
      err => {
        console.error(err);
        this.loader.showSpinner(false);
      }
    );
  }

  /**
   * Saves data: Uloženie príslušného stavu workflov, navigácia na stránku pre ďalší krok
   * @param data : údaje ROR
   */
  public saveData(data: any): void {
    this.loader.showSpinner();
    const savedata = { ...this.data, ...data };
    if (this.type === 'targets') {
      savedata['targDate'] = new Date();
    }
    if (this.type === 'evaluated') {
      savedata['ratedDate'] = new Date();
    }
    if (this.type === 'evaluator') {
      savedata['evalDate'] = new Date();
    }
    if (this.type === 'jointevaluation') {
      savedata['joinDate'] = new Date();
    }
    this.eportalSvc.setInterview(savedata).subscribe(
      () => {
        this.loader.showSpinner(false);

        const message = ['Údaje boli uložené'];
        const modalInstance = this.modalService.open(AlertModalComponent, { size: 'sm', centered: true });
        modalInstance.componentInstance.dialogData = {
          message: message,
          ok: DialogConstants.DIALOG_DEFAULT_OK
        };
        if (this.usrCtx.isTL(this.data)) {
          this.loadData();
        }
        else {
          this.eportalSvc.revertLastPath();
          this.router.navigate(['portal', this.idl, 'detail'], { queryParams: { tab: 'ror' } });
        }
      },
      err => {
        console.error(err);
        this.loader.showSpinner(false);
      }
    );
  }


  /**
   * Sets panel: Načítanie šablóny príslušného kroku workflow 
   */
  public setPanel(): void {
    let ctrl = null;
    switch (this.type) {
      case 'targets':
        ctrl = new WorkflowPanel(EpInterviewTargetsComponent);
        break;
      case 'evaluated':
      case 'evaluator':
      case 'jointevaluation':
        ctrl = new WorkflowPanel(EpInterviewEvaluateComponent);
        break;

      default:
        // ctrl = new WorkflowPanel(CpEmpty);
        break;
    }

    if (ctrl) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ctrl.component);
      this.ngOnDestroy();
      const viewContainerRef = this.wfPanel.viewContainerRef; viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent(componentFactory);
      this.panelRef = <WorkflowPanel>componentRef.instance;
      this.panelRef.parent = this;
      this.panelRef.data = {};
      this.panelRef.idl = '';
      this.panelRef.id = '';
      // this.cd.reattach();
    }
    else {
      this.panelRef = null;
    }
  }

  public get hasThemes(): boolean {
    return this.data && this.data.items && this.data.items.length;
  }

  public goToCard(): void {
    this.eportalSvc.goToLastPath(this.router, `/portal/${this.idl}/detail`);
    // this.router.navigate(['portal', this.idl, 'detail'], { queryParams: { tab: 'ror' } });
  }

  public maySaveData(): boolean {
    return this.type === 'targets' && this.usrCtx.isTL(this.data) ||
      this.type === 'evaluated' && !this.data['ratedDate'] ||
      this.type === 'evaluator' && !this.data['evalDate'] ||
      this.type === 'jointevaluation' && !this.data['joinDate'] && this.usrCtx.isTL(this.data)
  }

  public canSetTargets(): boolean {
    // return this.type === 'jointevaluation' && this.usrCtx.isTL(this.data) && this.data['joinDate'];
    return this.usrCtx.isTL(this.data);
  }

  public goalSetting(): void {
    const payload = {
      period: (new Date().getFullYear() + 1).toString(),
      evaluator: this.usrCtx.userId,
      evaluated: this.idl
    }
    this.loader.showSpinner();
    this.eportalSvc.nextInterview(payload).subscribe(
      nid => {
        this.router.navigate(['portal', this.idl, 'interviews', nid, 'targets']);
        this.loader.showSpinner(false);
      }
      , () => {
        this.loader.showSpinner(false);
      }
    )

    // const nid=this.eportalSvc.nextInterview(payload);
    // this.router.navigate(['portal', this.idl, 'interviews', nid, 'targets']);
  }

}
