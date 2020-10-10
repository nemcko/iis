import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { LoaderService } from '../../../shared/services/loader.service';
import { Select2OptionData } from 'ng2-select2';
import { EpService } from 'src/app/eportal/services/eportal.service';

/**
 * Component: Dialóg pre pridanie novej témy stretnutia 1:1
 */
@Component({
  templateUrl: './dlgtheme.component.html',
  styleUrls: ['../eportal.css'],
})
export class DlgAddThemeComponent implements OnInit {
  public parent: any;
  public data: any;
  public type = 'meetings';


  public newTheme: boolean = false;
  public theme: any;
  public ntheme: any;

  public exampleData: Array<Select2OptionData>;
  public defsel: Select2OptionData = null;

  @ViewChild('dlg') public dlg;

  public options: Select2Options = {
    minimumInputLength: 0,
    multiple: false,
    closeOnSelect: true,
    width: '100%'
  };


  public constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private loader: LoaderService,
    private eportalSvc: EpService,
  ) {
  }

  public ngOnInit(): void {
  }

  public displayData(parent: any): void {
    this.parent = parent;
    this.loadData();
  }

  public loadData(): void {
    this.loader.showSpinner();
    forkJoin(
      this.eportalSvc.getThemes(this.parent.usrCtx.userId, this.type),
    ).subscribe(
      data => {
        this.compareData(this, data[0]);
        this.loader.showSpinner(false);
      },
      err => {
        console.error(err);
        this.loader.showSpinner(false);
      }
    );
  }

  public save(): void {
    const item = this.data.find(itm => itm.id === this.theme);
    if (item) {
      if (!this.parent.data.themes) {
        this.parent.data.themes = [];
      }
      this.parent.data.themes.push({ 'code': item.id, 'name': item.text });
      this.dlg.close();
    }
  }

  public addTheme($event): void {
    this.loader.showSpinner();
    this.eportalSvc.addTheme(this.parent.usrCtx.userId, this.type, this.ntheme).subscribe(
      data => {
        if (!this.parent.data.themes) {
          this.parent.data.themes = [];
        }
        this.parent.data.themes.push(data);
        this.loadData();
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


  /**
   * Compares data: Porovnanie a načítanie len tých tém, ktoré ešte neboli použité pre pripravované stretnutie
   */
  protected compareData(self: any, data: any): void {
    // this.data = new Set([...data].filter((x) => !this.parent.data.items.has(x)));
    const props = ['code', 'name'];
    self.data = [];
    data.items.filter(function (o1) {
      return !(self.parent.data.themes || []).some(function (o2) {
        return o1.code === o2.code;
      });
    }).map(function (o) {
      return props.reduce(function (newo, name) {
        newo[name] = o[name];
        return newo;
      }, {});
    }).forEach(itm => {
      self.data.push({ 'id': itm.code, 'text': itm.name });
    });

  }
}
