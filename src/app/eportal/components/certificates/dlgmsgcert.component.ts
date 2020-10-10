import { Component } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
/**
 * Component: Dialógové okno nápovedy k certifikátom
 */
@Component({
  templateUrl: './dlgmsgcert.component.html',
  styleUrls: ['../eportal.css']
})
export class DlgMsgCertComponent {
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
