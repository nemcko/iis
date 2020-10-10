import { Directive, ElementRef, Renderer, Input, AfterViewInit, HostListener, HostBinding } from '@angular/core';

/**
 * Directive: Skupinkové nastavenie tried html elementov a wrapovacích objektov
 */
@Directive({ selector: '[classes]' })
export class ClassesDirective implements AfterViewInit {

    @Input('classes')
    public pseudoclass: string = '';
    private clsControl: string = '';
    private clsControlRem: string = '';
    private clsControlAdd: string = '';
    @HostBinding('class') private clsParent: string = '';
    private clsParent1: string = '';
    private clsPrev: string = '';
    private clsChild: string = '';
    private clsNextChild: string = '';
    private clsChildRem: string = '';
    private clsChildAdd: string = '';
    private ctrl: any;


    public constructor(private hostElement: ElementRef, private renderer: Renderer) {
        this.setClasses(this, '')
    }

    @HostListener('focus')
    public setInputFocus(): void {
        if ((this.hostElement.nativeElement.type === 'text' || this.hostElement.nativeElement.type === 'textarea') && this.hostElement.nativeElement.className.indexOf('ctrlbox') >= 0) {
            this.hostElement.nativeElement.classList.remove('noctrlbox');
            this.hostElement.nativeElement.classList.add('ctrlbox');
        }
    }

    @HostListener('blur')
    public setInputFocusOut(): void {
        if ((this.hostElement.nativeElement.type === 'text' || this.hostElement.nativeElement.type === 'textarea') && this.hostElement.nativeElement.className.indexOf('ctrlbox') >= 0) {
            this.hostElement.nativeElement.classList.remove('ctrlbox');
            this.hostElement.nativeElement.classList.add('noctrlbox');
        }
    }

    public ngAfterViewInit(): void {
        this.setClasses(this, this.pseudoclass)
    }

    public setClasses(self: any, pscls: string): void {
        if (!pscls) {
            return;
        }
        Array.from(new Set(pscls.split(' '))).filter((type) => {
            self.ctrl = self.hostElement.nativeElement;
            switch (type.trim()) {
                // HTML elements                
                case 'text':
                    self.clsControl = 'robox form-control fs-6 p-4 h-auto';
                    break;
                case 'htext':
                    self.clsControl = 'rotext p-2 fs-6 h-auto';
                    break;
                case 'input':
                    self.clsControl = 'form-control noctrlbox fs-6 box-shadow-sm p-4 h-auto';
                    break;
                case 'date':
                    self.clsControl = 'form-control noctrlbox fs-6 box-shadow-sm py-4 px-6 h-auto js-datetime-picker';
                    self.hostElement.nativeElement.autocomplete = 'off';
                    // self.hostElement.nativeElement.type = 'date';
                    // self.hostElement.nativeElement.placeholder = 'DD.MM.RRRR';
                    break;
                case 'textarea':
                    self.clsControl = 'form-control noctrlbox fs-6 box-shadow-sm py-4 px-6 lh-22';
                    self.hostElement.nativeElement.autocomplete = 'off';
                    self.hostElement.nativeElement.maxlength = 300;
                    break;
                case 'textarea2':
                    self.clsControl = 'form-control noctrlbox shadow-none fs-6 p-4 lh-22';
                    self.hostElement.nativeElement.autocomplete = 'off';
                    self.hostElement.nativeElement.maxlength = 300;
                    // self.hostElement.nativeElement.style.height
                    break;
                case 'select':
                    self.clsControl = 'form-control noctrlbox fs-6 box-shadow-sm py-4 pl-4 pr-0 lh-22';
                    self.hostElement.nativeElement.style.height = '56px';
                    break;
                case 'label':
                    self.clsControl = 'd-block fs-5 mb-1 ml-2 font-weight-bold';
                    break;
                // case 'select2':
                //     self.clsControl = 'border border-primary';
                //     // self.clsParent = 'border';
                //     break;
                case 'inputaddon':
                    // self.clsParent = 'form-control border border-primary box-shadow-sm p-4 h-auto ui-inputgroup';
                    // self.clsControl = 'd-flex justify-content-end';
                    // self.clsChild = 'form-control border border-primary box-shadow-sm p-4 fs-6 h-100';
                    self.clsControl = 'form-control border-0 box-shadow-sm p-4 fs-6 h-100';
                    self.hostElement.nativeElement.style.height = '58px';
                    break;

                case 'notSelect2box':
                    self.clsChildRem = 'ctrlbox';
                    self.clsChildAdd = 'noctrlbox';
                    self.ctrl = self.hostElement.nativeElement.nextSibling ? self.hostElement.nativeElement.nextSibling['children'][1] : self.hostElement.nativeElement['children'][1];
                    break;
                case 'select2box':
                    self.clsChildRem = 'noctrlbox';
                    self.clsChildAdd = 'ctrlbox';
                    self.ctrl = self.hostElement.nativeElement.nextSibling ? self.hostElement.nativeElement.nextSibling['children'][1] : self.hostElement.nativeElement['children'][1];
                    break;

                case 'notInputbox':
                    self.clsControl = 'form-control border-1 fs-6 box-shadow-sm p-4 h-auto';
                    self.clsChildRem = 'ctrlbox';
                    self.clsChildAdd = 'noctrlbox';
                    self.ctrl = self.hostElement.nativeElement;
                    break;
                case 'inputbox':
                    self.clsControl = 'form-control border-1 fs-6 box-shadow-sm p-4 h-auto';
                    self.clsChildRem = 'noctrlbox';
                    self.clsChildAdd = 'ctrlbox';
                    self.ctrl = self.hostElement.nativeElement;
                    break;

                case 'panel':
                    self.clsControl = 'bg-white box-shadow-sm border-radius-md';
                    break;

                case 'theme':
                    self.clsControl = 'form-control noctrlbox border-1 rounded rounded-lg w-100 lh-22 fs-6';
                    self.hostElement.nativeElement.autocomplete = 'off';
                    self.hostElement.nativeElement.maxlength = 300;
                    break;
                case 'themebox':
                    self.clsControl = 'bg-white p-5 border-radius-md box-shadow-sm clearfix h-100 d-flex flex-column position-relative';
                    self.clsChild = 'font-weight-bold fs-5 mx-2 mb-1 text-primary';
                    self.clsNextChild = 'row m-2';
                    break;
                case 'themeout':
                    self.clsControl = 'col-12 col-lg-6 mb-4';
                    break;

                // case 'quill':
                //     self.clsControl = 'rounded rounded-lg';
                //     self.ctrl = self.hostElement.nativeElement.firstElementChild;
                //     break;

                case 'dropdown':
                    self.clsControl = 'form-control border-0 fs-6 box-shadow-sm p-4';
                    self.hostElement.nativeElement.style.height = '56px';
                    self.hostElement.nativeElement.firstElementChild.childNodes[2].style.margin = '0';
                    break;

                case 'sectionpanel':
                    self.clsControl = 'clearfix mb-2';
                    self.clsChild = 'fs-6 font-weight-bold d-inline-block mr-3 mt-3';
                    self.clsNextChild = 'font-weight-bold text-secondary fs-4';
                    break;
                case 'sectionpanel0':
                    self.clsControl = 'clearfix mb-2';
                    self.clsChild = 'fs-6 font-weight-bold d-inline-block mr-3 mt-3';
                    break;

                case 'header3':
                    self.clsControl = 'mt-3 clearfix';
                    self.clsChild = 'fs-7 font-weight-bold d-inline-block mr-3 mt-3';
                    break;

                case 'toptitle':
                    self.clsControl = 'clearfix mb-5';
                    self.clsChild = 'fs-7 font-weight-bold';
                    break;
                case 'toptitle2':
                    self.clsControl = 'clearfix';
                    self.clsChild = 'fs-7 font-weight-bold';
                    break;
                case 'topbox':
                    self.clsControl = 'bg-white px-3 py-3 border-radius-md box-shadow-sm clearfix fs-6 col-12';
                    self.clsChild = 'row';
                    break;
                case 'topboxfld':
                    self.clsControl = 'clearfix d-flex flex-row flex-nowrap align-middle';
                    self.clsChild = 'mr-1 fs-5';
                    self.clsNextChild = 'fs-6';
                    break;
                case 'topboxfld0':
                    self.clsControl = 'clearfix d-flex flex-row flex-nowrap align-middle';
                    // self.clsChild = 'fs-6';
                    break;
                case 'topboxselect':
                    self.ctrl = self.hostElement.nativeElement.childNodes[1].childNodes[0].childNodes[0];//.firstElementChild;//.firstElementChild;
                    self.clsControl = 'shadow-none  border-1';
                    self.clsChild = 'shadow-none p-0 bg-light rounded-lg border-0 w-100';
                    // self.clsNextChild = 'w-100';
                    break;

                case 'levelslider':
                    self.clsControl = 'd-inline-block col-12 levelslider';
                    break;

                case 'footerpanel':
                    self.clsControl = 'b-article-detail-footer px-4 py-2';
                    break;
                case 'footerbutton':
                    self.clsControl = 'font-weight-bold text-uppercase text-secondary d-inline-block fs-5 py-2 px-4 mr-2';
                    break;


                // Multiselect
                case 'multiselect_hdr':
                    self.clsControl = 'border-top d-block';
                    break;
                case 'multiselect_ok':
                    self.clsControl = 'btn bg-transparent mx-2 text-secondary text-uppercase fs-5 font-weight-bold px-6 py-2 px-md-6 float-right';
                    break;
                case 'multiselect_clear':
                    self.clsControl = 'btn bg-transparent mx-2 text-primary text-uppercase fs-5 font-weight-bold px-6 py-2 px-md-6';
                    break;
                case 'multiselect_parent':
                    self.clsControl = 'font-weight-bold';
                    // self.clsPrev = 'pl-0';
                    break;
                case 'multiselect_subitem':
                    // self.clsParent = 'ml-6';
                    // self.clsControl = 'ml-0';
                    self.clsPrev = 'multiselectsubitem';
                    break;

                // Dialogs              
                case 'dlg_form':
                    self.clsControl = 'position-relative';
                    break;
                case 'dlg_footer':
                    self.clsControl = 'modal-footer justify-content-end pb-6 px-0 pt-2';
                    break;
                case 'dlg_ok':
                    self.clsControl = 'btn bg-white box-shadow-md mx-2 text-secondary text-uppercase fs-5 font-weight-bold px-6 py-2 px-md-6';
                    self.hostElement.nativeElement.type = 'button';
                    break;
                case 'dlg_cancel':
                    self.clsControl = 'btn bg-white box-shadow-md mx-2 text-primary text-uppercase fs-5 font-weight-bold px-6 py-2 px-md-6';
                    self.hostElement.nativeElement.type = 'button';
                    self.hostElement.nativeElement.dataDismiss = 'modal';

                    // const simple: Function = self.renderer.listen(self.hostElement.nativeElement, 'click', (evt) => {
                    //     self.hostElement['dlg'].close();
                    //     simple();
                    // });
                    break;
                case 'dropzone':
                    self.clsControl = 'dropzone needsclick d-flex align-items-center';
                    self.clsChild = 'dz-message text-center w-100 font-weight-bold text-primary m-0';
                    break;

                // Frames                
                case 'box':
                    self.clsControl += ' bg-white box-shadow-sm p-3 border-radius-md ml-3 mb-3 mr-3';
                    break;
                case 'col66':
                    self.clsControl += ' col-12 col-md-6 col-lg-6';
                    break;
                case 'col12':
                    self.clsControl += ' col-12';
                    break;
                case 'w100':
                    self.clsControl += ' w-100';
                    break;

                // Other classes
                default:
                    self.clsControl += ` ${type}`;
            }
        });

        if (self.clsParent1) {
            self.clsParent1 = Array.from(new Set(self.clsParent1.trim().split(' '))).join(' ');
            self.clsParent1.split(' ').filter((cls) => {
                if (cls) {
                    self.renderer.setElementClass(self.ctrl.parentElement.parentElement, cls.trim(), true);
                }
            });
        }
        if (self.clsParent) {
            self.clsParent = Array.from(new Set(self.clsParent.trim().split(' '))).join(' ');
            self.clsParent.split(' ').filter((cls) => {
                if (cls) {
                    self.renderer.setElementClass(self.ctrl.parentElement, cls.trim(), true);
                }
            });
        }
        if (self.clsPrev) {
            self.clsPrev = Array.from(new Set(self.clsPrev.trim().split(' '))).join(' ');
            self.clsPrev.split(' ').filter((cls) => {
                if (cls) {
                    self.renderer.setElementClass(self.ctrl.previousElementSibling, cls.trim(), true);
                }
            });
        }

        self.clsControl = Array.from(new Set(self.clsControl.trim().split(' '))).join(' ');

        if (self.clsControlRem) {
            self.clsControlRem = Array.from(new Set(self.clsControlRem.trim().split(' '))).join(' ');
            self.clsControlRem.split(' ').filter((cls) => {
                if (cls) {
                    self.renderer.setElementClass(self.ctrl, cls.trim(), false);
                }
            });
        }

        if (self.clsControl) {
            self.clsControl.split(' ').filter((cls) => {
                // const prohibitedwords='input date textarea label';
                // new RegExp('\\b' + type.trim() + '\\b').test(prohibitedwords)
                if (cls) {
                    self.renderer.setElementClass(self.ctrl, cls.trim(), true);
                }
            });
        }


        if (self.clsControlAdd) {
            self.clsControlAdd = Array.from(new Set(self.clsControlAdd.trim().split(' '))).join(' ');
            self.clsControlAdd.split(' ').filter((cls) => {
                if (cls) {
                    self.renderer.setElementClass(self.ctrl, cls.trim(), false);
                }
            });
        }

        if (self.clsChild && self.ctrl['children'].length) {
            self.clsChild = Array.from(new Set(self.clsChild.trim().split(' '))).join(' ');
            self.clsChild.split(' ').filter((cls) => {
                if (cls) {
                    self.renderer.setElementClass(self.ctrl['children'][0], cls.trim(), true);
                }
            });
        }
        if (self.clsChildRem) {
            self.clsChildRem = Array.from(new Set(self.clsChildRem.trim().split(' '))).join(' ');
            self.clsChildRem.split(' ').filter((cls) => {
                if (cls) {
                    self.renderer.setElementClass(self.ctrl, cls.trim(), false);
                }
            });
        }
        if (self.clsChildAdd) {
            self.clsChildAdd = Array.from(new Set(self.clsChildAdd.trim().split(' '))).join(' ');
            self.clsChildAdd.split(' ').filter((cls) => {
                if (cls) {
                    self.renderer.setElementClass(self.ctrl, cls.trim(), true);
                }
            });
        }

        if (self.clsNextChild && self.ctrl['children'].length > 1) {
            self.clsNextChild = Array.from(new Set(self.clsNextChild.trim().split(' '))).join(' ');
            self.clsNextChild.split(' ').filter((cls) => {
                if (cls) {
                    self.renderer.setElementClass(self.ctrl['children'][1], cls.trim(), true);
                }
            });
        }

    }
}
