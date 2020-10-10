import { Component, Input, ContentChild, TemplateRef } from '@angular/core';

/**
 * Component: Jednoduchý zoznam
 */
@Component({
  selector: 'simple-list',
  templateUrl: './simplelist.component.html'
})
export class SimpleListComponent {
  @Input() public title: string;
  @ContentChild(TemplateRef) public templateRef: TemplateRef<any>;
  @Input() public items:any;
  @Input() public emptyimg: string;
  @Input() public emptymsg: string;
  @Input() public infomsg: string = '';
  @Input() public newmsg: string = '';
  @Input() public doneflg: string = '';
  @Input() public showLength: string = '';
  
}
