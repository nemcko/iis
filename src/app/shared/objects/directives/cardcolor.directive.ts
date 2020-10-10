import { Directive, Input, HostBinding, ElementRef, Renderer } from '@angular/core';

/**
 * Directive: Nastavenie farby elementu
 */
@Directive({
  selector: '[cardcolor]'
})
export class CardColorDirective {
  @Input('cardcolor') public colorValue: number;
  @Input() public isTextClass: boolean = true;
  protected elClass: string;

  public constructor(private el: ElementRef, renderer: Renderer) {
    renderer.setElementClass(el.nativeElement, 'green', false);
    renderer.setElementClass(el.nativeElement, 'blue', false);
    renderer.setElementClass(el.nativeElement, 'pink', false);
    renderer.setElementClass(el.nativeElement, 'text-green', false);
    renderer.setElementClass(el.nativeElement, 'text-blue', false);
    renderer.setElementClass(el.nativeElement, 'text-pink', false);

    this.elClass = this.el.nativeElement.className;
  }

  @HostBinding('class')
  public get elementClass(): string {
    const cls = this.elClass + ' ' + (this.isTextClass ? 'text-' : '');

    if (this.colorValue >= 100) {
      return cls + 'green'
    }
    if (this.colorValue > 0 && this.colorValue < 100) {
      return cls + 'blue'
    } 
    else {
      return cls + 'pink'
    }
  }
  public set(val: string): void {
    this.elClass = val;
  }

}