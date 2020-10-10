import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoaderService } from '../../../shared/services/loader.service';

/**
 * Component: Dialóg pre priradenie nového cieľa
 */
@Component({
  templateUrl: './dlgtarget.component.html',
  styleUrls: ['../eportal.css']
})
export class DlgAddTargetComponent implements OnInit {
  public parent: any;
  public objectRef: any;
  public data = { 'weight': 0 };
  public title: string;

  @ViewChild('dlg') public dlg;
  @ViewChild('datepicker') public datepicker;

  public datePickerOptions = {
    format: 'DD.MM.YYYY',
    allowInputToggle: true,
    locale: 'sk'
  };

  public constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
    private loader: LoaderService,
  ) {
  }


  public ngOnInit(): void {
    this.loader.showSpinner();

    setTimeout(() => {
      this.loader.showSpinner(false);
    }, 500);
  }

  public displayData(parent: any, item: any): void {
    this.parent = parent;
    if (item) {
      this.objectRef = item;
      this.data = Object.assign({}, this.objectRef);
    }
    else {
      this.objectRef = null;
      this.data = { 'weight': 0 };
    }
  }

  public save(): void {
    if (this.data['name'] && this.data['desc'] && this.data['deadline']) {
      if (this.objectRef) {
        Object.assign(this.objectRef, this.data);
      }
      else {
        if (!this.parent.data) {
          this.parent.data = {};
        }
        if (!this.parent.data.targets) {
          this.parent.data.targets = [];
        }
        this.parent.data.targets.push(Object.assign({}, this.data));
      }
      this.dlg.close();
    }
  }

  public showDatepicker(): void {
    this.datepicker.nativeElement.focus();
  }
}
