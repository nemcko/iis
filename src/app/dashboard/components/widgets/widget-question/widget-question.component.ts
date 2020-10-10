import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { QuestionDto } from 'src/app/dashboard/objects/dtos/question-dto';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';
import { AnswerDto } from 'src/app/dashboard/objects/dtos/answer-dto';
import { EmotikonDto } from 'src/app/dashboard/objects/dtos/emotikon-dto';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/shared/objects/dtos/user-dto';
import { DataService } from 'src/app/shared/services/data-server.service';
import { DocumentType } from 'src/app/dashboard/objects/enums/enums.enum';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PromptModalComponent } from 'src/app/shared/components/modals/prompt-modal/prompt-modal.component';
import { DialogConstants } from 'src/app/shared/components/modals/constants';

@Component({
  selector: 'app-widget-question',
  templateUrl: './widget-question.component.html'
})
export class WidgetQuestionComponent implements OnInit {

  otazka: QuestionDto = null;
  odpoved: AnswerDto = null;
  emotikon: EmotikonDto = null;
  isHR: boolean = false;

  public emoticonTypes = DashboardConstants.EMOTICON_TYPES;
  public iconsPath = DashboardConstants.ICONS_PATH;
  public documentType = DocumentType;

  constructor(
    private announcementsService: AnnouncementsService,
    private dataService: DataService,
    private toastr: ToastrService,
    private ngbModal: NgbModal
  ) {
   }

  ngOnInit() {
    this.loadOtazka();
    const user:UserDto = this.dataService.getData('uzivatel');
    this.isHR = user.roles.includes('[HR]') || user.roles.includes('[Manager]');
  }

  loadOtazka() {
    /* nacitame len jednu otazku */
    this.announcementsService.getQuickQuestion(1).subscribe(
      (data: QuestionDto[]) => {
        if (data && data.length > 0 && data[0].id) {
          this.otazka = data[0];
          this.getEmotikon();
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getEmotikon() {
    this.announcementsService.getEmotikon(this.otazka.id).subscribe(
      (data: EmotikonDto) => {
        this.emotikon = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setEmotikon( choice: string) {
    this.announcementsService.setEmotikon({"parentId": this.otazka.id, "type": choice}).subscribe(
      () => {
        this.toastr.success('Ďakujeme za vašu voľbu.', '');
        this.getEmotikon();
      },
      (error) => {
        console.error(error);
      }
    );

  }

  addAnswer():void {
    /* modalny dialog na zadanie otazky */
    const modalInstance: NgbModalRef = this.ngbModal.open(PromptModalComponent, { size: 'lg', centered: true });
    const message: string[] = [];
    message.push('Sem nám môžeš dať spätnú väzbu na tému aktuálnej otázky. Tvoja správa nebude verejná, dostane sa iba na HR, ktoré ju využije k skvalitneniu pracovného prostredia.');

    // vstupne parametre
    modalInstance.componentInstance.dialogData = {
      title: 'Otázka týždňa',
      message: message,
      subTitle: this.otazka.question,
      placeholder: 'Tvoj text',
      rows: '4',
      cancel: DialogConstants.DIALOG_DEFAULT_CANCEL,
      ok: 'Odoslať'
    };

    modalInstance.result
      .then(
        (answer) => {
          if (answer.length > 0) {
            this.announcementsService.setAnswer({"parentId": this.otazka.id, "answer": answer}).subscribe(
              () => {
                this.toastr.success('Ďakujeme za vašu odpoveď.', '');
              },
              (error) => {
                console.error(error);
              }
            );
          }

        },
        () => {
          /* zavrieme dialog cez dismiss */

        }
      )
  }

}
