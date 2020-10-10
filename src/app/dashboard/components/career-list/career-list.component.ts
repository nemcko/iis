import { Component, OnInit } from '@angular/core';
import { CareerDetailDto } from 'src/app/dashboard/objects/dtos/career-detail-dto';
import { CareerService } from 'src/app/dashboard/services/career.service';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';

@Component({
  selector: 'app-career-list',
  templateUrl: './career-list.component.html'
})
export class CareerListComponent implements OnInit {

  ponuky: CareerDetailDto[] = null;

  constructor(
    private karieraService: CareerService
  ) { }

  ngOnInit() {
    this.karieraService.getPracovnePonuky(DashboardConstants.HOMEPAGE_CAREER_COUNT).subscribe(
      (data:CareerDetailDto[]) => {
        this.ponuky = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
