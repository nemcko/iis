import { Component, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { LoaderService } from '../../../shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';

/**
 * Component: Dialóg pre spravovanie projektového tímu 
 */
@Component({
  templateUrl: './dlgselusers.component.html',
  styleUrls: ['../eportal.css']
})
export class DlgSelectUsers {
  public parent: any;
  public id: any;
  public data: any = {};
  public options: any = [];
  public usrgrps: any = [];
  public users: any = [];

  @ViewChild('dlg') public dlg;

  public constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private loader: LoaderService,
    private eportalSvc: EpService,
  ) {
  }

  /**
   * Displays data: Zobrazenie údajov pre výber tímu
   * @param parent : rodičovský objekt
   * @param id : identifikátor záznamu projektu
   */
  public displayData(parent: any, id: string): void {
    this.parent = parent;
    this.users = parent.users;
    this.id = id;
    this.loadData();
  }

  /**
   * Loads data: Načítanie používateľov a členov projektového tímu
   */
  public loadData(): void {
    const objVals = (obj: any): Array<any> => Object.keys(obj).map(key => obj[key]);
    this.loader.showSpinner();
    forkJoin(
      this.eportalSvc.getUsrGrps(this.id),
      this.eportalSvc.getProMembers(this.id),
    ).subscribe(
      data => {
        this.fillData(data[0]);
        // this.data.team = data[1].reduce((lst, usr) => (lst.push(usr['personID']), lst), []);
        // this.data.team = Object.values(data[1]).map(usr => usr['personID']);
        this.data.team = objVals(data[1]).map(usr => usr['personID']);
        this.loader.showSpinner(false);
      },
      err => {
        console.error(err);
        this.loader.showSpinner(false);
      }
    );
  }


  /**
   * Saves dlg select users: Uloženie vybratých členov tímu
   */
  public save(): void {
    const usrobj = this.userArrToObject(this.users);
    const data = {
      id: this.id,
      users: this.data.team.reduce((lst, id) => (lst.push(usrobj[id]), lst), [])
    }

    this.loader.showSpinner();
    this.eportalSvc.setProMembers(data).subscribe(
      () => {
        this.loader.showSpinner(false);
        this.parent.data['members'] = data.users;
        this.dlg.close();
      },
      err => {
        console.error(err);
        this.loader.showSpinner(false);
      }
    );
  }

  /**
   * Fills data: Naplnenie údajov listingu pre výber zamestnancov
   * @param data : údaje z načítania (Používatelia a skupiny)
   */
  protected fillData(data: any): void {
    const usrobj = this.userArrToObject(this.users);
    this.usrgrps = data;
    this.options = [];
    this.usrgrps.forEach((grp, idx) => {
      const parentid = '#' + idx;
      this.options.push({ label: grp['name'], value: parentid, parent: parentid });
      grp.members.forEach((mem) => {
        this.options.push({ label: usrobj[mem].personFN, value: mem, parent: parentid });
      })
    })
  }

  protected userArrToObject(arr: [any], prop: string = 'personID'): any {
    return arr.reduce((obj, usr) => {
      obj[usr[prop]] = usr;
      return obj
    }, {});
  }
}
