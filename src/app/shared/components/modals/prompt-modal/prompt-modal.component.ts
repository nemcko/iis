import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-prompt-modal',
  templateUrl: './prompt-modal.component.html'
})
export class PromptModalComponent implements OnInit {

  @Input() public dialogData: any;
  @ViewChild('prompt') public vc: any;

  public constructor(
    private ngbActiveModal: NgbActiveModal
  ) { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.vc.nativeElement.focus(), 0);
  }

  public ok(returnValue): void {
    this.ngbActiveModal.close(returnValue);
  }

  public cancel(): void {
    this.ngbActiveModal.dismiss();
  }

}
