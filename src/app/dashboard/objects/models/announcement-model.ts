import { AnnouncementDto } from "src/app/dashboard/objects/dtos/announcement-dto";
import { RecipientDto } from "src/app/dashboard/objects/dtos/recipient-dto";
import { DocumentType } from "src/app/dashboard/objects/enums/enums.enum";

export class AnnouncementModel {

    id: string;
    attachmentUrl: string[];
    author: string;
    authorFN: string;
    content: string;
    created: string;
    category: string[];
    calendarPlace: string;
    calendarFrom: string;
    calendarTo: string;
    calendarShowPersonal: boolean;
    calendarShowCompany: boolean;
    calendarBlocker: boolean;
    confirmReading: boolean;
    datePublishing: string;
    description: string;
    docType: string;
    draft: boolean;
    imgUrl: string;
    numberOpen: number;
    numberUsers: number;
    openAttachment: boolean;
    privileges: string[];
    recipients: RecipientDto[];
    sendNotification: boolean;
    bigText: boolean;
    title: string;

    constructor(obj?: AnnouncementDto) {
        this.id = obj && obj.id || null;
        this.attachmentUrl = obj && obj.attachmentUrl || [];
        this.author = obj && obj.author || "";
        this.authorFN = obj && obj.authorFN || "";
        this.title = obj && obj.title || "";
        //this.content = obj && obj.content && decodeURIComponent(obj.content) || "";
        this.content = obj && obj.content && unescape(obj.content) || "";
        this.created = obj && obj.created || "";
        this.category = obj && obj.category || [];
        this.calendarPlace = obj && obj.calendarPlace || "";
        this.calendarFrom = obj && obj.calendarFrom || "";
        this.calendarTo = obj && obj.calendarTo || "";
        this.calendarShowPersonal = obj && obj.calendarShowPersonal || false;
        this.calendarShowCompany = obj && obj.calendarShowCompany || false;
        this.calendarBlocker = obj && obj.calendarBlocker || false;
        this.datePublishing = obj && obj.datePublishing || "";
        this.description = obj && obj.description || "";
        this.docType = obj && obj.docType || DocumentType.ANNOUNCEMENT;
        this.draft = obj && obj.draft;
        this.sendNotification = obj && obj.sendNotification || false;
        this.bigText = obj && obj.bigText || false;
        this.openAttachment = obj && obj.openAttachment || false;
        this.confirmReading = obj && obj.confirmReading || false;
        this.recipients = obj && obj.recipients || [];
        this.imgUrl = obj && obj.imgUrl || "";
        this.privileges = obj && obj.privileges || [];
        this.numberOpen = obj && obj.numberOpen || 0;
        this.numberUsers = obj && obj.numberUsers || 0;
    }
}
