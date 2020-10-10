
import { ElementRef, HostListener, Directive, Input } from '@angular/core';

/**
 * Directive: Automatické nastavenie výšky elementu
 */
@Directive({
    selector: '[autoheight]'
})

export class ElementAutoHeight {
    @Input() public maximumHeight: number = 50;
    @Input() public minimumHeight: number = 12;
    protected minimized: boolean = true;

    public constructor(public element: ElementRef) {
    }

    @HostListener('input', ['$event.target'])
    public onInput(): void {
        this.adjust();
    }

    @HostListener('mouseenter', ['$event.target'])
    public onMouseEnter(): void {
        this.minimized = false;
        this.adjust();
    }

    @HostListener('mouseleave', ['$event.target'])
    public onMouseLeave(): void {
        this.minimized = true;
        this.adjust();
    }


    public ngAfterContentChecked(): void {
        this.adjust();
    }

    public adjust(): void {
        // this.element.nativeElement.style.overflow = 'hidden';
        // this.element.nativeElement.style.height = 'auto';
        // this.element.nativeElement.style.height = this.element.nativeElement.scrollHeight + "px";
        const ta = this.element.nativeElement;
        const maxHeghit = this.maximumHeight;
        ta.style.overflow = 'hidden';
        ta.style.height = 'auto';
        if (!this.minimized) {
            ta.style.height = Math.max(this.minimumHeight, ta.scrollHeight) + 'px';
        }
        else {
            if (ta.scrollHeight <= maxHeghit) {
                ta.style.height = Math.max(this.minimumHeight, ta.scrollHeight) + 'px';
            }
            else {
                ta.style.height = Math.max(this.minimumHeight, maxHeghit) + 'px';
                // ta.style.overflow = 'auto';
            }
        }
    }
}