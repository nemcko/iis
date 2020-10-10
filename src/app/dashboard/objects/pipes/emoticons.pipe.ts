import { Pipe, PipeTransform } from '@angular/core';
import { EmoticonTypes } from '../enums/enums.enum';

@Pipe({
  name: 'emoticons'
})
export class EmoticonsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let icon = null;

    switch( value ) {
      case EmoticonTypes.EXCITED:
        icon = 'excited.png';
        break;

      case EmoticonTypes.UPSIDE_DOWN:
        icon = 'upside-down-face.png';
        break;

      case EmoticonTypes.THINKING:
        icon = 'thinker.png';
        break;

      case EmoticonTypes.FRUSTRATED:
        icon = 'frustrated.png';
        break;
    }

    return icon;
  }

}
