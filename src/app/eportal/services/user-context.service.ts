import { Injectable } from '@angular/core';
import { IUserAccess } from 'src/app/eportal/services/eportal.service';
import { DataService } from 'src/app/shared/services/data-server.service';

@Injectable({
    providedIn: 'root'
})
export class UserContextService implements IUserAccess {
    public constructor(private svc: DataService) { }

    public get userId(): string {
        const user = this.svc.getData('uzivatel');
        return user['userId'];
    }

    public get isHR(): boolean {
        const user = this.svc.getData('uzivatel');
        if (user.roles && (user.roles.includes('[HR]') || user.roles.includes('[Manager]'))) {
            return true;
        }
        else {
            return false;
        }
    }

    public get isSDD(): boolean {
        const user = this.svc.getData('uzivatel');
        if (user.roles && (user.roles.includes('[DSV]') || user.roles.includes('[Manager]'))) {
            return true;
        }
        else {
            return false;
        }
    }

    public isTL(accdata: any = null): boolean {
        const user = this.svc.getData('uzivatel');
        if (user.roles && user.roles.includes('[Manager]')) {
            return true;
        }
        if (accdata) {
            if (typeof accdata === 'string' || accdata instanceof String) {
                if (user.positionKey === accdata || user.userId === accdata) {
                    return true;
                }
            }
            else {
                if (Array.isArray(accdata)) {
                    return accdata.some(usr => usr.personID === user.userId);
                }
                else {
                    if (accdata.leaderId && accdata.leaderId === user.userId) {
                        return true;
                    }

                    if (accdata.leaders) {
                        return accdata.leaders.some(usr => usr.personID === user.userId);
                    }

                    if (accdata.evaluator && accdata.evaluator.personID && accdata.evaluator.personID === user.userId) {
                        return true;
                    }
                }
            }
        }
        else {
            if (user.roles && user.roles.includes('[Teamleader]')) {
                return true;
            }
        }
        return false;
    }

    public setPortalSharedFunctions(comp: any): void {
        comp['newCodeReview'] = function ($event, personID): void {
            const user = this.eportalSvc.getData('uzivatel');
            this.loader.showSpinner();
            this.eportalSvc.addReview(user.userId, personID).subscribe(
                review => {
                    this.loader.showSpinner(false);
                    this.router.navigate(['portal', personID, 'reviews', review.docId], { queryParams: { tab: 'eval' } });
                },
                err => {
                    console.error(err);
                    this.loader.showSpinner(false);
                }
            );
            $event.stopPropagation();
        }

        comp['newCodeReview'].bind(comp);

        comp['newMeeting'] = function ($event, personID): void {
            const uid=personID || this.id;
            this.loader.showSpinner();
            this.eportalSvc.addMeeting().subscribe(
                meeting => {
                    this.loader.showSpinner(false);
                    this.router.navigate(['portal', uid, 'meetings', meeting.docId], { queryParams: { tab: 'eval' } });
                },
                err => {
                    console.error(err);
                    this.loader.showSpinner(false);
                }
            );
            $event.stopPropagation();
        }

        comp['newMeeting'].bind(comp);
    }
}

