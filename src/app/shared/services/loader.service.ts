import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loaderVisibility: string[] = [];
  public isVisible = new Subject<string[]>()
  public isActive = new Subject<boolean>()

  public constructor() { }

  public show(key: string): void {
    if (!this.visible(key)) {
      this.loaderVisibility.push(key);
    }
    //console.debug('show ... ', key, this.loaderVisibility);
    this.isVisible.next(this.loaderVisibility);
  }

  public hide(key: string): void {
    if (this.visible(key)) {
      this.loaderVisibility.splice(this.loaderVisibility.indexOf(key), 1);
    }
    //console.debug('hide ... ', key, this.loaderVisibility);
    this.isVisible.next(this.loaderVisibility);
  }

  public showSpinner(show: boolean = true): void {
    this.isActive.next(show);
  }

  private visible(key: string): boolean {
    return this.loaderVisibility.includes(key);
  }
}
