import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable, from } from 'rxjs';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '../../components/modals/confirmation-modal/confirmation-modal.component';
import { DialogConstants } from '../../components/modals/constants';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<any> {

  public constructor(
    private ngbModal: NgbModal
  ) { }

  public canDeactivate(
    form: any
  ): Observable<boolean> | boolean {

    if (form.isDirty()) {

      const modalInstance: NgbModalRef = this.ngbModal.open(ConfirmationModalComponent, { size: 'lg', centered: true });

      // vstupne parametre
      modalInstance.componentInstance.dialogData = {
        message: ['Naozaj si prajete zahodiť zmeny vykonané v príspevku?'],
        cancel: DialogConstants.DIALOG_DEFAULT_CANCEL,
        ok: 'Zahodiť'
      };

      return from<Promise<any>>(modalInstance.result.then(
        (result) => {
          // v pripade potvrdenia vrátime true
          return result;
        },
        () => {
          // ked je dialog zatvoreny cez dismiss, vrátime false
          return false;
        }
      ))

    }
    else {
      return true;
    }

  }
}