import { AfterViewInit, Directive, ElementRef, Input, NgZone } from '@angular/core';
import { Tooltip, DomHandler } from 'primeng/primeng';

/**
 * Directive: Tooltip pre slider wrapper
 */
@Directive({
    selector: '[extooltip]',
    providers: [DomHandler]
})

export class SliderTooltipDirective extends Tooltip implements AfterViewInit {

    @Input('extooltip') public txt: any;

    @Input('stickTo') public stickTo: string;
    @Input() public runnerX: string = '-26px';
    @Input() public runnerY: string = '19px';


    public constructor(public el: ElementRef, public dom: DomHandler, public zone: NgZone) {
        super(el, dom, zone);
    }

    public ngAfterViewInit(): void {
        this.el = new ElementRef(this.el.nativeElement.querySelector(this.stickTo));
        this.appendTo = 'target';
        this.tooltipPosition = 'bottom';
        this.text = '';
        this.create();
        this.align();

        this.domHandler.fadeIn(this.container, 250);
        this.container.style.top = this.runnerY;
        this.container.style.left = this.runnerX;
        this.container.style.zIndex = 500
        this.bindDocumentResizeListener();
    }

    public setTooltipValue(txt: string): void {
        if (this.text !== txt) {
            this.text = `${txt}`;
            this.tooltipText.style.position = 'absolute';
            this.tooltipText.style.top = '-28px';
            this.tooltipText.style.left = '-6px';
            this.tooltipText.style.paddingLeft = this.tooltipText.style.paddingRight = '4px';
            this.tooltipText.style.paddingTop = this.tooltipText.style.paddingBottom = '2px';
            this.tooltipText.style.backgroundColor = 'white';
            this.tooltipText.textContent = this.text;
            this.tooltipText.style.left = '-6px';
        }
    }
}