import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'osoby'
})
export class OsobyPipe implements PipeTransform {

  public transform(value: any): any {
    let pocet = 'osôb';
    switch (value) {
      case 1:
        pocet = 'osoba';
        break;

      case 2:
      case 3:
      case 4:
        pocet = 'osoby';
        break;
    }
    return value + ' ' + pocet;
  }

}
