import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {

  @Input() public key: string;

  public loaderClass: string = 'fullpage-preloader';

  public constructor(
    private loader: LoaderService
  ) {

  }

  public ngOnInit(): void {
    this.loader.isVisible.subscribe(
      (data: string[]) => {
        this.loaderClass = data.includes(this.key) ? 'fullpage-preloader active' : 'fullpage-preloader';
      }
    )
  }

}
