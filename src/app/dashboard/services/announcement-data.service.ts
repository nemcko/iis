import { Injectable } from '@angular/core';
import { AnnouncementDto } from '../objects/dtos/announcement-dto';
import { AnnouncementsService } from './announcements.service';
import { Subject } from 'rxjs';
import { OznamVotingDto } from '../objects/dtos/announcement-voting-dto';
import { AnnouncementDetailDto } from '../objects/dtos/announcement-detail-dto';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';
import { ForumTopicDto } from '../objects/dtos/forum-topic-dto';
import { ForumService } from './forum.service';

@Injectable()
export class AnnouncementDataService {

  oznamId: string = null;
  oznamCategory: string[] = null;

  private announcementData = new Subject<AnnouncementDto>();
  private votingData = new Subject<OznamVotingDto>();
  private suvisiaceOznamyData = new Subject<AnnouncementDetailDto[]>();
  private forumData = new Subject<ForumTopicDto[]>();

  constructor(
    private announcementsService: AnnouncementsService,
    private forumService: ForumService
  ) { }

  setOznamId( id: string ) {
    this.oznamId = id;
    this.loadOznamData();
  }

  setOznamIdEditable( id: string ) {
    this.oznamId = id;
    this.loadOznamDataEdit();
  }

  loadOznamData() {
    this.announcementsService.getAnnouncement(this.oznamId).subscribe(
      (data:AnnouncementDto) => {
        this.announcementData.next(data);
        this.oznamCategory = data.category;
        this.loadVotingData();
        this.loadSuvisiaceData();
        this.loadForumData();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadOznamDataEdit() {
    this.announcementsService.getAnnouncement(this.oznamId).subscribe(
      (data:AnnouncementDto) => {
        this.announcementData.next(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadVotingData() {
    this.announcementsService.getVoting(this.oznamId).subscribe(
      (data:OznamVotingDto) => {
        this.votingData.next(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadSuvisiaceData() {
    this.announcementsService.getAnnouncementsByCategory(this.oznamId, DashboardConstants.RELATED_ANNOUNCEMENT_COUNT, this.oznamCategory).subscribe(
      (data:AnnouncementDetailDto[]) => {
        this.suvisiaceOznamyData.next(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  loadForumData() {
    this.forumService.getForumList(this.oznamId).subscribe(
      (data:ForumTopicDto[]) => {
        this.forumData.next(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  getSuvisiaceOznamyData() {
    return this.suvisiaceOznamyData;
  }

  getVotingData() {
    return this.votingData;
  }

  getOznamData() {
    return this.announcementData;
  }

  getForumData() {
    return this.forumData;
  }
}
