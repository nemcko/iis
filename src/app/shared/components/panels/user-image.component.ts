import { Component, Input } from '@angular/core';

/**
 * Component: Miniatúra fotografie používateľa/ Monogram
 */
@Component({
  selector: 'user-image',
  templateUrl: './user-image.component.html'
})
export class UserImageComponent {
  @Input() public urlImage: string;
  @Input('cardName')
  public set cardName(val: string) {
    if (val) {
      const initialArr = val.split(' ').map((n) => n[0]);
      const init = initialArr.length > 1 ? `${initialArr[0]}${initialArr[initialArr.length - 1]}` : initialArr[0];
      this.initials = init.toUpperCase();
      this.currColor = this.colors[Math.round(this.initials.charCodeAt(0) / (255 / this.colors.length))];
    }
  }
  @Input() public imgsize:number = 120;
  @Input() public ifontsize:number = 50;
  public initials: string = '';
  public currColor: string = 'bg-gray';
  public err: boolean = false;
  protected elClass: string;
  private colors = [
    'bg-gray',
    'bg-blue',
    'bg-green',
    'bg-pink',
    'bg-violet',
    'bg-orange',
    'bg-blue-light',
    'bg-pink-light',
    'bg-green-light'
  ]

  public updatePanel(): void {
    if (this.urlImage) {
      this.err = true;
    }
  }

  public getStyleSize(width: string): string {
    return `${width}px !important`;
  }
}