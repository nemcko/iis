import { Component, OnInit, Input } from '@angular/core';
import { ForumItemDto } from 'src/app/dashboard/objects/dtos/forum-item-dto';
import { AnnouncementDataService } from 'src/app/dashboard/services/announcement-data.service';
import { ForumTopicDto } from 'src/app/dashboard/objects/dtos/forum-topic-dto';
import { NgForm } from '@angular/forms';
import { ForumService } from 'src/app/dashboard/services/forum.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html'
})
export class ForumComponent implements OnInit {

  @Input() oznamId: string;

  prispevok: ForumItemDto;
  prispevky: ForumTopicDto[] = null;
  parentId: string = '';
  currentId: string = '';
  collapsedId: string[] = [];
  editableItem: string = '';

  constructor(
    private AnnouncementDataService: AnnouncementDataService,
    private forumService: ForumService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadForumData();
  }

  loadForumData() {
    this.AnnouncementDataService.getForumData().subscribe(
      (data:ForumTopicDto[]) => {
        this.prispevky = data;
      },
      (error) => {
        console.error(error);
      }

    );
  }

  isCollapsed(id: string):boolean {
    return this.collapsedId.includes(id);
  }

  toggleCollapsed(id: string) {
    if (!this.isCollapsed(id)) {
      this.collapsedId.push(id);
    } else {
      this.collapsedId.splice(this.collapsedId.indexOf(id), 1);
    }
  }

  createForumTopic(form: NgForm) {
    let topic = form.value.newTopic;
    if (topic.length > 0) {
      this.forumService.createTopic(topic, this.oznamId).subscribe(
        () => {
          this.toastr.success('Ďakujeme za váš príspevok do diskusie.', '');
          form.reset();
          this.AnnouncementDataService.loadForumData();
        },
        (error) => {
          this.toastr.warning(error.message);
          console.error(error);
        }
      );
    }

  }

  updateForumTopic(form: NgForm, id: string) {
    let topic = form.value.editTopic;
    if (topic.length > 0) {
      this.forumService.updateTopic(topic, this.oznamId, id).subscribe(
        () => {
          this.toastr.success('Ďakujeme za váš príspevok do diskusie.', '');
          form.reset();
          this.editableItem = '';
          this.AnnouncementDataService.loadForumData();
        },
        (error) => {
          this.toastr.warning(error.message);
          console.error(error);
        }
      );
    }

  }

  createResponse(form: NgForm, parentId: string) {
    let response = form.value.newResponse;
    if (response.length > 0) {
      this.forumService.createResponse(response, parentId, this.oznamId).subscribe(
        () => {
          this.toastr.success('Ďakujeme za vašu odpoveď do diskusie.', '');
          form.reset();
          this.editableItem = '';
          this.AnnouncementDataService.loadForumData();
        },
        (error) => {
          this.toastr.warning(error.message);
          console.error(error);
        }
      );
    }
  }

  updateResponse(form: NgForm, parentId: string, id: string) {
    let response = form.value.editResponse;
    if (response.length > 0) {
      this.forumService.updateResponse(response, parentId, this.oznamId, id).subscribe(
        () => {
          this.toastr.success('Ďakujeme za vašu odpoveď do diskusie.', '');
          form.reset();
          this.editableItem = '';
          this.AnnouncementDataService.loadForumData();
        },
        (error) => {
          this.toastr.warning(error.message);
          console.error(error);
        }
      );
    }
  }

}
