import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html'
})
export class AlertModalComponent implements OnInit {
  @Input() public dialogData: any;
  @ViewChild('submit') public vc: any;

  public constructor(
    private ngbActiveModal: NgbActiveModal
  ) { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.vc.nativeElement.focus();
  }

  public ok(): void {
    this.ngbActiveModal.close(true);
  }

  public cancel(): void {
    this.ngbActiveModal.dismiss();
  }

}
