import { Component, OnInit } from '@angular/core';
import { QuickAnnouncementDto } from 'src/app/dashboard/objects/dtos/quick-announcement-dto';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { ToastrService } from 'ngx-toastr';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PromptModalComponent } from 'src/app/shared/components/modals/prompt-modal/prompt-modal.component';
import { DialogConstants } from 'src/app/shared/components/modals/constants';

@Component({
  selector: 'app-widget-thanks',
  templateUrl: './widget-thanks.component.html'
})
export class WidgetThanksComponent implements OnInit {

  podakovanie: QuickAnnouncementDto = null;

  constructor(
    private announcementsService: AnnouncementsService,
    private toastr: ToastrService,
    private ngbModal: NgbModal
  ) { }

  ngOnInit() {
    this.loadThanks();
  }

  loadThanks(): void {
    this.announcementsService.getThanks(1).subscribe(
      (data: QuickAnnouncementDto) => {
        this.podakovanie = data[0];
        this.podakovanie.title = unescape(this.podakovanie.title);
        this.podakovanie.title = (this.podakovanie.title.length > DashboardConstants.WIDGET_THANKS_LENGTH) ? this.podakovanie.title.substr(0, DashboardConstants.WIDGET_THANKS_LENGTH) + DashboardConstants.WIDGET_THANKS_MORE : this.podakovanie.title;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addThanks(): void {
    /* modalny dialog na zadanie otazky */
    const modalInstance: NgbModalRef = this.ngbModal.open(PromptModalComponent, { size: 'lg', centered: true });
    let message: string[] = [];
    message.push('V tomto priestore sa môžeš verejne poďakovať konkrétne niekomu z Tvojich kolegov alebo aj celému tímu.');

    // vstupne parametre
    modalInstance.componentInstance.dialogData = {
      title: 'Vytvorenie poďakovania',
      message: message,
      placeholder: 'Tvoj text',
      rows: '4',
      cancel: DialogConstants.DIALOG_DEFAULT_CANCEL,
      ok: 'Uverejniť'
    };

    modalInstance.result
      .then(
        (answer) => {
          if (answer.length > 0) {
            this.announcementsService.setThanks(answer).subscribe(
              () => {
                this.toastr.success('Ďakujeme za vaše poďakovanie.', '');
                this.loadThanks();
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
