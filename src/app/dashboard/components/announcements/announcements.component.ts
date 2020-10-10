import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { AnnouncementDetailDto } from 'src/app/dashboard/objects/dtos/announcement-detail-dto';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';
import { ActivatedRoute } from '@angular/router';
import { DocumentType } from 'src/app/dashboard/objects/enums/enums.enum';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html'
})
export class AnnouncementsComponent implements OnInit {

  oznamy: AnnouncementDetailDto[] = null;
  oznamyCategories: string[] = [];
  oznamyCategoriesKeys: string[] = [];
  search: string = '';
  currentCategory: string = '';
  categoryList: any[] = null;
  selectedCategories: string[] = [];

  documentType = DocumentType;

  constructor(
    private announcementsService: AnnouncementsService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    
    let key:string = '';
    this.loadCategories().subscribe(
      (data) => {
        this.route.params.subscribe(
          (param) => {
            if (param['category']) {
              key = unescape(param['category']);
            }
            this.selectCategory(key);
          },
          () => {
            this.selectCategory(key);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );

  }

  selectCategory(key: string) {
    if (key != '') {
      this.selectedCategories.push(key);
      this.selectedCategories = _.uniq(this.selectedCategories);
    }
    this.loadRecords();
  }

  loadRecords() {
      if (this.selectedCategories && this.selectedCategories.length > 0) {
      //nerobime volanie v kontexte ineho oznamu...
      const parentId = "";
      this.announcementsService.getAnnouncementsByCategory(parentId, DashboardConstants.LIST_ANNOUNCEMENT_COUNT, this.selectedCategories).subscribe(
        (data: AnnouncementDetailDto[]) => {
          this.oznamy = data;
        },
        (error) => {
          console.error(error);
        }
      );

    } else {
      this.announcementsService.getAnnouncements(DashboardConstants.LIST_ANNOUNCEMENT_COUNT, this.search).subscribe(
        (data: AnnouncementDetailDto[]) => {
          this.oznamy = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  loadCategories(): Observable<any> {
    return Observable.create(observer => {
      this.announcementsService.getAnnouncementsCategories().subscribe(
        (data: string[]) => {
          this.categoryList = [];
          data.forEach(
            (item) => {
              this.categoryList.push({label: item, value: item});
            }
          );
          observer.next();
          observer.complete();
        },
        (error) => {
          console.error(error);
          observer.next();
          observer.complete();
        }
      );
    });
  }
}

