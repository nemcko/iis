import { Component, OnInit } from '@angular/core';
import { CareerDetailDto } from 'src/app/dashboard/objects/dtos/career-detail-dto';
import { CareerService } from 'src/app/dashboard/services/career.service';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-widget-career-list',
  templateUrl: './widget-career-list.component.html'
})
export class WidgetCareerListComponent implements OnInit {

  serverUrl: string = environment.SERVER_URL;
  pathUchadzaci: string = environment.PATH_UCHADZACI;
  ponuky: CareerDetailDto[] = null;

  constructor(
    private kariera: CareerService
  ) { }

  ngOnInit() {
    this.kariera.getPracovnePonuky(DashboardConstants.HOMEPAGE_CAREER_COUNT).subscribe(
      (data:CareerDetailDto[]) => {
        this.ponuky = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
