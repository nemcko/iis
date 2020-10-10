import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'keepHtml'
})
export class EscapeHtmlPipe implements PipeTransform {
  public constructor(private sanitizer: DomSanitizer) {
  }

  public transform(content):any {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
