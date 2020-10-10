import { Component, OnInit, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng2-select2';
import { Editor } from 'primeng/editor';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EpService, IUserAccess } from 'src/app/eportal/services/eportal.service';
import { UserContextService } from 'src/app/eportal/services/user-context.service';
import { COLORPALETTE, IMarkedTabs } from 'src/app/shared/components/frmflds';
import { DlgMsgInstructionComponent } from 'src/app/eportal/components/dialogs/dlgmsginstruction.component';
import { AlertModalComponent } from 'src/app/shared/components/modals/alert-modal/alert-modal.component';
import { DialogConstants } from 'src/app/shared/components/modals/constants';
import { Variable, COLORERR, MARKEDCOLOR } from './ep-proeval-quill.component';

declare const Quill: any;

export interface IBlotMarker { tabs: IMarkedTabs, color: string }
export interface IColorEntry { code: string, blotId: string }

Variable['blotName'] = 'userblock';
Variable['className'] = 'userblock';
Variable['tagName'] = 'span';

Quill.register('formats/userblock', Variable);

const Size = Quill.import('attributors/style/size');
Size.whitelist = ['14px', '16px', '18px'];
Quill.register(Size, true);


/**
 * Gets quill html: Zobrazenie html kódu editora
 * @param editor : inštancia quill editora
 * @returns : html 
 */
export function getQuillHtml(editor: any): string {
  const tempCont = document.createElement('div');
  const tempEditor = new Quill(tempCont);
  tempEditor.setContents(editor.getContents());
  return '' + tempEditor.root.innerHTML;
}

/**
 * Component: Hodnotenie projektu
 */
@Component({
  templateUrl: './ep-proeval.component.html',
  styleUrls: ['../eportal.css', './ep-proeval.component.css']
})
export class EpProevalComponent implements OnInit, AfterViewInit {
  public acc: IUserAccess;
  public idl: string = '';
  public idp: string = '';
  public id: string;
  public data: any = {};
  public prodata: any = {};
  public seltabcode: string = '';
  public tabdata: Array<Select2OptionData>;
  public colors: Array<IColorEntry>;

  public options: Select2Options = {
    minimumInputLength: 0,
    multiple: false,
    closeOnSelect: true,
    width: '100%'
  };

  public evaltypes: Array<Select2OptionData> = [
    { id: '', text: '' },
    { id: '1m', text: 'mesačné' },
    { id: '3m', text: 'kvartálne' },
    { id: '60', text: 'polročné' },
    { id: '12m', text: 'ročné' },
  ];


  public editorStyle = {
    height: '320px',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #a8a8a8'
  }

  public markedTabs: IMarkedTabs = {};
  public markedUser: string;

  public blots: { [blotId: string]: IBlotMarker } = {};


  @ViewChild(Editor) public editorComponent: Editor;


  public constructor(
    public usrCtx: UserContextService,
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
    private router: Router,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private eportalSvc: EpService,
    private cdr: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.eportalSvc.storePath(this.route);

    this.loader.showSpinner();
    this.route.params.subscribe(
      (param) => {
        if (param['idl']) {
          this.idl = param['idl'];
        }
        if (param['idp']) {
          this.idp = param['idp'];
        }
        if (param['id']) {
          this.id = param['id'];
          forkJoin(
            this.eportalSvc.loadProEval(this.usrCtx.userId, this.idp, this.id),
            // this.eportalSvc.getProEval(this.id),
            this.eportalSvc.getProject(this.idp),
          ).subscribe(
            data => {
              this.prodata = data[1];
              this.assignLoadedData(data[0]);
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
   * Assigns loaded data: Naplnenie údajov kontroléra z načítaných údajov
   */
  public assignLoadedData(data: any): void {
    const bLeader = this.usrCtx.isTL(this.prodata.leaders);
    this.clearBlotAndColors();
    this.data = data;

    if (bLeader) {
      this.markedUser = '';
      this.tabdata = data['members'].reduce((arr, mem) => (arr.push(
        {
          id: mem['personID'],
          text: mem['personFN'],
          disabled: true
        }
      ), arr), [{ id: '', text: 'Hodnotenie peojektu', disabled: true }]);
    }
    else {
      this.markedUser = this.eportalSvc.getData('uzivatel').userId;
      if (data['members'].some(tab => tab.personID === this.markedUser)) {
        this.tabdata = data['members'].filter(tab => tab.personID === this.markedUser).reduce((arr, mem) => (arr.push(
          {
            id: mem['personID'],
            text: mem['personFN'],
            disabled: true
          }
        ), arr), [{ id: '', text: 'Hodnotenie peojektu', disabled: true }]);
      }
      else {
        // this.tabdata = [{ id: '', text: 'Hodnotenie peojektu', disabled: true }];
        this.data = {};
        return;
      }
    }

    if (!this.data['evaluations']) {
      this.data['evaluations'] = {};
    }
    this.data['members'].forEach(mem => {
      if (!this.data.evaluations[mem.personID]) {
        this.data.evaluations[mem.personID] = {
          competences: {},
          verbeval: ''
        };
      }
    });
    this.data['verbeval'] = this.decodeblotText(this.data['verbeval']);
    this.checkSavedData();
  }

  public get quill(): any {
    if (this.editorComponent) {
      return this.editorComponent.getQuill();
    }
    else {
      return {};
    }
  }

  /**
   * Gets quill contents: Načítanie objektov quill editora
   * @returns quill contents 
   */
  public getQuillContents(): string {
    if (this.editorComponent) {
      return this.editorComponent.getQuill().getContents();
    }
    else {
      return '';
    }
  }

  /**
   * after view init: Sprístupnenie údajov hodnotenia prezerajúci je TL/member
   */
  public ngAfterViewInit(): void {

    // this.editorComponent.getQuill().keyboard.addBinding({
    //   key: 'Q',
    //   ctrlKey: true
    // }, function(range, context) {
    //   this.newEvaluation()
    // });


    // this.editorComponent.getQuill().root.addEventListener('keydown', evt => {
    //   if (evt.ctrlKey && evt.code === 'KeyQ') {
    //     this.newEvaluation()
    //     evt.preventDefault();
    //   }
    // });

    this.editorComponent.getQuill().root.addEventListener('keydown', evt => {
      if (!this.usrCtx.isTL(this.prodata.leaders)) {
        evt.preventDefault();
      }
    });
  }

  public get hasThemes(): boolean {
    return this.data && this.data.items && this.data.items.length;
  }

  public showInstructions(): void {
    const modalRef = this.modalService.open(DlgMsgInstructionComponent, { backdrop: 'static', windowClass: 'dlgopen', centered: true });
    modalRef.componentInstance.displayData(this);
  }

  // public saveData(): void {
  //   this.loader.showSpinner();
  //   const data = Object.assign({}, this.data);
  //   data.verbeval = this.encodeblotText(getQuillHtml(this.quill));
  //   this.eportalSvc.setProEval(data).subscribe(
  //     () => {
  //       this.loader.showSpinner(false);
  //       this.checkSavedData();
  //       const message = ['Údaje boli uložené'];
  //       const modalInstance = this.modalService.open(AlertModalComponent, { size: 'sm', centered: true });
  //       modalInstance.componentInstance.dialogData = {
  //         message: message,
  //         ok: DialogConstants.DIALOG_DEFAULT_OK
  //       };

  //     },
  //     err => {
  //       console.error(err);
  //       this.loader.showSpinner(false);
  //     }
  //   );
  // }

  /**
   * Saves evaluation: Uloženie hodnotenia podľa typu
   * @param personID : typ hodnotenia je člen tímu (personID)/ hodnotenie projektu
   * @param [publish] : rozpracované hodnotenie/ finálne hodnotenie pre publikovanie
   */
  public saveEvaluation(personID: string, publish = false): void {
    this.loader.showSpinner();
    // const data = {
    //   id: this.data.id,
    //   idp: this.data.idp,
    // };
    // if (!personID) {
    //   data['verbeval'] = this.encodeblotText(getQuillHtml(this.quill));
    //   data['name'] = this.data['name'];
    //   data['type'] = this.data['type'];
    //   data['procdate'] = this.data['procdate'];
    //   data['evaluator'] = this.data['evaluator'];
    //   data['locked'] = true;
    //   data['published'] = publish;
    // }
    // else {
    //   data['evaluations'] = {};
    //   data['evaluations'][personID] = {};
    //   if (!this.data['evaluations'][personID]) {
    //     data['evaluations'][personID] = {
    //       competences: {},
    //       verbal: ''
    //     };
    //   }
    //   else {
    //     data['evaluations'][personID] = Object.assign({}, this.data['evaluations'][personID]);
    //   }
    //   data['personID'] = personID
    //   data['evaluations'][personID]['locked'] = true;
    // }

    const data = Object.assign({}, this.data);

    if (!personID) {
      data['verbeval'] = this.encodeblotText(getQuillHtml(this.quill));
      data['name'] = this.data['name'];
      data['type'] = this.data['type'];
      data['procdate'] = this.data['procdate'];
      data['evaluator'] = this.data['evaluator'];
      data['locked'] = true;
      data['published'] = publish;
    }
    else {
      data['personID'] = personID
      data['evaluations'][personID]['locked'] = true;
    }

    this.eportalSvc.saveEvaluation(data).subscribe(
      () => {
        this.loader.showSpinner(false);
        if (!personID) {
          this.data['locked'] = true;
          this.data['published'] = publish;
        }
        else {
          this.data.evaluations[personID]['locked'] = true;
        }
        this.checkSavedData();
        const message = [publish ? 'Hodnotenie bolo publikované' : 'Hodnotenie bolo uložené'];
        const modalInstance = this.modalService.open(AlertModalComponent, { size: 'sm', centered: true });
        modalInstance.componentInstance.dialogData = {
          message: message,
          ok: DialogConstants.DIALOG_DEFAULT_OK
        };

      },
      err => {
        console.error(err);
        this.loader.showSpinner(false);
      }
    );
  }

  public markUsers(ev: any, personID: string): void {
    if (ev.toElement.checked) {
      this.markedTabs[personID] = this.tabdata.find(tab => tab.id === personID).text;
    }
    else {
      delete this.markedTabs[personID];
    }
  }
  // public markTabs(mtabs: IMarkedTabs) {
  //   this.markedTabs = mtabs;
  //   this.cdr.detectChanges();
  // }

  public get markedUsers(): string {
    // return Object.values(this.markedTabs).join(', '); pre ES2017>
    const objVals = (obj: any): Array<any> => Object.keys(obj).map(key => obj[key]);
    return objVals(this.markedTabs).join(', ');
  }

  public get markedUserIds(): string {
    return Object.keys(this.markedTabs).join('-');
  }


  /**
   * Gets marked user color: Farebné označenie skupín členov tímu
   */
  public get markedUserColor(): string {
    if (this.markedTabs && Object.keys(this.markedTabs).length > 0) {
      const color = this.colors.find(color => color.blotId === this.markedUserIds);
      if (color) {
        return color.code;
      }
      else {
        return 'inherit';
      }
    }
    return '';
  }

  /**
   * Encodeblots text: Serializácia html textu podľa hodnotených skupín členov tímu
   */
  public encodeblotText(txt: string): string {
    let ntxt = txt;
    (txt.match(new RegExp(/(data-id.*?background-color: rgb((.*?))\))/gi)) || []).forEach(itm => {
      const ids = /data-id="([^"]+)"/.exec(itm);
      const code = /background-color: #(.*?)"/.exec(itm);
      const nitm = itm.replace(`#${code[1]}`, `COLOR${ids[1]}`)
      ntxt = ntxt.replace(itm, nitm);
    })
    return ntxt;
  }

  /**
   * Decodeblots text: Deserializácia html textu editora, farebné priradenia podľa skupín členov tímu pre hodnotenie projektu 
   */
  public decodeblotText(txt: string): string {
    let ntxt: string = txt || '';
    if (this.markedUser) {
      (ntxt.match(new RegExp(/(data-id.*?background-color:.*?>)/gi)) || []).forEach(itm => {
        const ids = /data-id="([^"]+)"/.exec(itm);
        const color = /background-color: (.*?)"/.exec(itm);
        let nitm;
        if (color) {
          if (ids[1].match(new RegExp(`(?:^|-)${this.markedUser}(?:-|$)`))) {
            nitm = itm.replace(`${color[1]}`, MARKEDCOLOR);
          }
          else {
            nitm = itm.replace(`${color[1]}`, '\'inherit\'');
          }
          ntxt = ntxt.replace(itm, nitm);
        }
      });
    }
    else {
      this.getBlotIdsFromText(txt).forEach(ids => {
        ntxt = ntxt.replace(new RegExp(`COLOR${ids}`, 'g'), this.assignBlot(ids).color);
      });

      (ntxt.match(new RegExp(/(data-id.*?background-color:.*?>)/gi)) || []).forEach(itm => {
        const ids = /data-id="([^"]+)"/.exec(itm);
        const color = /background-color: (.*?)"/.exec(itm);
        if (color) {
          const nitm = itm.replace('inherit', this.getBlot(ids[1]).color);
          ntxt = ntxt.replace(itm, nitm);
        }
      });

      (ntxt.match(new RegExp(/(data-id.*?background-color: rgb((.*?))\))/gi)) || []).forEach(itm => {
        const ids = /data-id="([^"]+)"/.exec(itm);
        const code = /background-color: #(.*?)"/.exec(itm);
        if (code) {
          const nitm = itm.replace(`#${code[1]}`, this.getBlot(ids[1]).color);
          ntxt = ntxt.replace(itm, nitm);
        }
      });

      (ntxt.match(new RegExp(/(data-id.*?background-color: #(.*?)")/gi)) || []).forEach(itm => {
        const ids = /data-id="([^"]+)"/.exec(itm);
        const code = /background-color: #(.*?)"/.exec(itm);
        if (code) {
          const nitm = itm.replace(`#${code[1]}`, this.getBlot(ids[1]).color);
          if (itm !== nitm) {
            ntxt = ntxt.replace(itm, nitm);
          }
        }
      })
    }

    return ntxt;
  }

  /**
   * Gets blot: Blok textu priradeného skupe členov tímu v hodnotení projektu
   * @param [blotId] : identifikátor skupiny
   */
  public getBlot(blotId: string = ''): IBlotMarker {
    let curr = blotId;
    if (!blotId) {
      curr = Object.keys(this.markedTabs).join('-');
    }

    if (curr) {
      if (this.blots[curr]) {
        return this.blots[curr];
      }
      else {
        this.blots[curr] = Object.assign({}, { tabs: this.markedTabs, color: this.assignColor(curr) }); //!!!
        return this.blots[curr];
      }
    }
    else {
      return null;
    }
  }

  /**
   * News evaluation: Vytvorenie nového bloku textu pre hodnotenie vybratých členov tímu
   */
  public newEvaluation(): void {
    const range = this.quill.getSelection(true);
    let idx = 0;
    if (typeof range === 'object') {
      idx = range.index;
    }
    const blot = this.getBlot();
    if (blot) {
      const txt: string = ' ';
      this.quill.insertEmbed(idx, 'userblock', {
        text: txt,
        id: Object.keys(blot.tabs).join('-'),
        color: blot.color
      }, Quill.sources.USER);
      this.quill.setSelection(idx + txt.length, Quill.sources.SILENT);
    }
  }

  public canPublish(tabcode: string): boolean {
    if (!this.data['published']) {
      if (!tabcode) {
        return !this.data['published'] || false;
      }
      else {
        if (this.data['evaluations'][tabcode]) {
          return !this.data['evaluations'][tabcode]['locked'] || false;
        }
        return true;
      }
    }
    else {
      return false;
    }
  }

  public showMemberOnly(id: string): void {
    if (id === this.markedUser) {
      this.markedUser = '';
    }
    else {
      this.markedUser = id;
    }
    this.data['verbeval'] = this.decodeblotText(this.data['verbeval']);
  }

  public goToLastPath(): void {
    this.eportalSvc.goToLastPath(this.router, `/portal/${this.idl}/projects/${this.idp}`);
  }

  /**
   * Gets blot ids from text: Vyhľadanie id blokov textu z textu editora
   * @param : html text
   * @returns : pole nájdených id
   */
  protected getBlotIdsFromText(txt: string): Array<any> {
    const ids = (txt || '').match(new RegExp(/(data-id="((.*?))")/gi))
    if (ids) {
      return ids.map(itm => /data-id="([^"]+)"/.exec(itm)[1])
    }
    else {
      return [];
    }
  }

  protected clearBlotAndColors(): void {
    this.blots = {};
    this.colors = COLORPALETTE.map((color) => ({ code: color, blotId: '' }));
  }

  /**
   * Assigns color: Priradenie farby pre identifikátor bloku textu (skupina členov tímu v hodnotení)
   * @param blotId : Identifikátor bloku textu
   * @returns color : farba
   */
  protected assignColor(blotId: string): string {
    let code: string = COLORERR;
    const find = this.colors.find(color => color.blotId === '');
    if (find) {
      find.blotId = blotId;
      code = find.code;
    }
    return code;
  }

  /**
   * Assigns blot: Priradenie bloku texu označeným členom tímu
   * @param blotId :Identifikátor bloku textu
   * @returns blot : Blok textu
   */
  protected assignBlot(blotId: string): IBlotMarker {
    const findMember = (id): string => {
      const name = this.data['members'].find(mem => mem.personID === id);
      return name ? name.personFN : '(' + id + ')?';
    };
    if (this.blots[blotId]) {
      return this.blots[blotId];
    }
    else {
      const idTabs = blotId.split('-').reduce(
        (members, personID) => {
          members[personID] = findMember(personID);
          return members;
        }, {});
      this.blots[blotId] = Object.assign({}, { tabs: idTabs, color: this.assignColor(blotId) }); //!!!
      return this.blots[blotId];
    }
  }


  /**
   * Checks saved data: Test uloženia údajov v tab-och Hodnotenia projektu
   */
  protected checkSavedData(): void {
    if (this.usrCtx.isTL(this.prodata.leaders)) {
      this.data['members'].forEach(mem => {
        this.tabdata.find(tab => tab.id === mem.personID).disabled = true;
        // if (this.data.evaluations[mem.personID].verbal && Object.values(this.data.evaluations[mem.personID].competences).every((evaluated) => evaluated > 0)) {
        if (this.data.evaluations[mem.personID].locked) {
          this.tabdata.find(tab => tab.id === mem.personID).disabled = false
        }
      });
      this.tabdata.find(tab => tab.id === '').disabled = true;
      // if (this.data.verbeval && this.data.verbeval.length && this.data.verbeval !== '<p><br></p>') {
      if (this.data.locked) {
        this.tabdata.find(tab => tab.id === '').disabled = false
      }
    }
  }


}

