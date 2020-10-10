import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  DashboardComponent,
  AnnouncementComponent,
  AnnouncementsComponent,
  EventsComponent,
  AnnouncementEditComponent,
  AnnouncementPreviewComponent,
  ThanksComponent,
  DashboardRootComponent,
  QuestionsComponent,
  QuickAnnouncementsComponent
} from './dashboard';

import {
  VoucherRequestRootComponent,
  VoucherRequestListComponent,
  VoucherRequestComponent,
  VoucherRequestEditComponent,
  FaqComponent,
  ContributionResolver,
  VoucherAllowedGuard,
  VoucherRequestListAllComponent
} from './holiday-voucher';

import { RatingsComponent } from './ror/components/ratings/ratings.component';
import { RatingComponent } from './ror/components/rating/rating.component';
import { RatingEditComponent } from './ror/components/rating-edit/rating-edit.component';
import { RorRootComponent } from './ror/components/ror-root.component';

import {
  CanDeactivateGuard,
  UserResolver,
} from './shared';

import {
  EpRootComponent,
  EpDetailComponent,
  EpListComponent,
  EpCertificatesComponent,
  EpCoursesComponent,
  EpPastgoalsComponent,
  EpMeetingsComponent, EpMeetingComponent,
  EpCloseoutsComponent, EpCloseoutComponent,
  EpInterviewsComponent,EpInterviewComponent,
  EpReviewsComponent,EpReviewComponent,
  EpProjectsComponent, EpProjectComponent,EpProevalComponent,
  EpTlcardComponent,
} from './eportal';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardRootComponent,
    resolve: {
      UserResolver
    },
    children: [
      {
        path: '',
        component: DashboardComponent,
        resolve: {
          UserResolver
        }
      },
      {
        path: 'oznam',
        component: AnnouncementComponent,
        resolve: {
          UserResolver
        }
      },
      {
        path: 'oznam/:id',
        component: AnnouncementComponent,
        resolve: {
          UserResolver
        }
      },
      {
        path: 'oznam/:id/:response',
        component: AnnouncementComponent,
        resolve: {
          UserResolver
        }
      },
      {
        path: 'oznam-edit/:id',
        component: AnnouncementEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: 'oznam-create',
        component: AnnouncementEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: 'oznam-create/:type',
        component: AnnouncementEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: 'oznam-preview',
        component: AnnouncementPreviewComponent,
        resolve: {
          UserResolver
        }
      },
      {
        path: 'oznamy',
        component: AnnouncementsComponent,
        resolve: {
          UserResolver
        }
      },
      {
        path: 'oznamy/:category',
        component: AnnouncementsComponent,
        resolve: {
          UserResolver
        }
      },
      {
        path: 'events',
        component: EventsComponent,
        resolve: {
          UserResolver
        }
      },
      {
        path: 'podakovania',
        component: ThanksComponent,
        resolve: {
          UserResolver
        }
      },
      {
        path: 'otazky',
        component: QuestionsComponent,
        resolve: {
          UserResolver
        }
      },
      {
        path: 'rychle-oznamy',
        component: QuickAnnouncementsComponent,
        resolve: {
          UserResolver
        }
      }
    ]
  },
  {
    path: 'holiday-voucher',
    component: VoucherRequestRootComponent,
    resolve: {
      UserResolver,
      ContributionResolver
    },
    children: [
      {
        path: '',
        component: VoucherRequestListComponent,
        resolve: {
          UserResolver,
          ContributionResolver
        }
      }, {
        path: 'faq',
        component: FaqComponent,
        resolve: {
          UserResolver
        }
      }, {
        path: 'vouchers',
        component: VoucherRequestListComponent,
        resolve: {
          UserResolver,
          ContributionResolver
        }
      }, {
        path: 'vouchers-all',
        component: VoucherRequestListAllComponent,
        resolve: {
          UserResolver
        }
      }, {
        path: 'vouchers-all/:category',
        component: VoucherRequestListAllComponent,
        resolve: {
          UserResolver
        }
      }, {
        path: 'voucher/:id',
        component: VoucherRequestComponent,
        resolve: {
          UserResolver
        }
      }, {
        path: 'voucher-edit/:id',
        component: VoucherRequestEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      }, {
        path: 'voucher-create',
        component: VoucherRequestEditComponent,
        canActivate: [VoucherAllowedGuard],
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      }
    ]
  },
  {
    path: 'ror',
    component: RorRootComponent,
    resolve: {
      UserResolver
    },
    children: [
      {
        path: '',
        component: RatingsComponent,
        resolve: {
          UserResolver
        }
      }, {
        path: 'ratings',
        component: RatingsComponent,
        resolve: {
          UserResolver
        }
      }, {
        path: 'rating/:id',
        component: RatingComponent,
        resolve: {
          UserResolver
        }
      }, {
        path: 'rating-create',
        component: RatingEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      }, {
        path: 'rating-edit/:id',
        component: RatingEditComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      }
    ]
  },
  {
    path: 'portal',
    component: EpRootComponent,
    resolve: {
      UserResolver
    },
    children: [
      {
        path: ':id',
        component: EpDetailComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':id/detail',
        component: EpDetailComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':id/list',
        component: EpListComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':id/cert',
        component: EpCertificatesComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':id/projects',
        component: EpProjectsComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':idl/projects/:id',
        component: EpProjectComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: 'project/:id',
        component: EpProjectComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':idl/project/:idp/evaluations/:id',
        component: EpProevalComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':id/courses',
        component: EpCoursesComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':id/meetings',
        component: EpMeetingsComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':idl/meetings/:id',
        component: EpMeetingComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: 'meeting/:id',
        component: EpMeetingComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':idl/interviews/:id',
        component: EpInterviewsComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':idl/interviews/:id/targets',
        component: EpInterviewComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':idl/interviews/:id/evaluated',
        component: EpInterviewComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':idl/interviews/:id/evaluator',
        component: EpInterviewComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':idl/interviews/:id/jointevaluation',
        component: EpInterviewComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: 'interview/:id',
        component: EpInterviewComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':id/closeouts',
        component: EpCloseoutsComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':idl/closeouts/:id',
        component: EpCloseoutComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: 'closeout/:id',
        component: EpCloseoutComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':id/reviews',
        component: EpReviewsComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':idl/reviews/:id',
        component: EpReviewComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: 'review/:id',
        component: EpReviewComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':id/pastgoals',
        component: EpPastgoalsComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      },
      {
        path: ':id/tlcard',
        component: EpTlcardComponent,
        // canDeactivate: [CanDeactivateGuard],
        resolve: {
          UserResolver
        }
      }
    ]
  }




]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard
  ]
})
export class AppRoutingModule {
}
