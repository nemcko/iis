import { RecipientDto } from "../../../shared/objects/dtos/recipient-dto";

export interface AnnouncementDto {

    id: string,
    attachmentUrl: string[],
    author: string,
    authorFN: string,
    content: string,
    created: string,
    category: string[],
    calendarPlace: string,
    calendarFrom: string,
    calendarTo: string,
    calendarShowPersonal: boolean,
    calendarShowCompany: boolean,
    calendarBlocker: boolean,
    confirmReading: boolean,
    datePublishing: string,
    description: string,
    docType: string,
    draft: boolean,
    imgUrl: string
    numberOpen: number,
    numberUsers: number,
    openAttachment: boolean,
    privileges: string[],
    recipients: RecipientDto[],
    sendNotification: boolean,
    bigText: boolean,
    title: string,

}
