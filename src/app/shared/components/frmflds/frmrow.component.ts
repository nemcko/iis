import { Component, Input } from '@angular/core';

/**
 * Component: Pole formulára -  riadok zo štítkom
 */
@Component({
  selector: 'formrow',
  templateUrl: './frmrow.component.html'
})
export class FormRowComponent {
  @Input() public label: string = '';
}
