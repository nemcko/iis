import { Component, Input, AfterViewInit, ViewChildren } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FLD_ACCESSOR, noop } from './fldaccessor';
import { Select2OptionData } from 'ng2-select2';
import { ClassesDirective } from '../../../shared/objects/directives/classes.directive';

/**
 * Component: Pole formulára - select2 wrapper
 */
@Component({
  selector: 'formsel',
  templateUrl: './frmsel.component.html',
  providers: [FLD_ACCESSOR(FormSelectComponent)]
})
export class FormSelectComponent implements ControlValueAccessor, AfterViewInit {
  @Input() public label: string = '';
  @Input() public options: Select2Options = {
    minimumInputLength: 0,
    multiple: false,
    closeOnSelect: true,
    width: '100%'
  };
  @Input() public data: Array<Select2OptionData>;
  @ViewChildren(ClassesDirective) private dircls;

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
  
  public ngAfterViewInit(): void {
    const dircls = this.dircls.first;
    $('select').on('select2:open', function () {
      dircls.setClasses(dircls, 'select2box');
    }).on('select2:close', function () {
      dircls.setClasses(dircls, 'notSelect2box');
    })
  }

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

}
