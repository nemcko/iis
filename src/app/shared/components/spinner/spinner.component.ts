import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

/**
 * Component: Kurzor pre čakanie
 */
@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  public bShow: boolean = false;

  public constructor(private loader: LoaderService) { }

  public ngOnInit(): void {
    this.loader.isActive.subscribe(
      async (show: boolean) => {
        this.bShow = await show;
      }
    )
  }

}