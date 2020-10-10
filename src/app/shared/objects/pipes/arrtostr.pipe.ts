import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'arrtostr'
})
export class ArrayToStringPipe implements PipeTransform {
  public transform(arr: Array<any>, prop: string): any {

    return Object.keys(arr || []).map((entry: any) => (arr || [])[entry][prop]).join(', ');
  }
}

