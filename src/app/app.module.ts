import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared';
import { DashboardModule } from './dashboard';
import { WoucherModule } from './holiday-voucher';
import { EpModule } from './eportal';

import { RatingsService } from './ror/services/ratings.service';
import { RatingsComponent } from './ror/components/ratings/ratings.component';
import { RatingEditComponent } from './ror/components/rating-edit/rating-edit.component';
import { RatingComponent } from './ror/components/rating/rating.component';
import { RorRootComponent } from './ror/components/ror-root.component';


@NgModule({
  declarations: [
    AppComponent,
    RatingsComponent,
    RatingEditComponent,
    RatingComponent,
    RorRootComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule, 
    DashboardModule,
    WoucherModule,
    EpModule,
  ],
  entryComponents: [
  ],
  providers: [
    RatingsService,
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
