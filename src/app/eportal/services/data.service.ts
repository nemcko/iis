import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/shared/services/data-server.service';

/**
 * Portal data service: Spoločné portálové funkcie
 */
export class PortalDataService extends DataService {
    public constructor() {
        super();
    }

    public storePath(route: ActivatedRoute): void {
        const params = window.location.hash.split('?')[1] || '';
        let url = '/' + route.pathFromRoot.map(r => r.snapshot.url).reduce((acc, val) => acc.concat(val), []).map(f => f.path).join('/');
        let stack: Array<string> = this.getData('callstack', []);

        url += params ? '?' + params : '';
        stack = stack.filter((item) => item !== url);
        stack.push(url);
        this.addData('callstack', stack);
    }

    public get storedPaths(): Array<string> {
        return this.getData('callstack', []);
    }

    public revertLastPath(): void {
        const stack: Array<string> = this.getData('callstack', []);
        stack.pop();
        this.addData('callstack', stack);
    }

    /**
     * Go to last path: Posledne volaná url aplikačného stromu
     */
    public goToLastPath(router: Router, alternatePath: string = ''): void {
        const qPar = (uri): string => uri.split('?')[1] || '';
        const stack: Array<string> = this.getData('callstack', []);
        const lastpath = stack.pop();
        let path = [...stack].pop();
        this.addData('callstack', stack);
        if (path) {
            let qp = qPar(path);
            if (!qp) {
                qp = qPar(lastpath);
            }
            if (qp) {
                router.navigateByUrl(path.split('?')[0] + '?' + qp);
            }
            else {
                router.navigate([path]);
            }
        }
        else {
            if (alternatePath) {
                router.navigateByUrl(alternatePath);
            }
            else {
                const qparams = router.parseUrl('?' + (router.url.split('?')[1] || '')).queryParams;
                path = router.url.substr(0, router.url.lastIndexOf('/'));
                router.navigate([path], { queryParams: qparams });
            }
        }

    }
}

