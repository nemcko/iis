import { Component, Input } from '@angular/core';

/**
 * Component: Záložka
 */
@Component({
  selector: 'apptab',
  templateUrl: './tab.component.html'
})
export class TabComponent {
  @Input('tabTitle') public title: string;
  @Input() public active = false;
}
