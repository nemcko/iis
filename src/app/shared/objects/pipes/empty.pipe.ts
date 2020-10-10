import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empty'
})
export class EmptyPipe implements PipeTransform {

  public transform(value: any): any {
    return value || 'Nevyplnené';
  }

}
