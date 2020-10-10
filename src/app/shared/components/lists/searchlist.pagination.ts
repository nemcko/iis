import { Component, Input, EventEmitter, Output } from '@angular/core'
import { Router } from '@angular/router'
import { Location } from '@angular/common'

/**
 * Component: Stránkovanie zoznamu
 */
@Component({
    selector: 'pagination',
    template: `
<div class="row">
    <div class="col-12 mt-3">
        <ul *ngIf="totalPages() > 1" class="justify-content-center pagination pagination-sm">
            <li class="page-item" *ngIf="totalPages() > numPages"><a class="page-link box-shadow-sm mx-1 rounded" href="javascript:void(0)" (click)="pageClicked(prevPage())" [appFocus]="false"><i class="fas fa-angle-left"></i></a></li>
            <li class="page-item" *ngIf="totalPages() > numPages"><a class="page-link box-shadow-sm mx-1 rounded" href="javascript:void(0)" (click)="pageClicked(1)" [appFocus]="false" [ngClass]="{'text-secondary font-weight-bold': page===1}">1</a></li>
            <li class="page-item" *ngIf="totalPages() > numPages && (page > 3 || page > (totalPages() - numPages))"><a class="page-link box-shadow-sm mx-1 rounded" href="javascript:void(0)">...</a></li>
            <li class="page-item" *ngFor="let p of pagesRange()"><a class="page-link box-shadow-sm mx-1 rounded" [ngClass]="{'text-secondary font-weight-bold': page===p}" href="javascript:void(0)" (click)="pageClicked(p)" [appFocus]="false">{{p}}</a></li>
            <li class="page-item" *ngIf="((totalPages() > numPages && page > 3) || (totalPages() > numPages)) && page <= (totalPages() - numPages)"><a class="page-link box-shadow-sm mx-1 rounded" href="javascript:void(0)">...</a></li>
            <li class="page-item" *ngIf="totalPages() > numPages"><a class="page-link box-shadow-sm mx-1 rounded" href="javascript:void(0)" (click)="pageClicked(totalPages())" [appFocus]="false" [ngClass]="{'text-secondary font-weight-bold': page===totalPages()}">{{totalPages()}}</a></li>
            <li class="page-item" *ngIf="totalPages() > numPages"><a class="page-link box-shadow-sm mx-1 rounded" href="javascript:void(0)" (click)="pageClicked(nextPage())" [appFocus]="false"><i class="fas fa-angle-right"></i></a></li>
        </ul>
    </div>
</div>
    `,
    styles: ['a { color: gray;min-width:32px; text-align: center;font-weight: normal; }']
})
export class SearchPaginationComponent {
    public totalPage: number = 0

    @Input()
    public params: { [key: string]: string | number } = {}

    @Input()
    public total: number = 0

    @Input()
    public limit: number = 10

    @Input()
    public page: number = 1

    @Input()
    public numPages: number = 10

    @Output()
    public goTo: EventEmitter<number> = new EventEmitter<number>()

    public constructor(
        protected location: Location,
        protected router: Router
    ) {
        $('.js-basic-select').select2();
    }

    public totalPages(): number {
        return Math.ceil((this.total || 0) / this.limit)
    }

    public rangeStart(): number {
        if (this.totalPages() <= this.numPages) {
            return 1;
        }
        else
            if (this.page > Math.max(2, this.totalPages() - this.numPages)) {
                return Math.max(2, this.totalPages() - this.numPages);
            }
        return Math.max(2, Math.min(this.page, Math.floor(this.page / this.numPages) * this.numPages))
    }

    public pagesRange(): Array<number> {
        const range: Array<number> = [];
        for (let i = this.rangeStart(); i < Math.min(this.rangeStart() + this.numPages - 1, this.totalPages() + 1); i++) {
            range.push(i);
        }
        return range;
    }

    public prevPage(): number {
        return Math.max(1, this.page - 1)
    }

    public nextPage(): number {
        return Math.min(this.page + 1, this.totalPages())
    }

    public pageParams(page: number): { [key: string]: string | number } {
        const params = Object.assign({}, this.params);
        params['page'] = page
        return params
    }

    public pageClicked(page: number): void {
        this.goTo.next(page);
    }
}
