import { Component, OnInit } from '@angular/core';
import { ThanksDto } from 'src/app/dashboard/objects/dtos/thanks-dto';
import { AnnouncementsService } from 'src/app/dashboard/services/announcements.service';
import { DashboardConstants } from 'src/app/dashboard/objects/values/constants';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserDto } from 'src/app/shared/objects/dtos/user-dto';
import { DataService } from 'src/app/shared/services/data-server.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html'
})
export class ThanksComponent implements OnInit {

  public user:UserDto = null;
  public thanksList: ThanksDto[] = [];
  public search: string = '';
  public editableItem: string = '';
  private expandedId: string[] = [];

  constructor(
    private announcementsService: AnnouncementsService,
    private toastr: ToastrService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.user = this.dataService.getData('uzivatel');
    this.loadRecords();
  }

  isExpanded(id: string): boolean {
    return this.expandedId.includes(id);
  }

  toggleExpanded(id: string):void {
    if (!this.isExpanded(id)) {
      this.expandedId.push(id);
    } else {
      this.expandedId.splice(this.expandedId.indexOf(id), 1);
    }
  }

  loadRecords():void {
    const count = DashboardConstants.LIST_THANKS_COUNT;
    this.announcementsService.getThanks(count, this.search).subscribe(
      (data: ThanksDto[]) => {
        this.thanksList = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  setThanks( form: NgForm) {
    const thanks = form.value.thanks;
    if (thanks.length > 0) { 
      this.announcementsService.setThanks(thanks).subscribe(
        () => {
          this.toastr.success('Ďakujeme za vaše poďakovanie.', '');
          this.loadRecords();
          form.reset();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  updateThanks( form: NgForm, id: string) {
    const thanks = form.value.editThanks;
    if (thanks.length > 0) { 
      this.announcementsService.setThanks(thanks, id).subscribe(
        () => {
          this.toastr.success('Ďakujeme za vaše poďakovanie.', '');
          this.loadRecords();
          this.editableItem = '';
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  removeThanks( id: string ): void {
    this.announcementsService.removeThanks(id).subscribe(
      () => {
        this.toastr.success('Poďakovanie bolo odstránené.', '');
        this.loadRecords();
      },
      (error) => {
        console.error(error);
      }
    );
  }

}
