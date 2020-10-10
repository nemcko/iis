import { Component, OnInit } from '@angular/core';
import { AnnouncementModel } from 'src/app/dashboard/objects/models/announcement-model';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';

declare var feed;

@Component({
  selector: 'app-announcement-preview',
  templateUrl: './announcement-preview.component.html'
})
export class AnnouncementPreviewComponent implements OnInit {

  oznam: AnnouncementModel = new AnnouncementModel();
  
  constructor(
    private announcementsService: AnnouncementsService,
    ) { 
      feed=this.announcementsService.getFeed; 
    }

  ngOnInit() {
    if (window.localStorage) {
      this.oznam = new AnnouncementModel(JSON.parse(localStorage.getItem('oznamPreview')));
    }
  }

}
