import { Component, Input } from '@angular/core';

/**
 * Component: Progress bar s odstupňovaním
 */
@Component({
  selector: 'level-bar',
  templateUrl: './levelbar.component.html'
})
export class LevelBarComponent {
  @Input() public start: number = 0;
  @Input() public startTitle: string = '';
  @Input() public end: number = 0;
  @Input() public endTitle: string = '';
}
