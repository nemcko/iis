import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  public transform(value: any): any {
    if (!value) {
      return;
    }
    return value.reverse();
  }

}
