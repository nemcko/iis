import { Component, OnInit } from '@angular/core';
import { UserDto } from 'src/app/shared/objects/dtos/user-dto';
import { DataService } from 'src/app/shared/services/data-server.service';
import { ActivatedRoute } from '@angular/router';
import { RatingsService } from 'src/app/ror/services/ratings.service';
import { RatingDto } from 'src/app/ror/objects/dtos/rating-dto';
import { RatingModel } from 'src/app/ror/objects/models/rating-model';
import { RatingStatusList, RatingStatusColorList, RatingStatusListDesc, RatingWFActions } from 'src/app/ror/objects/enums/enums.enum';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  public user: UserDto;
  public rating: RatingModel = new RatingModel();
  public isManager: boolean = false;
  public isRatedPerson: boolean = false;
  public wfActions: string[] = [];
  
  public ratingStatusList = RatingStatusList;
  public ratingStatusListDesc = RatingStatusListDesc;
  public ratingStatusColorList = RatingStatusColorList;
  public ratingWFActions = RatingWFActions;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private loader: LoaderService,
    private ratingsService: RatingsService
  ) { }

  ngOnInit() {
    this.user = this.dataService.getData('uzivatel');
    this.route.params.subscribe(
      (param) => {
        if (param['id']) {
          /* otvorenie existujuceho oznamu */
          this.ratingsService.getRating(param['id']).subscribe(
            (data: RatingDto) => {
              this.rating = new RatingModel(data);
              this.isManager = (this.user.positionKey == this.rating.managerKey);
              this.isRatedPerson = (this.user.userName == this.rating.ratedUser);
            },
            (error) => {
              console.error(error);
            }
          );

          /* nacitanie akcii  z WF */
          this.loader.show('wf_ror_loader');
          this.ratingsService.getRatingWFActions(param['id']).subscribe(
            (data) => {
              this.wfActions = data['actions'];
              this.loader.hide('wf_ror_loader');
            },
            (error) => {
              this.loader.hide('wf_ror_loader');
              console.error(error);
            }
          );
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
