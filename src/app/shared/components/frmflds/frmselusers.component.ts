import { Component, Input, ViewChild } from '@angular/core';
import { FLD_ACCESSOR, noop } from './fldaccessor';

/**
 * Component: Pole formulára - výber používateľov
 */
@Component({
  selector: 'formselusers',
  templateUrl: './frmselusers.component.html',
  providers: [FLD_ACCESSOR(FormSelectUsersComponent)]
})
export class FormSelectUsersComponent {
  @Input() public label: string = '';
  @Input() public name: string = '';
  @Input() public options: Array<{ label: string, value: string, parent: string }> = []

  @ViewChild('wdg') public wdg;

  private innerValue: Array<string> = [];
  private onTouchedCallback: () => void = noop;
  private onChangeCallback: (_: any) => void = noop;

  public get value(): any {
    return this.innerValue;
  }

  public set value(v: any) {
    this.diffInGroups(v)
  }

  public onBlur(): void {
    this.onTouchedCallback();
  }

  public writeValue(value: any): void {
    if (value !== this.innerValue && value) {
      this.innerValue = value;
    }
  }

  public registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  public doClick(e: any): boolean {
    return e && false;
  }

  public getLabel(code: string): string {
    return this.options.find(obj => obj.value === code).label;
  }

  public save($event: any): boolean {
    this.wdg.hide();
    $event.stopPropagation();
    this.onChangeCallback(this.innerValue.filter(el => el[0] !== '#'));
    return false;
  }

  public clearValue(wdg: any): void {
    wdg.value = [];
    this.innerValue = [];
    this.wdg.hide();
    this.onChangeCallback(this.innerValue);
  }

  private diffInGroups(arr: Array<string>): Array<string> {
    const diff = [];
    let fnd = null;
    let newValue = [];

    arr.forEach((val: string) => {
      fnd = this.innerValue.filter((ival: string) => ival === val);
      if (!fnd.length && val[0] === '#') {
        diff.push('+' + val)
      }
    })
    this.innerValue.forEach((val: string) => {
      fnd = arr.filter((ival: string) => ival === val);
      if (!fnd.length && val[0] === '#') {
        diff.push('-' + val)
      }
    })

    newValue = arr

    diff.forEach(item => {
      if (item[0] === '+') {
        const itm = item.substr(1);
        this.options.forEach(opt => {
          if (opt.parent === itm && opt.value !== opt.parent && newValue.filter((ival: string) => ival === opt.value).length === 0) {
            newValue.push(opt.value);
          }
        })
      }
      if (item[0] === '-') {
        const itm = item.substr(1);
        newValue = newValue.filter(el => el !== itm);
        this.options.forEach(opt => {
          if (opt.parent === itm && opt.value !== opt.parent) {
            newValue = newValue.filter(el => el !== opt.value);
          }
        })
      }
    })

    this.innerValue = this.wdg.value = newValue;
    return newValue;
  }

}
