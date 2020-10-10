import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Component: Dialógové okno nápovedy ku kurzom
 */
@Component({
  templateUrl: './dlgmsgcourses.component.html',
  styleUrls: ['../eportal.css']
})
export class DlgMsgCoursComponent {
  public parent: any;
  public constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal,
  ) {
  }

  public displayData(parent: any): void {
    this.parent = parent;
  }
}
