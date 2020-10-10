import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';
import { QuickAnnouncementDto } from 'src/app/dashboard/objects/dtos/quick-announcement-dto';

@Component({
  selector: 'app-quick-announcements',
  templateUrl: './quick-announcements.component.html'
})
export class QuickAnnouncementsComponent implements OnInit {

  public search: string = '';
  public itemsList: QuickAnnouncementDto[];

  constructor(
    private announcementsService: AnnouncementsService
  ) { }

  ngOnInit() {
    this.loadRecords();
  }

  loadRecords():void {
    this.announcementsService.getQuickAnnouncement(DashboardConstants.LIST_QUICK_ANNOUNCEMENTS_COUNT, this.search).subscribe(
      (data: QuickAnnouncementDto[]) => {
        this.itemsList = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
