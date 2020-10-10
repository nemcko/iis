import { Component, AfterViewInit, OnDestroy, Input, Output, EventEmitter,  } from '@angular/core';
//import * as tinymce from 'tinymce';

declare let jQuery: any;
declare var tinymce: any;

@Component({
  selector: 'simple-tiny',
  templateUrl: './simple-tiny.component.html'
})
export class SimpleTinyComponent implements AfterViewInit, OnDestroy {

  @Input() elementId: String;
  @Input() initialContent: string;
  @Input() readOnly: boolean;
  @Input() imageUploadURL: string;
  @Input() toolbar: string;
  @Output() onSave = new EventEmitter<any>();

  editor:any;
  content:string;
  buttonVisibility: boolean = true;

  constructor() { }

  

  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      theme: 'modern',
      plugins: ['image', 'imagetools', 'link', 'paste', 'table', 'lists', 'noneditable','textcolor', 'code', 'save'],
      skin_url: 'assets/scripts/tinymce/skins/lightgray',
      language_url : 'assets/scripts/tinymce/langs/sk.js',
      menubar: true,
      paste_data_images: true,
      image_advtab: true,
      height: "800",
      indentation: '70px',
      elementpath: false,
      statusbar: false,
      readonly: this.readOnly,
      branding: false,
      custom_undo_redo_levels: 10,
      toolbar: this.toolbar,

      setup: editor => {
        this.editor = editor;
      },

      automatic_uploads:true,
      images_upload_url: this.imageUploadURL,
      
      init_instance_callback: editor => {
        this.editor.content = this.initialContent;
        // this.content = editor.getContent();
      },

      save_onsavecallback: editor => {
        this.editor = editor;
        this.content = editor.getContent();
        this.onSave.emit(this.content);
       // tinymce.activeEditor.setMode('readonly');
        this.buttonVisibility=true;
       // jQuery('.mce-container-body .mce-flow-layout').css('display', 'none'); //ak nie je refresh treba tam toto aby sa schovala lista
       // this.refresh();
      },
    });

  }

  ngOnDestroy() {
    tinymce.remove(this.editor);
  }

  onChangeVisibility() {
    this.buttonVisibility=false;
    tinymce.activeEditor.setMode('design');
    jQuery('.mce-container-body .mce-flow-layout').css('display', 'block');
  }

  onPrint() {
    tinymce.activeEditor.execCommand('mcePrint');
  }

  refresh(): void {
    window.location.reload();
  }

}
