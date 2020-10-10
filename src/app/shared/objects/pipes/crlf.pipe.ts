import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'crlf'
})
export class CrlfPipe implements PipeTransform {

  public transform(value: string): any {
    return value.replace(/\n|%0a%0d|%0d%0a/g, '<br>');
  }

}
