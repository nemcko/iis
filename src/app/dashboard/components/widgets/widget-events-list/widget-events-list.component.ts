import { Component, OnInit } from '@angular/core';
import { EventsDetailDto } from 'src/app/dashboard/objects/dtos/events-detail-dto';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';

@Component({
  selector: 'app-widget-events-list',
  templateUrl: './widget-events-list.component.html'
})
export class WidgetEventsListComponent implements OnInit {

  events: EventsDetailDto[] = null;
  
  constructor(
    private announcementsService: AnnouncementsService
  ) { }

  ngOnInit() {
    this.announcementsService.getEvents(DashboardConstants.HOMEPAGE_EVENTS_COUNT).subscribe(
      (data: EventsDetailDto[]) => {
        this.events = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
