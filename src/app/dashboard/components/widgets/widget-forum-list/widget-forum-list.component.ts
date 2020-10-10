import { Component, OnInit } from '@angular/core';
import { SortTypeList } from 'src/app/dashboard/objects/enums/enums.enum';

@Component({
  selector: 'app-widget-forum-list',
  templateUrl: './widget-forum-list.component.html'
})
export class WidgetForumListComponent implements OnInit {

  public sortTypeList = SortTypeList;
  public currentSortType: string = <string> SortTypeList.DATE_DESCENDING;

  constructor() { }

  ngOnInit() {
  }

  changeSortType(sortType: string) {
    this.currentSortType = sortType;
  }

}
