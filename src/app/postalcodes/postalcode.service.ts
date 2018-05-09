import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';


import { IPostalCode } from './postalcode';
import { IOutCode } from './postalcode';

@Injectable()
export class PostalCodeService {
   
    private postalCodesUrl = 'http://postcodes.io/postcodes?q=';
    private outCodesUrl = 'http://postcodes.io/outcodes/';

    constructor(private _http: HttpClient) { }

    getPostalCodes(code: string): Observable<IPostalCode[]> {
        return this._http.get<IPostalCode[]>(this.postalCodesUrl+code)
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

     getOutcode(code: string): Observable<IOutCode> {
        return this._http.get<IPostalCode[]>(this.outCodesUrl+code)
        .do(data => console.log('All: ' + JSON.stringify(data)))
        .catch(this.handleError);
     }

    private handleError(err: HttpErrorResponse) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return Observable.throw(errorMessage);
    }
}
