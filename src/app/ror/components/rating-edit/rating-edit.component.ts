import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/shared/objects/dtos/user-dto';
import { DataService } from 'src/app/shared/services/data-server.service';
import { RatingModel } from 'src/app/ror/objects/models/rating-model';
import { Select2OptionData } from 'ng2-select2';
import { CompetenceTypeList, RatingWFActions, RatingFormSections, RatingStatusList } from 'src/app/ror/objects/enums/enums.enum';
import { RatingsService } from 'src/app/ror/services/ratings.service';
import * as moment from 'moment';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingDto } from 'src/app/ror/objects/dtos/rating-dto';
import { Observable, forkJoin } from 'rxjs';
import { CompetenceModel } from 'src/app/ror/objects/models/competence-model';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { YesnoModalComponent } from 'src/app/shared/components/modals/yesno-modal/yesno-modal.component';
import { CompetenceAreaModel } from 'src/app/ror/objects/models/competence-area-model';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TaskModel } from 'src/app/ror/objects/models/task-model';
import { DialogConstants } from 'src/app/shared/components/modals/constants';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-rating-edit',
  templateUrl: './rating-edit.component.html'
})
export class RatingEditComponent implements OnInit {

  private user: UserDto = null;
  public rating: RatingModel = new RatingModel();
  public ratedUserPosition: Select2OptionData = null;
  public positionList: Select2OptionData[] = null;
  public hodnotenia: {}[] = [
    { 'id': '1', 'text': 'Úroveň 1 – kompetencia nie je pozorovateľná. Správanie uplatňujúce kompetenciu sa doposiaľ neprejavilo, prípadne iba výnimočne.' },
    { 'id': '2', 'text': 'Úroveň 2 – málo rozvinuté prejavy kompetencie. Deklaruje všeobecnú potrebu uplatňovať prejavy kompetencie. Správanie uplatňujúce kompetenciu je na nízkej úrovni (nedôsledné, uplatňované útržkovito a pod.). Je potrebné zlepšenie.' },
    { 'id': '3', 'text': 'Úroveň 3 – štandardná úroveň prejavov kompetencie. Demonštruje kompetenciu ako reakciu na podnety zvonku, či situácie, ktoré vyžadujú uplatnenie kompetencie. Používanie kompetencie je na dobrej, štandardnej úrovni. Prejav správania je dobrý, vyskytuje sa často a spĺňa očakávania.' },
    { 'id': '4', 'text': 'Úroveň 4 – kompetencia je silnou stránkou. Kompetenciu využíva aj v prípade, že situácia ju priamo nevyžaduje (nie je zjavný podnet). Navyše, prejavy kompetencie sú kvalitatívne na vyššej úrovni (použitie kompetencie je komplexnejšie, dôslednejšie z hľadiska riešenej úlohy). Prejav správania je veľmi dobrý a často prekračuje očakávania.' },
    { 'id': '5', 'text': 'Úroveň 5 – navyše, podporuje prejavy kompetencie u iných. Navyše motivuje a povzbudzuje používanie kompetencie aj u iných. Prípadne zavádza kompetenciu do života tímu a firmy prostredníctvom zavádzania procesov a postupov, ktoré podporujú používanie kompetencie druhými. Prejav správania je excelentný a sústavne prekračuje očakávania.' }
  ];
  public wfActions: string[] = [];
  public isRatedPerson: boolean = false;
  public isManager: boolean = false;
  public isFormReady: boolean = false;
  public editableSections: string[] = [];
  public validationMessage: string = '';

  public ratingStatusList = RatingStatusList;
  public ratingWFActions = RatingWFActions;
  public ratingFormSections = RatingFormSections;

  public options: Select2Options = {
    minimumInputLength: 0,
    multiple: false,
    closeOnSelect: true,
    width: '100%'
  };

  /* calendars */
  public datePickerOptions = {
    format: "DD.MM.YYYY",
    allowInputToggle: true,
    locale: 'sk'
  };

  public modelDate: moment.Moment = moment();

  private dateFormats = ["DD. MM. YYYY", "DD.MM.YYYY"];
  private ratingId: string = '';
  private positionAndCompetenceList: {}[] = null;
  private oldModel: string = '';


  constructor(
    private dataService: DataService,
    private ratingsService: RatingsService,
    private route: ActivatedRoute,
    private router: Router,
    private ngbModal: NgbModal,
    private toastr: ToastrService,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    const observables: Observable<any>[] = [];

    this.user = this.dataService.getData('uzivatel');
    this.route.params.subscribe(
      (param) => {
        if (param['id']) {
          /* otvorenie existujuceho oznamu */
          this.ratingId = param['id'];
          observables.push(this.loadRating(this.ratingId));
        } else {
          observables.push(this.createRating());
        }

        observables.push(this.loadCompetenceList());

        forkJoin(observables).subscribe(
          // po dokonceni vsetkych observables...
          () => {
            this.ratedUserPosition = { 'id': this.rating.ratedUserPositionKey, 'text': this.rating.ratedUserPositionDesc };
            this.oldModel = JSON.stringify(this.rating);
            this.isManager = (this.user.positionKey == this.rating.managerKey);
            this.isRatedPerson = (this.user.userName == this.rating.ratedUser);
            //nacitanie dostupnych akcii
            this.loader.show('wf_ror_loader');
            this.ratingsService.getRatingWFActions(this.rating.id).subscribe(
              (data) => {
                this.loader.hide('wf_ror_loader');
                this.wfActions = data['actions'];

                //ak je mozne prepnut do editovacieho rezimu, definujeme editovatelne sekcie
                if (this.wfActions.includes(RatingWFActions.EDIT)) {
                  switch (this.rating.status) {
                    case this.ratingStatusList.DRAFT:
                      //this.editableSections.push(this.ratingFormSections.TASKS);
                      this.editableSections.push(this.ratingFormSections.PREPARATION);
                      //this.editableSections.push(this.ratingFormSections.EVALUATION);
                      this.editableSections.push(this.ratingFormSections.NOTES);
                      break;

                    case this.ratingStatusList.U_NADRIADENEHO:
                      this.editableSections.push(this.ratingFormSections.HEADER);
                      this.editableSections.push(this.ratingFormSections.TASKS);
                      this.editableSections.push(this.ratingFormSections.COMPETENCE);
                      this.editableSections.push(this.ratingFormSections.EVALUATION);
                      this.editableSections.push(this.ratingFormSections.NOTES);
                      break;

                    case this.ratingStatusList.VYJADRENIE:
                      this.editableSections.push(this.ratingFormSections.EVALUATION);
                      this.editableSections.push(this.ratingFormSections.NOTES);
                      break;
                  }
                }

                this.isFormReady = true;
              },
              (error) => {
                this.loader.hide('wf_ror_loader');
                console.error(error);
              }
            );
          }
        );

      },
      (error) => {
        console.error(error);
      }
    );
  }

  createRating(): Observable<any> {
    return Observable.create(
      observer => {
        /* vytvorenie noveho oznamu */
        this.ratingsService.getRatingId().subscribe(
          (id: any) => {
            this.ratingId = id.docId;
            this.rating = new RatingModel();
            this.rating.id = this.ratingId;
            this.rating.manager = this.user.userName;
            this.rating.managerKey = this.user.positionKey;
            this.rating.managerFN = this.user.fullName;
            observer.next();
            observer.complete();
          },
          (error) => {
            console.error(error);
            observer.next();
            observer.complete();
          }
        );
      }
    );
  }

  loadRating(id: string): Observable<any> {
    return Observable.create(
      observer => {
        this.ratingsService.getRating(id).subscribe(
          (data: RatingDto) => {
            this.rating = new RatingModel(data);

            /* nastavenie datumu */
            this.modelDate = moment(this.rating.dateMeeting, this.dateFormats);

            if (!this.modelDate.isValid()) {
              this.modelDate = null;
            }

            /* unescape poli v taskoch */
            this.rating.tasks.forEach(
              (task) => {
                task.title = unescape(task.title);
                task.description = unescape(task.description);
              }
            );

            observer.next();
            observer.complete();
          },
          (error) => {
            console.error(error);
            observer.next();
            observer.complete();
          }
        );
      }
    );
  }

  loadCompetenceList(): Observable<any> {
    return Observable.create(
      observer => {
        //zoznam pozicii a im priradenych kompetencii
        this.ratingsService.getCompetenceList().subscribe(
          (data: {}[]) => {
            this.positionAndCompetenceList = data;
            this.positionList = [];
            data.forEach(
              (item) => {
                this.positionList.push({ 'id': item['id'], 'text': item['title'] });
              }
            );
            observer.next();
            observer.complete();
          },
          (error) => {
            console.error(error);
            observer.next();
            observer.complete();
          }
        );
      }
    );
  }

  isDirty(): boolean {
    return JSON.stringify(this.rating) !== this.oldModel;
  }

  toggleRating(target: any, value: string): void {
    if (target) {
      target.rating = (target.rating == value) ? '' : value;
    }
  }

  changeUser(e: any): void {
    if (e && e.data && e.data.length > 0 && e.data[0].id && e.data[0].text) {
      this.rating.ratedUser = e.data[0].id;
      this.rating.ratedUserFN = e.data[0].text;
    }
  }

  changePosition(e: any): void {
    if (e && e.data && e.data.length > 0) {
      this.rating.ratedUserPositionKey = e.data[0].id;
      this.rating.ratedUserPositionDesc = e.data[0].text;
      this.changeCompetence(e.data[0].id);
    }
  }

  changeCompetence(positionId: string): void {
    /* zmenit zoznam kompetencii na zaklade zmenenej pozicie
       ak boli nejake kompetecne data zmenene, upozornit a potvrdit dialogom
       zmena znamena vymazanie existujucich kompetencii a naplnenie novych kompetencii do modelu
    */
    if (this.isDirty()) {
      //kontrolny modalny dialog, po potvrdeni vykonat zmenu kompetencii a nastavit oldModel.
      const modalInstance: NgbModalRef = this.ngbModal.open(YesnoModalComponent, { size: 'lg', centered: true });

      // vstupne parametre
      modalInstance.componentInstance.dialogData = {
        message: ['Zmenou pozície sa zmení aj zoznam kompetencií. Súčasné hodnotenia budú zmazané. Naozaj si prajete zmeniť pozíciu?'],
        cancel: DialogConstants.DIALOG_DEFAULT_CANCEL,
        yes: DialogConstants.DIALOG_DEFAULT_YES,
        no: DialogConstants.DIALOG_DEFAULT_NO
      };

      modalInstance.result.then(
        (data) => {
          if (data) {
            //v pripade potvrdenia dialogu, nahradime kompetencie 
            this.setCompetence(positionId);
          }
        },
        () => {
          //pri zavreti alebo zruseni dialogu nerobit nic.
        }
      );

    } else {
      //ak nie je modifikovany model, zmenime to bez otazky
      this.setCompetence(positionId);
    }

  }

  setCompetence(positionId: string): void {
    this.rating.competencesProfessional = [];
    this.rating.competencesPersonal = [];
    this.positionAndCompetenceList.forEach(
      (position) => {
        if (position['id'] == positionId) {
          //nasli sme spravnu poziciu, prejdeme vsetky kompetencie a vlozime ich do kompetencneho zoznamu (rozdelit na osobnostne a profesne)
          position['competence'].forEach(
            (item) => {
              switch (item['type']) {
                case CompetenceTypeList.PERSONAL:
                  let competencePersonalArea: CompetenceAreaModel = new CompetenceAreaModel();
                  competencePersonalArea.category = item['category'];
                  item['competence'].forEach(
                    (kompetencia) => {
                      const kompetenciaModel: CompetenceModel = new CompetenceModel(kompetencia);
                      competencePersonalArea.competenceList.push(kompetenciaModel);
                    }
                  );
                  this.rating.competencesPersonal.push(competencePersonalArea);
                  break;

                case CompetenceTypeList.PROFESSIONAL:
                  let competenceProfessionalArea: CompetenceAreaModel = new CompetenceAreaModel();
                  competenceProfessionalArea.category = item['category'];
                  item['competence'].forEach(
                    (kompetencia) => {
                      const kompetenciaModel: CompetenceModel = new CompetenceModel(kompetencia);
                      competenceProfessionalArea.competenceList.push(kompetenciaModel);
                    }
                  );
                  this.rating.competencesProfessional.push(competenceProfessionalArea);
                  break;
              }

            }
          );
        }
      }
    );
  }

  checkMinMaxValue(e: any): void {

    let inputValue = parseFloat(e.target.value);
    let minValue = parseInt(e.target.min);
    let maxValue = parseInt(e.target.max);

    if (!(isNaN(inputValue) || isNaN(minValue))) {
      if (inputValue < minValue) {
        e.target.value = minValue;
      }
    }

    if (!(isNaN(inputValue) || isNaN(maxValue))) {
      if (inputValue > maxValue) {
        e.target.value = maxValue;
      }
    }

  }

  addTask(): void {
    if (!this.rating.tasks) {
      this.rating.tasks = [];
    }
    this.rating.tasks.push(new TaskModel({ 'title': '', 'description': '', 'deadline': '', 'weight': 0, 'rating': 0 }));
    this.toastr.success('Cieľ bol pridaný', '');
  }

  dateChange(date: string): void {
    this.modelDate = moment(date, this.dateFormats);
  }

  isValid(form: FormGroup): boolean {
    const validWeights = this.validWeights();
    this.validationMessage = (validWeights ? '' : 'Súčet zadaných váh musí byť 100.\n');

    const validDate = (this.modelDate && this.modelDate.isValid());
    this.validationMessage += (validDate ? '' : 'Zadajte prosím dátum stretnutia.\n');

    const validPosition = (this.rating.ratedUserPositionKey != '');
    this.validationMessage += (validPosition ? '' : 'Vyberte prosím pracovnú pozíciu zamestnanca.\n');

    return form.valid && validWeights && validDate && validPosition;
  }

  validWeights(): boolean {
    /* kontrola vah */
    let totalWeight: number = 0;
    this.rating.tasks.forEach(
      (task) => {
        if (task.weight.toString() !== '') {
          if (task.weight < 0 || task.weight > 100) {
            return false;
          } else {
            totalWeight += task.weight;
          }
        }
      }
    );

    return (totalWeight == 100);
  }

  private trimTasks():void {
    let trimmedTasks = [];
    this.rating.tasks.forEach(
      task => {
        if (!(task.title.length === 0 && task.description.length === 0 && task.deadline.length === 0 && task.rating === 0 && task.weight === 0)) {
          trimmedTasks.push(task);
        }
      }
    );
    this.rating.tasks = trimmedTasks;
  }

  save(form: FormGroup, action: string): void {
    
    this.rating.dateMeeting = (this.modelDate && this.modelDate.isValid() && this.modelDate.format("DD.MM.YYYY")) || '';
    
    // odstranime prazdne tasky pridane a nevyplnene.
    this.trimTasks();

    if (action == RatingWFActions.SAVE || action == RatingWFActions.SEND_TO_MANAGER || this.isValid(form)) {
      this.loader.show('ror_loader');
      this.ratingsService.setRating(this.rating, action).subscribe(
        () => {
          this.loader.hide('ror_loader');
          this.oldModel = JSON.stringify(this.rating);
          this.toastr.success('Akcia bola úspešne vykonaná');
          switch (action) {
            case RatingWFActions.SAVE:
              /* pri ulozeni nerobime po akcii nic, uzivatel moze pokracovat v praci */
              break;

            default:

              this.router.navigateByUrl('/ror');
              break;
          }
        },
        (error) => {
          this.loader.hide('ror_loader');
          console.error(error);
          this.toastr.error(error['error-message'], 'Chyba pri ukladaní údajov');
        }
      );
    } else {
      this.toastr.error(this.validationMessage, '', {messageClass: 'text-formated'});
    }
  }

  resetChanges(): void {
    if (this.isDirty()) {
      //kontrolny modalny dialog, po potvrdeni vykonat zmenu kompetencii a nastavit oldModel.
      const modalInstance: NgbModalRef = this.ngbModal.open(YesnoModalComponent, { size: 'lg', centered: true });

      // vstupne parametre
      modalInstance.componentInstance.dialogData = {
        message: ['Naozaj si prajete zahodiť zmeny vykonané v dokumente a vrátiť sa na prehľad hodnotení?'],
        yes: DialogConstants.DIALOG_DEFAULT_YES,
        no: DialogConstants.DIALOG_DEFAULT_NO,
        cancel: DialogConstants.DIALOG_DEFAULT_CANCEL
      };

      modalInstance.result.then(
        (data) => {
          if (data) {
            //v pripade potvrdenia dialogu, prejdeme na zoznam dokumentov 
            this.oldModel = JSON.stringify(this.rating);
            this.router.navigateByUrl('/ror');
          }
        },
        () => {
          //pri zavreti alebo zruseni dialogu nerobit nic.
        }
      );
    } else {
      // ak nebol modifikovany formular, zavrieme ho bez kontrolnej otazky
      this.router.navigateByUrl('/ror');
    }
  }

}
