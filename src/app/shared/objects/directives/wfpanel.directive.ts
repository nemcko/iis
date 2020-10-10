import { Directive, ViewContainerRef } from '@angular/core';

/**
 * Directive: Načítanie šablóny Workflow panela 
 */
@Directive({
  selector: '[wfpanel]',
})
export class WorkflowPanelDirective {
  public constructor(public viewContainerRef: ViewContainerRef) { }
}