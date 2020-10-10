import { Component, Input , ContentChild, TemplateRef} from '@angular/core';

/**
 * Component: Zoznam
 */
@Component({
  selector: 'card-list',
  templateUrl: './cardlist.component.html'
})
export class CardListComponent {
  @Input() public title: string;
  @Input() public clsInnerPanel: string = 's-list-zamestnanci';
  @Input() public clsList: string = 'b-list-zamestnanci';
  @Input() public clsItem: string = 'e-zamestnanec-card';
  @Input() public searchFields: string = 'personFN';

  @ContentChild('templateRef') public templateRef: TemplateRef<any>;
  @Input() public items:any;

  
}
