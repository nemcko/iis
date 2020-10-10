import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-widget-question-hr',
  templateUrl: './widget-question-hr.component.html'
})
export class WidgetQuestionHrComponent implements OnInit {

  constructor(
    private announcementsService: AnnouncementsService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  setQuestionHR( form: NgForm) {
    const question = form.value.questionHR;
    if (question.length > 0) { 
      this.announcementsService.setQuestionHR(question).subscribe(
        () => {
          this.toastr.success('Ďakujeme za vašu otázku.', '');
          form.reset();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}
