import { Component, OnInit, Input } from '@angular/core';
import { AnnouncementDetailDto } from 'src/app/dashboard/objects/dtos/announcement-detail-dto';
import { AnnouncementDataService } from 'src/app/dashboard/services/announcement-data.service';

@Component({
  selector: 'app-more-articles',
  templateUrl: './more-articles.component.html'
})
export class MoreArticlesComponent implements OnInit {

  @Input() parentId: string;
  @Input() category: string[];

  oznamy: AnnouncementDetailDto[] = null;

  constructor(
    private AnnouncementDataService: AnnouncementDataService
  ) { }

  ngOnInit() {
    this.AnnouncementDataService.getSuvisiaceOznamyData().subscribe(
      (data:AnnouncementDetailDto[]) => {
        this.oznamy = data;
      },
      (error) => {
        console.error(error);
      }

    );
  }

}
