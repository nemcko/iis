export interface VoucherRequestDto {

  id: string,
  name: string,
  location: string,
  dateFrom: string,
  dateTo: string,
  nights: number,
  personsCount: number,
  price: number,
  contributionAmount: number,
  aditionalServices: string,
  aditionalPersons: string,
  author: string,
  authorId: string,
  attachments: string[],
  reasonForReturn: string,
  status: string,
  accepted: boolean
  
}
