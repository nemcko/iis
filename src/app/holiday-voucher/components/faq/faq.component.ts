import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PromptModalComponent } from 'src/app/shared/components/modals/prompt-modal/prompt-modal.component';
import { HolidayVoucherService } from 'src/app/holiday-voucher/services/holiday-voucher.service';
import { FaqDto } from 'src/app/holiday-voucher/objects/dtos/faq-dto';
import { ToastrService } from 'ngx-toastr';
import { DialogConstants } from 'src/app/shared/components/modals/constants';
import { HolidayVoucherConstants } from '../../objects/values/constants';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html'
})
export class FaqComponent implements OnInit {

  search: string = '';
  faqList: FaqDto[] = null;
  private expandedId: string[] = [];

  constructor(
    private ngbModal: NgbModal,
    private voucherService: HolidayVoucherService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.loadRecords();
  }

  isExpanded(id: string): boolean {
    return this.expandedId.includes(id);
  }

  toggleExpanded(id: string):void {
    if (!this.isExpanded(id)) {
      this.expandedId.push(id);
    } else {
      this.expandedId.splice(this.expandedId.indexOf(id), 1);
    }
  }

  loadRecords():void {
    this.voucherService.getFaqList(HolidayVoucherConstants.LIST_VOUCHER_FAQ_COUNT, this.search).subscribe(
      (data: FaqDto[]) => {
        this.faqList = data;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  addQuestion():void {
    /* modalny dialog na zadanie otazky */
    const modalInstance: NgbModalRef = this.ngbModal.open(PromptModalComponent, { size: 'lg', centered: true });

    // vstupne parametre
    modalInstance.componentInstance.dialogData = {
      title: 'Otázka k rekreačným poukazom',
      message: [],
      cancel: DialogConstants.DIALOG_DEFAULT_CANCEL,
      ok: 'Odoslať'
    };

    modalInstance.result
      .then(
        (data) => {
          if (data) {
            /* potvrdime dialog */
            this.voucherService.addQuestion(data).subscribe(
              () => {
                this.toastr.success('Ďakujeme za Vašu otázku.');
              },
              (error) => {
                this.toastr.error(error);
                console.error(error);
              }
            );
          } else {
            /* zamietneme dialog */

          }

        },
        () => {
          /* zavrieme dialog cez dismiss */

        }
      )
  }

}
