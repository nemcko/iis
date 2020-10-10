import { Component, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

/**
 * Component: Ročný rozhovor - hodnotenie
 */
@Component({
  templateUrl: './ep-interview-evaluate.component.html',
  styleUrls: ['../eportal.css']
})
export class EpInterviewEvaluateComponent {
  @Input()
  public parent: any;
  public data: any;

  public constructor(
    public activeModal: NgbActiveModal,
    public modalService: NgbModal,
  ) { }

  public get hasTargets(): boolean {
    return this.data && this.data.targets && this.data.targets.length;
  }

  public get hasCompetences(): boolean {
    return this.data && this.data.competences && this.data.competences.length;
  }

  public lastDay(day: Date = new Date()): Date {
    const lastDayOfMonth = new Date(day.getFullYear(), day.getMonth() + 1, 0);
    return lastDayOfMonth;
  }

  public prevlastDayNextYear(day: Date = new Date()): Date {
    const lastDayOfMonth = new Date(day.getFullYear() + 1, day.getMonth() + 1, -1);
    return lastDayOfMonth;
  }

  // public addTarget(item: any = null): void {
  //   const modalRef = this.modalService.open(DlgAddTargetComponent, { backdrop: 'static', windowClass: 'dlgopen', centered: true });
  //   modalRef.componentInstance.displayData(this, item);
  // }

  public saveData(): void {
    this.parent.saveData(this.data);
  }

}
