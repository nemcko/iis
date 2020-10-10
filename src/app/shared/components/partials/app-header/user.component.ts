import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/shared/objects/models/user-model';
import { EpService } from 'src/app/eportal/services/eportal.service';
import { UserContextService } from 'src/app/eportal/services/user-context.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {
  public userId: string;
  public uzivatel: UserModel;

  public constructor(
    public usrCtx: UserContextService,
    private router: Router,
    private eportalSvc: EpService,
  ) { }

  public ngOnInit(): void {
    const user = this.eportalSvc.getData('uzivatel');
    this.userId = user.userId;
    this.uzivatel = new UserModel(user);
  }

  public selectMenu(panel: any, key: string): void {
    panel.hide();
    this.router.navigate(['/portal', this.userId, key]);
  }
}
