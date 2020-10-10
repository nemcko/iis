import { Component, Input, ViewChildren } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FLD_ACCESSOR, noop } from './fldaccessor';
import { SliderTooltipDirective } from '../../objects/directives/slitooltip.directive';

/**
 * Component: Pole formulára - slider wrapper
 */
@Component({
  selector: 'formsli',
  templateUrl: './frmsli.component.html',
  providers: [FLD_ACCESSOR(FormSliderComponent)]
})
export class FormSliderComponent implements ControlValueAccessor {
  @Input() public label: string = '';
  @Input() public min: number = 0;
  @Input() public max: number = 100;
  @Input() public step: number = 10;
  @Input() public disabled: boolean = false;
  @Input() public runnerX: string = '-26px';
  @Input() public runnerY: string = '19px';
  @Input() public runnerUnit: string = '%';
  @ViewChildren(SliderTooltipDirective) private dirtooltip;

  private valueId: any;
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;


  public get value(): any {
    return this.valueId;
  }

  public set value(v: any) {
    this.setTooltipValue(v);
    this.onChangeCallback(v);
  }

  public onBlur(): void {
    this.onTouchedCallback();
  }

  public writeValue(value: any): void {
    if (value !== this.valueId) {
      this.valueId = value;
      this.setTooltipValue(value);
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

  protected setTooltipValue(val: number | string): void {
    let s = val ? val + '' : '';
    while (s.length < 2) {
      s = '0' + s;
    }
    this.dirtooltip.first.setTooltipValue(s + this.runnerUnit)
  }
}
