import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html'
})
export class ConfirmationModalComponent implements OnInit {
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

  public ok(param): void {
    this.ngbActiveModal.close(param);
  }

  public cancel(): void {
    this.ngbActiveModal.dismiss();
  }
}