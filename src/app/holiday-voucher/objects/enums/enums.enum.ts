
export enum VoucherRequestStatusList {
  DRAFT = 'DRAFT',
  ACCEPTED = 'ACCEPTED',
  PAID = 'PAID',
  DECLINED = 'DECLINED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  RETURNED = 'RETURNED',
  IN_PROCESS = 'IN_PROCESS',

}

export enum VoucherRequestStatusListDesc {
  DRAFT = 'Koncept',
  ACCEPTED = 'Schválené',
  PAID = 'Vyplatené',
  DECLINED = 'Zamietnuté',
  PENDING_APPROVAL = 'Čakajúce na schválenie',
  RETURNED = 'Na prepracovaní',
  IN_PROCESS = 'Prebieha spracovanie',
}

export enum VoucherRequestStatusColorList {
  DRAFT = '',
  ACCEPTED = 'text-secondary',
  PAID = 'text-primary',
  DECLINED = 'text-danger',
  PENDING_APPROVAL = 'text-orange',
  RETURNED = 'text-tertiary',
  IN_PROCESS = 'text-warning'
}

export enum VoucherRequestWFActions {
  SAVE = 'save',
  SEND_TO_HR = 'ACT_ODOSLAT',
  ACCEPT = 'ACT_SCHVALIT',
  RETURN = 'ACT_VRATIT',
  DECLINE = 'ACT_ZAMIETNUT',
  PAY = 'ACT_VYPLATIT',
  DELETE = 'ACT_DELETE',
  EDIT = 'EDIT'
}