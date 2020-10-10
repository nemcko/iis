import { Component, OnInit, Input } from '@angular/core';
import { ApplicationsService } from 'src/app/shared/services/applications.service';
import { ApplicationDto } from 'src/app/shared/objects/dtos/application-dto';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html'
})
export class ApplicationsComponent implements OnInit {

  @Input() public listStyle: string = 'navbar';

  public aplikacieList: ApplicationDto[] = null;
  public panelExpanded: boolean = false;

  public constructor(
    private aplikacieService: ApplicationsService
  ) { }

  public ngOnInit(): void {

    this.aplikacieService.getAplikacie().subscribe(
      (data: ApplicationDto[]) => {
        this.aplikacieList = data;
      },
      (error) => {
        console.error(error);
      }
    );

  }

  public togglePanel(): void {
    this.panelExpanded = !this.panelExpanded;
  }

}
