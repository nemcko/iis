import { Component, OnInit } from '@angular/core';
import { RatingStatusList, RatingStatusListDesc, RatingStatusColorList } from 'src/app/ror/objects/enums/enums.enum';
import { RatingInfoDto } from 'src/app/ror/objects/dtos/rating-info-dto';
import { RatingsService } from 'src/app/ror/services/ratings.service';
import { RorConstants } from '../../objects/values/constants';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html'
})
export class RatingsComponent implements OnInit {

  statusList = RatingStatusList;
  statusListDesc = RatingStatusListDesc;
  statusColorList = RatingStatusColorList;

  search: string = null;
  ratings: RatingInfoDto[] = null;

  constructor(
    private ratingsService: RatingsService
  ) { }

  ngOnInit() {
    this.loadRecords();
  }

  loadRecords() {
    
    this.ratingsService.getRatingsList(RorConstants.LIST_RATINGS_COUNT, this.search).subscribe(
      (data: RatingInfoDto[]) => {
        this.ratings = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
