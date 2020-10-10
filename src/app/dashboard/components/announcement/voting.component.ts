import { Component, OnInit, Input } from '@angular/core';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { OznamVotingDto } from 'src/app/dashboard/objects/dtos/announcement-voting-dto';
import { VotingTypes } from 'src/app/dashboard/objects/enums/enums.enum';
import { VotingDto } from 'src/app/dashboard/objects/dtos/voting-dto';
import { AnnouncementDataService } from 'src/app/dashboard/services/announcement-data.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html'
})
export class VotingComponent implements OnInit {

  @Input() oznamId: string;

  public votingTypes = VotingTypes;

  voting:OznamVotingDto = null;
  isLikeAllowed: boolean = false;
  isDislikeAllowed: boolean = false;

  constructor(
    private AnnouncementsService: AnnouncementsService,
    private AnnouncementDataService: AnnouncementDataService
  ) { }

  ngOnInit() {
    this.loadVoting();
  }

  loadVoting() {
    this.AnnouncementDataService.getVotingData().subscribe(
      (data:OznamVotingDto) => {
        this.voting = data;
        this.isLikeAllowed = (this.voting.userVote != this.votingTypes.LIKE);
        this.isDislikeAllowed = (this.voting.userVote != this.votingTypes.DISLIKE);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setVote(vote: string) {
    
    let voting: VotingDto = {"parentId":this.oznamId, "type": vote};

    if (vote == this.votingTypes.LIKE && this.isLikeAllowed) {
      this.isLikeAllowed = false;      
      this.AnnouncementsService.setVoting(voting).subscribe(
        () => {
          this.isDislikeAllowed = true;
          this.AnnouncementDataService.loadVotingData();
        },
        (error) => {
          this.isLikeAllowed = true;
          console.error(error);
        }
      );
    }

    if (vote == this.votingTypes.DISLIKE && this.isDislikeAllowed) {
      this.isDislikeAllowed = false;
      this.AnnouncementsService.setVoting(voting).subscribe(
        () => {
          this.isLikeAllowed = true;
          this.AnnouncementDataService.loadVotingData();
        },
        (error) => {
          this.isDislikeAllowed = true;
          console.error(error);
        }
      );
    }
  }

}
