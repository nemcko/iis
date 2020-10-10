import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { EventsDetailDto } from 'src/app/dashboard/objects/dtos/events-detail-dto';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';
import { DocumentType } from 'src/app/dashboard/objects/enums/enums.enum';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html'
})
export class EventsComponent implements OnInit {

  public eventList: EventsDetailDto[] = [];
  public search: string = '';
  public documentType = DocumentType;
  private expandedId: string[] = [];

  constructor(
    private announcementsService: AnnouncementsService
  ) { }

  ngOnInit() {
    this.loadRecords();
  }

  isExpanded(id: string): boolean {
    return this.expandedId.includes(id);
  }

  toggleExpanded(id: string) {
    if (!this.isExpanded(id)) {
      this.expandedId.push(id);
    } else {
      this.expandedId.splice(this.expandedId.indexOf(id), 1);
    }
  }

  loadRecords() {
    this.announcementsService.getEvents(DashboardConstants.LIST_EVENTS_COUNT, this.search).subscribe(
      (data: EventsDetailDto[]) => {
        this.eventList = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
