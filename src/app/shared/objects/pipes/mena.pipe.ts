import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mena'
})
export class MenaPipe implements PipeTransform {

  public transform(value: any, args?: any): any {
    if (value) {
      return value + '' + args[0];
    }
    else {
      return null;
    }
  }

}
