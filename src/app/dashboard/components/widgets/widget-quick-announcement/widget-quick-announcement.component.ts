import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { QuickAnnouncementDto } from 'src/app/dashboard/objects/dtos/quick-announcement-dto';
import { DocumentType } from 'src/app/dashboard/objects/enums/enums.enum';
import { UserDto } from 'src/app/shared/objects/dtos/user-dto';
import { DataService } from 'src/app/shared/services/data-server.service';

@Component({
  selector: 'app-widget-quick-announcement',
  templateUrl: './widget-quick-announcement.component.html'
})
export class WidgetQuickAnnouncementComponent implements OnInit {

  public documentType = DocumentType;
  public rychlyOznam:QuickAnnouncementDto;
  isHR: boolean = false;

  constructor(
    private announcementsService: AnnouncementsService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.loadQuickAnnouncement();
    const user:UserDto = this.dataService.getData('uzivatel');
    this.isHR = user.roles.includes('[HR]') || user.roles.includes('[Manager]');
  }


  loadQuickAnnouncement(): void {     
    this.announcementsService.getQuickAnnouncement(1).subscribe(
      (data:QuickAnnouncementDto[]) => {
        if (data && data.length > 0 && data[0].id) {
          this.rychlyOznam = data[0];
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
