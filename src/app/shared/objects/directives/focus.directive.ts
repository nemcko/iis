import { Directive, ElementRef, Renderer, Renderer2, OnInit, Input, HostListener, AfterViewInit } from '@angular/core';

/**
 * Directive: Nastavenie aktívneho elementu
 */
@Directive({ selector: '[appFocus]' })
export class FocusDirective implements OnInit, AfterViewInit {

    @Input('appFocus') public appfocus: string;
    public isFocused: boolean = true;
    public goNext: boolean = false;
    public nofocus: boolean = false;

    public constructor(private hostElement: ElementRef, private renderer: Renderer, private renderer2: Renderer2) { }

    public ngOnInit(): void {
        if (this.appfocus) {
            switch (this.appfocus) {
                case 'false':
                    this.isFocused = false;
                    break;
                case 'blur':
                    this.goNext = true;
                    break;
                case 'nofocus':
                    this.nofocus = true;
                    break;
            }
        }

        if (this.isFocused) {
            this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'focus');
        }
    }

    public ngAfterViewInit(): void {
        if (this.goNext) {
            setTimeout(() => {
                // const el = this.hostElement.nativeElement; //.previousSibling.nextElementSibling;
                // const eventObj = document.createEvent('Events') as any;

                // if (eventObj.initEvent) {
                //     eventObj.initEvent('keyup', true, true);
                // }

                // eventObj.shiftKey = false;
                // eventObj.ctrlKey = false;
                // eventObj.metaKey = false;
                // eventObj.altKey = false;
                // eventObj.keycode = 9;
                // eventObj.witch = 9;

                // if (el.dispatchEvent) {
                //     el.dispatchEvent(eventObj)
                // } else {
                //     el.fireEvent('onkeyup', eventObj);
                // }

                this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'blur', []);
            }, 500);
        }
        else {
            if (this.isFocused) {
                setTimeout(() => {
                    this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'blur', []);
                }, 500);
            }

        }
    }

    @HostListener('click') public onClick(): void {
        if (!this.isFocused) {
            this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'blur', []);
        }
        if (this.nofocus) {
            this.renderer.invokeElementMethod(this.hostElement.nativeElement, 'blur', []);
        }
    }

    @HostListener('focus') public onFocus(): void {
    }
}