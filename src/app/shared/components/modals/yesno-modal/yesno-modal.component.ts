import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-yesno-modal',
  templateUrl: './yesno-modal.component.html'
})
export class YesnoModalComponent implements OnInit {

  @Input() public dialogData: any;

  public constructor(
    private ngbActiveModal: NgbActiveModal
  ) { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    //this.vc.nativeElement.focus();
  }

  public ok(value: boolean): void {
    this.ngbActiveModal.close(value);
  }

  public cancel(): void {
    this.ngbActiveModal.dismiss();
  }

}
