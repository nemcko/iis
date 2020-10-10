import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'urlDecode'
})
export class UrlDecodePipe implements PipeTransform {

  public transform(value: any): any {
    return unescape(value);
  }

}
