import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[preventDefault]'
})
export class PreventDefaultDirective {

  @HostListener('click', ['$event'])
   public onClick(event: any): void {
      event.preventDefault();
   }

}
