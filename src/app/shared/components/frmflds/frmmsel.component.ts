import { Component, Input, ViewChild } from '@angular/core';
import { FLD_ACCESSOR, noop } from './fldaccessor';

/**
 * Component: Pole formulára - multiselect wrapper
 */
@Component({
  selector: 'formmsel',
  templateUrl: './frmmsel.component.html',
  providers: [FLD_ACCESSOR(FormMultiSelectComponent)]
})
export class FormMultiSelectComponent {
  @Input() public label: string = '';
  @Input() public name: string = '';
  @Input() public options: Array<{ label: string, value: string }> = []

  @ViewChild('wdg') public wdg;

  protected vals: any;
  private innerValue: any;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  public get value(): any {
    return this.innerValue;
  }

  public set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      // this.onChangeCallback(v);
    }
  }

  public onBlur(): void {
    this.onTouchedCallback();
  }

  public writeValue(value: any): void {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public doClick(): boolean {
    return false;
  }

  public getLabel(code: string): string {
    return this.options.find(obj => obj.value === code).label;
  }

  public save($event: any): boolean {
    this.wdg.hide();
    $event.stopPropagation();
    this.onChangeCallback(this.innerValue);
    return false;
  }

  public clearValue(wdg: any): void {
    wdg.value = [];
    this.innerValue = null;
    this.wdg.hide();
    this.onChangeCallback(this.innerValue);
  }

}
