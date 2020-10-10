import { Component, ElementRef, Renderer, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare const Forms;

/**
 * Component: Dialógové okno
 */
@Component({
  selector: 'appdlg',
  templateUrl: './dlg.componen.html'
})
export class AppdlgComponent {
  @Input() public title: string = '';
  @Input() public contentBackground: string = 'bg-light-green';

  public constructor(
    public activeModal: NgbActiveModal,
    private hostElement: ElementRef,
    private renderer: Renderer
  ) {
    Forms.init();
  }

  public close(): void {
    this.renderer.setElementClass(this.hostElement.nativeElement.parentElement.parentElement.parentElement.parentElement, 'dlgclose', true);
    setTimeout(() => {
      this.activeModal.dismiss();
    }, 200);
  }

}
