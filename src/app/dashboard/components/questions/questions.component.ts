import { Component, OnInit } from '@angular/core';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';
import { QuestionDto } from 'src/app/dashboard/objects/dtos/question-dto';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html'
})
export class QuestionsComponent implements OnInit {

  public search: string = '';
  public itemsList: QuestionDto[];

  constructor(
    private announcementsService: AnnouncementsService
  ) { }

  ngOnInit() {
    this.loadRecords();
  }

  loadRecords():void {
    this.announcementsService.getQuickQuestion(DashboardConstants.LIST_QUICK_QUESTION_COUNT, this.search).subscribe(
      (data: QuestionDto[]) => {
        this.itemsList = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
