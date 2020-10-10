import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resolve } from '@angular/router';
import { UserService } from '../../services/user.service';
import { UserDto } from '../dtos/user-dto';
import { DataService } from '../../services/data-server.service';

@Injectable()
export class UserResolver implements Resolve<Observable<any>> {

    public constructor(
        private uzivatelService: UserService,
        private dataService: DataService
    ) { }

    public resolve(): Observable<any> {
        return Observable.create(
            observer => {
                const user = this.dataService.getData('uzivatel');
                if (user) {
                    observer.next();
                    observer.complete();
                }
                else {
                    this.uzivatelService.getCurrentUser().subscribe(
                        (uzivatel: UserDto) => {
                            this.dataService.addData('uzivatel', uzivatel);
                            observer.next();
                            observer.complete();
                        },
                        (error) => {
                            console.error(error);
                            observer.next();
                            observer.complete();
                        }
                    );
                }
            }
        );

    }
}