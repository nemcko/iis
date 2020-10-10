import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  public transform(value: any, keys: string, term: string): boolean {

    if (!term) {
      return value;
    }
    return (value || []).filter((item: any) => keys.split(',').some(key => {
      if (item[key]) {
        if (Array.isArray(item[key])) {
          return item[key].indexOf(term) !== -1;
        }
        else {
          return new RegExp(term, 'gi').test(item[key])
        }
      }
      else {
        return false;
      }
    }));
  }
}

