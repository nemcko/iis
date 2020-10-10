import { Component, Input } from '@angular/core';

/**
 * Component: formulárový element
 */
@Component({
  selector: 'formbox',
  templateUrl: './frmbox.component.html'
})
export class FormBoxComponent {
  @Input() public label: string = '';
}