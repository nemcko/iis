import { VoucherRequestDto } from "src/app/holiday-voucher/objects/dtos/voucher-request-dto";

export class VoucherRequestModel {

  id: string;
  name: string;
  location: string;
  dateFrom: string;
  dateTo: string;
  dateFromTo: string;
  nights: number;
  personsCount: number;
  price: number;
  contributionAmount: number;
  aditionalServices: string;
  aditionalPersons: string;
  attachments: string[];
  author: string;
  authorId: string;
  reasonForReturn: string;
  status: string;
  accepted: boolean;

  constructor (obj?:VoucherRequestDto) {

    this.id = obj && obj.id || null;
    this.name = obj && unescape(obj.name) || '';
    this.location = obj && unescape(obj.location) || '';
    this.dateFrom = obj && obj.dateFrom || '';
    this.dateTo = obj && obj.dateTo || '';
    this.nights = obj && obj.nights || 0;
    this.personsCount = obj && obj.personsCount || 1;
    this.price = obj && obj.price || null;
    this.contributionAmount = obj && obj.contributionAmount || null;
    this.aditionalServices = obj && unescape(obj.aditionalServices) || '';
    this.aditionalPersons = obj && unescape(obj.aditionalPersons) || '';
    this.attachments = obj && obj.attachments || [];
    this.author = obj && obj.author || '';
    this.authorId = obj && obj.authorId || '';
    this.reasonForReturn = obj && unescape(obj.reasonForReturn) || '';
    this.status = obj && obj.status || '';
    this.accepted = obj && obj.accepted || false;
  }

}
