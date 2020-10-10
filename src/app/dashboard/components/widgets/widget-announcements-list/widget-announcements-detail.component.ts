import { Component, OnInit, Input } from '@angular/core';
import { AnnouncementDetailDto } from 'src/app/dashboard/objects/dtos/announcement-detail-dto';
import { Router } from '@angular/router';
import { UserDto } from 'src/app/shared/objects/dtos/user-dto';
import { DataService } from 'src/app/shared/services/data-server.service';

@Component({
  selector: '[app-widget-announcements-detail]',
  templateUrl: './widget-announcements-detail.component.html'
})
export class WidgetAnnouncementsDetailComponent implements OnInit {

  @Input() model:AnnouncementDetailDto;

  isHR: boolean = false;

  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    const user:UserDto = this.dataService.getData('uzivatel');
    this.isHR = user.roles.includes('[HR]') || user.roles.includes('[Manager]');
  }

  editArticle(id: string) {
    this.router.navigateByUrl('/dashboard/oznam-edit/' + id);
  }

}
