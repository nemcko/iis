import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ListboxModule } from 'primeng/listbox';
import { EditorModule as PrimeEditorModule } from 'primeng/editor';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { A2Edatetimepicker } from 'ng2-eonasdan-datetimepicker';
import { ToastrModule } from 'ngx-toastr';
import { TagInputModule } from 'ngx-chips';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Select2Module } from 'ng2-select2';
import { TabViewModule } from 'primeng/primeng';
import { OverlayPanelModule } from 'primeng/overlaypanel';


import { UserComponent } from './components/partials/app-header/user.component';
import { AppFooterComponent } from './components/partials/app-footer/app-footer.component';
import { AppHeaderComponent } from './components/partials/app-header/app-header.component';
import { ApplicationsComponent } from './components/partials/applications/applications.component';
import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { AlertModalComponent } from './components/modals/alert-modal/alert-modal.component';
import { YesnoModalComponent } from './components/modals/yesno-modal/yesno-modal.component';
import { PromptModalComponent } from './components/modals/prompt-modal/prompt-modal.component';
import { PromptNumberModalComponent } from './components/modals/prompt-number-modal/prompt-number-modal.component';
import { LoaderComponent } from './components/loader/loader.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoaderBlockComponent } from './components/loader/loader-block.component';
import { AppdlgComponent } from './components/modals/appdlg/dlg.component';
import {
  CardListComponent,
  SearchListComponent,
  SearchPaginationComponent,
  SimpleListComponent
} from './components/lists';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab.component';
import {
  FormFldComponent,
  FormRowComponent,
  FormBoxComponent,
  FormSelectComponent, FormMultiSelectComponent, FormSelectUsersComponent,
  FormSliderComponent,
  FormTabstripComponent,
} from './components/frmflds';
import { LevelBarComponent } from './components/panels/levelbar.component';
import { UserImageComponent } from './components/panels/user-image.component';

import { StopPropagationDirective } from './objects/directives/propagation-stop.directive';
import { PreventDefaultDirective } from './objects/directives/prevent-default.directive';
import { MinDirective } from './objects/directives/min-validator.directive';
import { MaxDirective } from './objects/directives/max-validator.directive';
import { ElementAutoHeight } from './objects/directives/autoheight.directive';
import { FocusDirective } from './objects/directives/focus.directive';
import { CardColorDirective } from './objects/directives/cardcolor.directive';
import { ClassesDirective } from './objects/directives/classes.directive';
import { SliderTooltipDirective } from './objects/directives/slitooltip.directive';
import { WorkflowPanelDirective } from './objects/directives/wfpanel.directive';

import { CrlfPipe } from './objects/pipes/crlf.pipe';
import { UrlDecodePipe } from './objects/pipes/url-decode.pipe';
import { FilenamePipe } from './objects/pipes/filename.pipe';
import { EscapeHtmlPipe } from './objects/pipes/keep-html.pipe';
import { UrlEncodePipe } from './objects/pipes/url-encode.pipe';
import { EmptyPipe } from './objects/pipes/empty.pipe';
import { MenaPipe } from './objects/pipes/mena.pipe';
import { OsobyPipe } from './objects/pipes/osoby.pipe';
import { NociPipe } from './objects/pipes/noci.pipe';
import { ReversePipe } from './objects/pipes/reverse.pipe';
import { FilterPipe } from './objects/pipes/filter.pipe';
import { ArrayToStringPipe } from './objects/pipes/arrtostr.pipe';
import { SafePipe } from './objects/pipes/safe.pipe';

import { CanDeactivateGuard } from './objects/resolvers/can-deactivate.guard';
import { UserResolver } from './objects/resolvers/user.resolver';

import { DataService } from './services/data-server.service';
import { ApplicationsService } from './services/applications.service';
import { GolemService } from './services/golem.service';
import { UserService } from './services/user.service';


const MODULES = [
  CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
  MultiSelectModule, DropdownModule, SliderModule, InputSwitchModule, ListboxModule, Select2Module, OverlayPanelModule,
  HttpClientModule, BrowserAnimationsModule, A2Edatetimepicker, TagInputModule, DropzoneModule, EditorModule,
  ToastrModule,
  TabViewModule,
  PrimeEditorModule,
];
const COMPONENTS = [
  UserComponent,
  AppFooterComponent,
  AppHeaderComponent,
  ApplicationsComponent,
  ConfirmationModalComponent,
  AlertModalComponent,
  YesnoModalComponent,
  PromptModalComponent,
  PromptNumberModalComponent,
  LoaderComponent,
  SpinnerComponent,
  LoaderBlockComponent,
  AppdlgComponent,
  SimpleListComponent, CardListComponent, SearchListComponent, SearchPaginationComponent,
  TabsComponent, TabComponent,
  FormFldComponent, FormRowComponent, FormBoxComponent, FormSelectComponent, FormMultiSelectComponent, FormSliderComponent, FormTabstripComponent, FormSelectUsersComponent,
  LevelBarComponent,
  // WorkflowPanel,
  UserImageComponent,
];
const DIRECTIVES = [
  StopPropagationDirective,
  PreventDefaultDirective,
  MinDirective,
  MaxDirective,
  ElementAutoHeight,
  FocusDirective,
  CardColorDirective,
  ClassesDirective,
  SliderTooltipDirective,
  WorkflowPanelDirective,
];
const PIPES = [
  CrlfPipe,
  UrlDecodePipe,
  FilenamePipe,
  EscapeHtmlPipe,
  UrlEncodePipe,
  EmptyPipe,
  MenaPipe,
  OsobyPipe,
  NociPipe,
  ReversePipe,
  FilterPipe,
  ArrayToStringPipe,
  SafePipe,
];
const ENTRY_COMPONENTS = [
  ConfirmationModalComponent,
  AlertModalComponent,
  YesnoModalComponent,
  PromptModalComponent,
  PromptNumberModalComponent,
]
const PROVIDERS = [
  ApplicationsService,
  DataService,
  GolemService,
  UserService,
  CanDeactivateGuard,
  UserResolver,
  NgbActiveModal,
];

@NgModule({
  imports: [
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
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
    NgbModule,
    ...MODULES,
    ...PIPES,
    ...COMPONENTS,
    ...DIRECTIVES,
  ],
  entryComponents: [
    ...ENTRY_COMPONENTS
  ]
}) export class SharedModule { }

