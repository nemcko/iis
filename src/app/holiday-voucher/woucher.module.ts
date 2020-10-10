import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { VoucherRequestRootComponent } from './components/voucher-request-root.component';
import { VoucherRequestEditComponent } from './components/voucher-request-edit/voucher-request-edit.component';
import { VoucherRequestListComponent } from './components/voucher-request-list/voucher-request-list.component';
import { FaqComponent } from './components/faq/faq.component';
import { VoucherRequestComponent } from './components/voucher-request/voucher-request.component';
import { VoucherRequestListAllComponent } from './components/voucher-request-list-all/voucher-request-list-all.component';

import { HolidayVoucherService } from './services/holiday-voucher.service';
import { ContributionResolver } from './objects/resolvers/contribution.resolver';
import { VoucherAllowedGuard } from './objects/resolvers/voucher-allowed.guard';

const MODULES = [
  CommonModule,
];
const COMPONENTS = [
  VoucherRequestRootComponent,
  VoucherRequestEditComponent,
  VoucherRequestListComponent,
  FaqComponent,
  VoucherRequestComponent,
  VoucherRequestListAllComponent,
];
const DIRECTIVES = [
];
const PIPES = [
];
const ENTRY_COMPONENTS = [
]
const PROVIDERS = [
  HolidayVoucherService,
  ContributionResolver,
  VoucherAllowedGuard,
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
}) export class WoucherModule { }
