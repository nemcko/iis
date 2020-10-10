import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noci'
})
export class NociPipe implements PipeTransform {

  public transform(value: any): any {
    let pocet = 'nocí';
    switch (value) {
      case 1:
        pocet = 'noc';
        break;

      case 2:
      case 3:
      case 4:
        pocet = 'noci';
        break;
    }
    return value + ' ' + pocet;

  }

}
