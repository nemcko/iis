import { Injectable } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { ContributionService } from "../../services/contribution.service";

@Injectable()
export class VoucherAllowedGuard implements CanActivate {

  constructor(
    private router: Router,
    private contributionService: ContributionService
  ) {}

  canActivate(
    next:ActivatedRouteSnapshot, 
    state:RouterStateSnapshot
  ):boolean {
    if (this.contributionService.voucherAllowed) {
      return true;
    } else {
      this.router.navigate(['/holiday-voucher']);
      return false;
    }
  }

}
