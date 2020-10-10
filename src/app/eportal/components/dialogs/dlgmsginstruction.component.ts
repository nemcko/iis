import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
/**
 * Component: Dialógové okno návodu na hodnotenie
 */
@Component({
  templateUrl: './dlgmsginstruction.component.html',
  styleUrls: ['../eportal.css']
})
export class DlgMsgInstructionComponent {
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
