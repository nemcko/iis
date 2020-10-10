import { Component, Input } from '@angular/core';

/**
 * Component Pole formulára
 */
@Component({
  selector: 'formfld',
  templateUrl: './frmfld.component.html'
})
export class FormFldComponent {
  @Input() public label: string = '';
}
