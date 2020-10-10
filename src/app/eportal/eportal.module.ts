import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { EpRootComponent } from './components/eportal-root.component';
import { EpDetailComponent } from './components/detail/ep-detail.component';
import { EpListComponent } from './components/detail/ep-list.component';
import { EpCertificatesComponent } from './components/certificates/ep-certificates.component';
import { EpProjectsComponent } from './components/projects/ep-projects.component';
import { EpProjectComponent } from './components/projects/ep-project.component';
import { EpProevalComponent } from './components/projects/ep-proeval.component';
import { EpProlistComponent } from './components/projects/ep-prolist.component';
import { EpCoursesComponent } from './components/courses/ep-courses.component';
import { EpMeetingsComponent } from './components/meetings/ep-meetings.component';
import { EpMeetingComponent } from './components/meetings/ep-meeting.component';
import { EpCloseoutsComponent } from './components/closeouts/ep-closeouts.component';
import { EpCloseoutComponent } from './components/closeouts/ep-closeout.component';
import { EpReviewsComponent } from './components/reviews/ep-reviews.component';
import { EpReviewComponent } from './components/reviews/ep-review.component';
import { EpPastgoalsComponent } from './components/pastgoals/ep-pastgoals.component';
import { EpInterviewsComponent } from './components/interview/ep-interviews.component';
import { EpInterviewComponent } from './components/interview/ep-interview.component';
import { EpInterviewTargetsComponent } from './components/interview/ep-interview-targets.component';
import { EpInterviewEvaluateComponent } from './components/interview/ep-interview-evaluate.component';
import { EpTlcardComponent } from './components/detail/ep-tlcard.component';

import { DlgCourseComponent } from './components/courses/dlgcourse.component';
import { DlgCertComponent } from './components/certificates/dlgcert.component';
import { DlgPinfoComponent } from './components/dialogs/dlgpinfo.component';
import { DlgAddThemeComponent } from './components/meetings/dlgtheme.component';
import { DlgAddTargetComponent } from './components/interview/dlgtarget.component';
import { DlgMsgCertComponent } from './components/certificates/dlgmsgcert.component';
import { DlgMsgCoursComponent } from './components/courses/dlgmsgcourses.component';
import { DlgMsgInstructionComponent } from './components/dialogs/dlgmsginstruction.component';
import { DlgSelectUsers } from './components/dialogs/dlgselusers.component';

const MODULES = [
  CommonModule,
];
const COMPONENTS = [
  EpRootComponent,
  EpDetailComponent,
  EpListComponent,
  EpCertificatesComponent,
  EpProjectsComponent, EpProjectComponent, EpProevalComponent, EpProlistComponent,
  EpCoursesComponent, DlgCourseComponent,
  EpMeetingsComponent, EpMeetingComponent,
  EpCloseoutsComponent, EpCloseoutComponent,
  EpInterviewsComponent, EpInterviewComponent, EpInterviewTargetsComponent, EpInterviewEvaluateComponent,
  EpReviewsComponent, EpReviewComponent,
  DlgCertComponent, DlgMsgCertComponent, DlgMsgCoursComponent, DlgPinfoComponent, DlgAddThemeComponent, DlgAddTargetComponent, DlgMsgInstructionComponent, DlgSelectUsers,
  EpPastgoalsComponent,
  EpTlcardComponent,
];
const DIRECTIVES = [
];
const PIPES = [
];
const ENTRY_COMPONENTS = [
  DlgCourseComponent, DlgCertComponent, DlgMsgCertComponent, DlgMsgCoursComponent, DlgPinfoComponent, DlgAddThemeComponent, DlgAddTargetComponent, DlgMsgInstructionComponent, DlgSelectUsers,
  EpInterviewTargetsComponent, EpInterviewEvaluateComponent,
]
const PROVIDERS = [
];

export let epInjector: Injector;

@NgModule({
  imports: [
    SharedModule,
    ...MODULES,
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES,
    ...ENTRY_COMPONENTS,
    ...DIRECTIVES,
  ],
  providers: [
    ...PROVIDERS
  ],
  exports: [
    ...MODULES,
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ]
}) export class EpModule {
  public constructor(injector: Injector) {
    epInjector = injector;
  }
}
