import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { AnnouncementsDetailComponent } from './components/announcements/announcements-detail.component';
import { DashboardComponent } from './components/homepage/dashboard.component';
import { WidgetAnnouncementsListComponent } from './components/widgets/widget-announcements-list/widget-announcements-list.component';
import { WidgetAnnouncementsDetailComponent } from './components/widgets/widget-announcements-list/widget-announcements-detail.component';
import { AnnouncementComponent } from './components/announcement/announcement.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { VotingComponent } from './components/announcement/voting.component';
import { EventsComponent } from './components/events/events.component';
import { AnnouncementEditComponent } from './components/announcement-edit/announcement-edit.component';
import { AnnouncementPreviewComponent } from './components/announcement-preview/announcement-preview.component';
import { ThanksComponent } from './components/thanks/thanks.component';

import { WidgetCareerListComponent } from './components/widgets/widget-career-list/widget-career-list.component';
import { WidgetEventsListComponent } from './components/widgets/widget-events-list/widget-events-list.component';
import { WidgetQuickAnnouncementComponent } from './components/widgets/widget-quick-announcement/widget-quick-announcement.component';
import { WidgetQuestionComponent } from './components/widgets/widget-question/widget-question.component';
import { WidgetForumListComponent } from './components/widgets/widget-forum-list/widget-forum-list.component';
import { WidgetForumDetailComponent } from './components/widgets/widget-forum-list/widget-forum-detail.component';
import { WidgetThanksComponent } from './components/widgets/widget-thanks/widget-thanks.component';

import { SimpleTinyComponent } from './components/simple-tiny/simple-tiny.component';
import { MoreArticlesComponent } from './components/more-articles/more-articles.component';
import { EmoticonsPipe } from './objects/pipes/emoticons.pipe';
import { ForumComponent } from './components/forum/forum.component';
import { CareerListComponent } from './components/career-list/career-list.component';
import { RecipientsSelectorComponent } from './components/recipients-selector/recipients-selector.component';
import { DashboardRootComponent } from './components/dashboard-root.component';
import { WidgetQuestionHrComponent } from './components/widgets/widget-question-hr/widget-question-hr.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { QuickAnnouncementsComponent } from './components/quick-announcements/quick-announcements.component';

import { AnnouncementDataService } from './services/announcement-data.service';
import { AnnouncementsService } from './services/announcements.service';
import { CareerService } from './services/career.service';
import { ForumService } from './services/forum.service';

const MODULES = [
  CommonModule,
];
const COMPONENTS = [
  AnnouncementsDetailComponent,
  DashboardComponent,
  WidgetAnnouncementsListComponent,
  WidgetAnnouncementsDetailComponent,
  AnnouncementComponent,
  AnnouncementsComponent,
  VotingComponent,
  EventsComponent,
  AnnouncementEditComponent,
  AnnouncementPreviewComponent,
  ThanksComponent,

  WidgetCareerListComponent,
  WidgetEventsListComponent,
  WidgetQuickAnnouncementComponent,
  WidgetQuestionComponent,
  WidgetForumListComponent,
  WidgetForumDetailComponent,
  WidgetThanksComponent,

  SimpleTinyComponent,
  MoreArticlesComponent,
  ForumComponent,
  CareerListComponent,
  RecipientsSelectorComponent,
  DashboardRootComponent,
  WidgetQuestionHrComponent,
  QuestionsComponent,
  QuickAnnouncementsComponent,


];
const DIRECTIVES = [
];
const PIPES = [
  EmoticonsPipe,
];
const ENTRY_COMPONENTS = [
]
const PROVIDERS = [
  AnnouncementDataService,
  AnnouncementsService,
  CareerService,
  ForumService,
];

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
}) export class DashboardModule { }
