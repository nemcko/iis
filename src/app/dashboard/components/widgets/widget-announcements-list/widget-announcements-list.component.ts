import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { AnnouncementDetailDto } from 'src/app/dashboard/objects/dtos/announcement-detail-dto';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';
import { DocumentType } from 'src/app/dashboard/objects/enums/enums.enum';

@Component({
  selector: 'app-widget-announcements-list',
  templateUrl: './widget-announcements-list.component.html'
})
export class WidgetAnnouncementsListComponent implements OnInit {

  oznamy: AnnouncementDetailDto[] = null;
  search: string = '';

  documentType = DocumentType;

  constructor(
    private announcementsService: AnnouncementsService
  ) { }

  ngOnInit() {
    this.loadRecords();
  }

  loadRecords() {
    this.announcementsService.getAnnouncements(DashboardConstants.HOMEPAGE_ANNOUNCEMENT_COUNT, this.search).subscribe(
      (data: AnnouncementDetailDto[]) => {
        this.oznamy = data;
      },
      (error) => {
        console.error(error);
      }
    );

  }

}
