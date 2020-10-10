import { Component, Input, AfterViewInit, EventEmitter, Output, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FLD_ACCESSOR, noop } from './fldaccessor';
import { Select2OptionData } from 'ng2-select2';

export const COLORPALETTE = ['#deeaee', '#e3eaa7', '#b5e7a0', '#dac292', '#fbefcc', '#d5f4e6', '#fefbd8', '#c5d5c5', '#e3e0cc', '#eaece5', '#ffef96', '#f4e1d2', '#fefbd8', '#f4e1d2', '#f0f0f0', '#b2c2bf', '#c0ded9', '#e4d1d1', '#b9b0b0', '#d9ecd0', '#f0efef', '#ddeedd', '#c2d4dd', '#b0aac0', '#c8c3cc', '#e0e2e4', '#c6bcb6', '#a2b9bc', '#b2ad7f', '#d6cbd3', '#eca1a6', '#bdcebe', '#ada397', '#d5e1df', '#e6e2d3', '#c4b7a6', '#92a8d1', ' #cab577', '#dbceb0', '#80ced6']
export interface IMarkedTabs {
  [id: string]: string
}

/**
 * Component: Pole formulára - záložky
 */
@Component({
  selector: 'frmtabstrip',
  templateUrl: './frmtabstrip.component.html',
  styleUrls: ['./frmtabstrip.component.css'],
  providers: [FLD_ACCESSOR(FormTabstripComponent)]
})
export class FormTabstripComponent implements ControlValueAccessor, AfterViewInit {
  @Input() public label: string = '';
  @Input() public data: Array<Select2OptionData>;
  @Input() public multisel: boolean = true;
  @Input() public canchecktab: boolean = false;
  @Input() public rightButttonMargin: number = 40;
  @Output() public checktab: EventEmitter<IMarkedTabs> = new EventEmitter<IMarkedTabs>()
  @ViewChild('tabstrip') public stripRef: ElementRef;


  private valueId: any;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  public get value(): any {
    return this.valueId;
  }
  public set value(v: any) {
    if (v !== this.valueId) {
      this.valueId = v;
      this.onChangeCallback(v);
    }
  }
  
  public constructor(
    private renderer: Renderer2
  ) { }

  public onBlur(): void {
    this.onTouchedCallback();
  }

  public writeValue(value: any): void {
    if (value !== this.valueId) {
      this.valueId = value;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public changed(e: any): void {
    this.value = e.value;
  }

  public ngAfterViewInit(): void {
    this.iniMouseWhel(this);
    setTimeout(() => {
      this.showOrHideSideButtons();
    }, 500);
  }

  public onTabsResized(event: any): void {
    this.showOrHideSideButtons();
    event.preventDefault();
  }

  public selectTab(e: any, tab: Select2OptionData): void {
    if (this.canchecktab) {
      if (!this.multisel) {
        this.data.forEach((tab) => {
          tab.disabled = true;
        });
      }
      tab.disabled = false;
      this.checktab.next(this.markedTabs);
    }
    e.preventDefault();
  }

  public unselectTab(e: any, tab: Select2OptionData): void {
    if (this.canchecktab) {
      tab.disabled = true;
      this.checktab.next(this.markedTabs);
    }
    e.preventDefault();
  }

  public scrollToLeft(self: any): void {
    const element = self.stripRef.nativeElement;
    if (element) {
      if (element.scrollLeft >= this.rightButttonMargin) {
        element.scrollLeft -= this.rightButttonMargin;
      }
      else {
        element.scrollLeft = 0;
      }
    }
    this.showOrHideSideButtons();
  }

  public scrollToRight(self: any): void {
    const element = self.stripRef.nativeElement;
    if (element) {
      if (element.scrollLeft + element.clientWidth < element.scrollWidth - this.rightButttonMargin) {
        element.scrollLeft += this.rightButttonMargin;
      }
      else {
        element.scrollLeft = element.scrollWidth - element.clientWidth;
        // self.renderer.removeClass(this.stripRef.nativeElement.firstElementChild, 'hidesb');
        // self.renderer.addClass(this.stripRef.nativeElement.firstElementChild, 'showsb');
      }
    }
    this.showOrHideSideButtons();
  }

  protected get markedTabs(): IMarkedTabs {
    return this.data.filter(tab => !tab.disabled).reduce((stabs, tab) => {
      stabs[tab.id] = tab.text; return stabs;
    }, {});
  }

  protected iniMouseWhel(self: any): void {
    $('.tabstrip').on('mousewheel', function (e) {
      const oevent: any = e.originalEvent;
      if (typeof oevent.detail === 'number' && oevent.detail !== 0) {
        if (oevent.detail > 0) {
          self.scrollToLeft(self);
        }
        else if (oevent.detail < 0) {
          self.scrollToRight(self);
        }
      }
      else if (typeof oevent.wheelDelta === 'number') {
        if (oevent.wheelDelta < 0) {
          self.scrollToLeft(self);
        }
        else if (oevent.wheelDelta > 0) {
          self.scrollToRight(self);
        }
      }
      e.preventDefault();
    });
  }

  protected showOrHideSideButtons(): void {
    const element = this.stripRef.nativeElement;
    const checkLeftRightButtonShowed = (element: any): void => {
      if (element.firstElementChild.nextElementSibling.classList.contains('showsb')) {
        this.renderer.removeClass(this.stripRef.nativeElement.firstElementChild.nextElementSibling, 'showsb');
        this.renderer.addClass(this.stripRef.nativeElement.firstElementChild.nextElementSibling, 'hidesb');
      }
    }
    const checkLeftRightButtonHidden = (element: any): void => {
      if (element.firstElementChild.nextElementSibling.classList.contains('hidesb')) {
        this.renderer.removeClass(this.stripRef.nativeElement.firstElementChild.nextElementSibling, 'hidesb');
        this.renderer.addClass(this.stripRef.nativeElement.firstElementChild.nextElementSibling, 'showsb');
      }
    }

    if (element) {
      if (element.scrollLeft) {
        if (element.scrollLeft + element.clientWidth < element.scrollWidth) {
          if (element.firstElementChild.classList.contains('hidesb')) {
            this.renderer.removeClass(this.stripRef.nativeElement.firstElementChild, 'hidesb');
            this.renderer.addClass(this.stripRef.nativeElement.firstElementChild, 'showsb');
          }
        }
      }
      else {
        if (this.stripRef.nativeElement.firstElementChild.classList.contains('showsb')) {
          this.renderer.removeClass(this.stripRef.nativeElement.firstElementChild, 'showsb');
          this.renderer.addClass(this.stripRef.nativeElement.firstElementChild, 'hidesb');
        }
      }

      if (element.clientWidth < element.scrollWidth) {
        if (element.scrollLeft + element.clientWidth >= element.scrollWidth) {
          if (element.firstElementChild.nextElementSibling.classList.contains('hidesb')) {
            this.renderer.removeClass(this.stripRef.nativeElement.firstElementChild.nextElementSibling, 'hidesb');
            this.renderer.addClass(this.stripRef.nativeElement.firstElementChild.nextElementSibling, 'showsb');
          }
          else {
            checkLeftRightButtonShowed(element);
          }
        }
        else {
          if (element.scrollLeft > element.scrollWidth - element.clientWidth - this.rightButttonMargin) {
            checkLeftRightButtonShowed(element);
          }
          else {
            checkLeftRightButtonHidden(element);
          }
        }
      }
      else {
        checkLeftRightButtonShowed(element);
      }
    }
  }


}