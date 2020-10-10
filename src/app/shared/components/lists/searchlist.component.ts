import { Component, Input, ContentChild, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { debounceTime, map, distinctUntilChanged, merge, startWith, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


export interface ISearchListParams { http?: HttpClient, id: string, search: string, page: number, limit: number }
export type SearchListFunction = (http: HttpClient, id: string, search: string, page: number, limit: number) => Observable<any>;

/**
 * Component: Zoznam s výberom a stránkovaním
 */
@Component({
  selector: 'search-list',
  templateUrl: './searchlist.component.html'
})
export class SearchListComponent {
  @Input() public toptitle: string;
  @Input() public title: string;
  @Input() public limit: number = 10
  @Input() public fragment: string = 'search';
  @Input() public numPages: number = 10
  @Input() public searchFields: string = 'personFN';
  @Input() public clsOuterRow: string = 'row';
  @Input() public clsOuterPanel: string = 'col-12 col-md-10 mx-auto';
  @Input() public clsInnerPanel: string = 's-list-zamestnanci';
  @Input() public clsList: string = 'b-list-zamestnanci';
  @Input() public clsItemCols: string = 'col-12 col-xl-6';
  @Input() public clsItem: string = 'e-zamestnanec-card';

  @ContentChild('templateRef') public templateRef: TemplateRef<any>;

  public id$: Observable<string> = null
  public total$: Observable<number> = null
  public items$: Observable<any> = null
  public reqtime: any;
  // protected terms: string = ''
  protected page: number = 1
  private chandeIdStream = new Subject<string>();
  private searchTermStream = new Subject<string>();
  private pageStream = new Subject<number>();
  private subID = new Subject<string>();
  private subTotal = new Subject<number>();
  private subItems = new Subject<any>();

  public constructor(
    private http: HttpClient,
  ) {
  }

  public open(dataFunction: SearchListFunction, itemID: string = '0', searchTerm: string = ''): void {
    const pageSource = this.pageStream.pipe(map(pageNumber => {
      this.page = pageNumber
      return { http: this.http, id: itemID, search: searchTerm, page: pageNumber, limit: this.limit }
    }))

    const sourceId = this.chandeIdStream.pipe(
      map(id => {
        return { http: this.http, id: id, search: searchTerm, page: 1, limit: this.limit }
      }))

    const searchSource = this.searchTermStream.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      map(searchTerm => {
        // this.terms = searchTerm
        return { http: this.http, id: itemID, search: searchTerm, page: 1, limit: this.limit }
      }))

    const source = (dataFunction: SearchListFunction): Observable<any> => {
      return pageSource.pipe(
        merge(searchSource),
        merge(sourceId),
        startWith({ id: itemID, search: searchTerm, page: this.page, limit: this.limit }),
        mergeMap((par: ISearchListParams) => {
          return dataFunction(this.http, par.id, par.search, par.page, par.limit)
        })
      )
    }

    this.id$ = this.subID.asObservable();
    this.total$ = this.subTotal.asObservable();
    this.items$ = this.subItems.asObservable();

    source(dataFunction).subscribe((data: any) => {
      this.subTotal.next(data['total']);
      this.subItems.next(data['items']);
      this.reqtime = new Date().getTime();
    })

  }

  public changeId(id: string): any {
    this.chandeIdStream.next(id)
  }

  public search(terms: string): any {
    this.searchTermStream.next(terms)
  }

  public goToPage(page: number): any {
    this.pageStream.next(page)
  }
}
