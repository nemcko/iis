import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { ForumService } from 'src/app/dashboard/services/forum.service';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';
import { ForumSumarDto } from 'src/app/dashboard/objects/dtos/forum-sumar-dto';
import { SortTypeList } from 'src/app/dashboard/objects/enums/enums.enum';

@Component({
  selector: 'app-widget-forum-detail',
  templateUrl: './widget-forum-detail.component.html'
})
export class WidgetForumDetailComponent implements OnInit {

  @Input() sortType: string = SortTypeList.DATE_DESCENDING;

  forumSumar: ForumSumarDto[] = [];

  constructor(
    private forumService: ForumService
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.loadData();
  }
  ngOnInit() {
  }

  loadData() {
    this.forumService.getForumSumar(DashboardConstants.HOMEPAGE_FORUM_COUNT, this.sortType).subscribe(
      (data: ForumSumarDto[]) => {
        this.forumSumar = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
