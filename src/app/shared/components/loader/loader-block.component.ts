import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader-block',
  templateUrl: './loader-block.component.html'
})
export class LoaderBlockComponent implements OnInit {

  @Input() public key: string;

  public loaderClass: string = 'b-preloader active';

  public constructor(
    private loader: LoaderService
  ) {

  }

  public ngOnInit(): void {
    //console.debug('loaderClass ... ', this.loaderClass);
    //console.debug('loader key ... ', this.key);
    this.loader.isVisible.subscribe(
      (data: string[]) => {
        //console.debug('loader visible ... ', data);
        this.loaderClass = data.includes(this.key) ? 'b-preloader active' : 'b-preloader';
      }
    )
  }

}
