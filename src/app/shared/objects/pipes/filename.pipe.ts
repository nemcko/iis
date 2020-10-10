import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filename'
})
export class FilenamePipe implements PipeTransform {

  public transform(value: string): any {
    let val: string = value;
    if (value.indexOf('/') >= 0) {
      let index = value.lastIndexOf('/');
      if (index + 1 <= value.length) {
        val = value.substring(index + 1);
      }
      index = value.lastIndexOf('?');
      if (index > 0) {
        val = value.substring(0, index);
      }
    }
    return val;
  }

}
