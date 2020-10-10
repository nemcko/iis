import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnnouncementDto } from 'src/app/dashboard/objects/dtos/announcement-dto';
import { AnnouncementModel } from 'src/app/dashboard/objects/models/announcement-model';
import { AnnouncementDataService } from 'src/app/dashboard/services/announcement-data.service';
import { UserDto } from 'src/app/shared/objects/dtos/user-dto';
import { DataService } from 'src/app/shared/services/data-server.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { YesnoModalComponent } from 'src/app/shared/components/modals/yesno-modal/yesno-modal.component';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { ToastrService } from 'ngx-toastr';
import { DialogConstants } from 'src/app/shared/components/modals/constants';

declare var feed;

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html'
})

export class AnnouncementComponent implements OnInit {

  announcementId: string = null;
  announcement: AnnouncementModel = null;
  isHR: boolean = false;

  constructor(
    private announcementDataService: AnnouncementDataService,
    private announcementsService: AnnouncementsService,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
    private toastr: ToastrService,
    private ngbModal: NgbModal
    ) { 
      feed=this.announcementsService.getFeed; 
    }

  ngOnInit() {
    const user: UserDto = this.dataService.getData('uzivatel');
    this.isHR = user.roles.includes('[HR]') || user.roles.includes('[Manager]');

    this.route.params.subscribe(
      (parameter) => {
        if (parameter.hasOwnProperty('id')) {
          this.announcementId = parameter['id'];
          this.announcementDataService.setOznamId(this.announcementId);
          this.announcementDataService.getOznamData().subscribe(
            (data: AnnouncementDto) => {
              this.announcement = new AnnouncementModel(data);
              
            },

            (error) => {
              console.error(error);
            }
          );
        }
        if (parameter.hasOwnProperty('response')) {
          const responseStatus:string = parameter['response'];
          switch (responseStatus.toLowerCase()) {
            case 'ok':
            this.toastr.success('Vaša voľba bola úspešne zaregistrovaná.');
            break;

            case 'err':
            this.toastr.success('Pri zaznamenaní Vašej odpovede došlo k chybe.');
            break;
            
          }
        }
      }
    );
  }

  toArchive(): void {
    /* modalny dialog na kontrolknu otazku */
    const modalInstance: NgbModalRef = this.ngbModal.open(YesnoModalComponent, { size: 'lg', centered: true });

    // vstupne parametre
    modalInstance.componentInstance.dialogData = {
      message: ['Chcete archivovať oznam?'],
      cancel: DialogConstants.DIALOG_DEFAULT_CANCEL,
      yes: DialogConstants.DIALOG_DEFAULT_YES,
      no: DialogConstants.DIALOG_DEFAULT_NO
    };

    modalInstance.result
      .then(
        (data) => {
          if (data) {
            /* potvrdime archivaciu */
            this.announcementsService.setAnnouncement(this.announcement, 'toarchive').subscribe(
              (result) => {
                this.toastr.success('Oznam bol úspešne archivovaný.');
                this.router.navigateByUrl('/dashboard');
              },
              (error) => {
                console.error(error);
                this.toastr.error('Neúspešná archivácia. Zopakujte akciu, prípadne kontaktujte správcu aplikácie.');
              }
            );
          } else {
            /* zamietneme archivaciu */

          }

        },
        () => {
          /* zavrieme dialog cez dismiss */

        }
      )
  }

}
