import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class DataService {

    private static data: any = {};

    public addData(property: string, object: any): void {
        DataService.data[property] = object;
    }

    /**
     * Vráti data, ak dáta s takým kľúčom neexistujú, vráti default hodnotu
     * @param property
     * @param defaultValue
     */
    public getData(property: string, defaultValue?: any): any {

        const result = DataService.data[property];
        if (result === undefined || result === null) {
            this.addData(property, defaultValue);
            return defaultValue;
        }
        return result;
    }

    /**
     * Funkcia vráti komplet objekt do ktorého sa ukladajú údaje - vracia kópiu aby sa objekt nemohol modifikovať
     */
    public getAllData(): any {
        return _.cloneDeep(DataService.data);
    }

}