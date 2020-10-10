import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs';
import { LoaderService } from '../../../shared/services/loader.service';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { UserContextService } from 'src/app/eportal/services/user-context.service';

/**
 * Component: Detail záznamu absolvovaného kurzu
 */
@Component({
  templateUrl: './dlgcourse.component.html',
  styleUrls: ['../eportal.css']
})
export class DlgCourseComponent implements OnInit {
  public parent: any;
  public datePickerOptions = {
    format: 'DD.MM.YYYY',
    allowInputToggle: true,
    locale: 'sk'
  };
  public data: any = {};
  public title: string;

  @ViewChild('dlg') public dlg;

  public constructor(
    public usrCtx: UserContextService,
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private loader: LoaderService,
    private eportalSvc: EpService,
  ) {
  }


  public ngOnInit(): void {
    this.title = 'Pridanie nového školenie';
  }

  public displayData(parent: any, id: string): void {
    this.parent = parent;
    this.loadData(id);
  }

  public loadData(id: string): void {
    if (id) {
      this.loader.showSpinner();
      forkJoin(
        this.eportalSvc.getCourse(id),
      ).subscribe(
        data => {
          this.data = data[0];
          this.title = 'Školenie zamestnancov';
          this.loader.showSpinner(false);
        },
        err => {
          console.error(err);
          this.loader.showSpinner(false);
        }
      );
    }
    else {
      this.data.id = null;
    }
  }

  public save(): void {
    this.loader.showSpinner();
    this.eportalSvc.setCourse(this.data).subscribe(
      () => {
        this.loader.showSpinner(false);
        this.dlg.close();
      },
      err => {
        console.error(err);
        this.loader.showSpinner(false);
      }
    );
  }
}
