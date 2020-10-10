import {
  Component,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';

import { TabComponent } from './tab.component';

/**
 * Component: Záložky
 */
@Component({
  selector: 'apptabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterContentInit {
  public activeTabs: TabComponent[] = null;

  @ContentChildren(TabComponent) public tabs: QueryList<TabComponent>;

  public ngAfterContentInit(): void {
    const activeTabs: TabComponent[] = this.tabs.filter((tab) => tab.active);

    $('.js-basic-select').select2();

    if (activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  public selectTab(tab: TabComponent | string): void {
    this.tabs.toArray().forEach((t: any) => {
      if (tab instanceof TabComponent) {
        const act = t.title === tab['title'];
        if (t.active !== act) {
          setTimeout(() => {
            t.active = act
          }, 100);
        }
      }
      else {
        const act = t.title === tab;
        if (t.active !== act) {
          setTimeout(() => {
            t.active = act
          }, 100);
        }
      }
    });
  }
}
