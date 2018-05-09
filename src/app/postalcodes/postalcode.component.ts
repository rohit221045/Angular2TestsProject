import { Component, OnInit } from '@angular/core';

import { IPostalCode } from './postalcode';
import { PostalCodeService } from './postalcode.service';

@Component({
    templateUrl: './postalcode.component.html',
    styleUrls: ['./postalcode.component.css']
})
export class PostalCodeComponent implements OnInit {
    pageTitle: string = 'Product List';
    errorMessage: string;
    searchCode: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredPostalCodes = this.listFilter ? this.performFilter(this.listFilter) : this.postalCodes;
    }

    filteredPostalCodes: IPostalCode[];
    postalCodes: IPostalCode[] = [];

    constructor(private _postalCodeService: PostalCodeService) {

    }

    
    performFilter(filterBy: string): IPostalCode[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.postalCodes.filter((postalcode: IPostalCode) =>
        postalcode.postcode.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    SearchPostalCode(): void
    {
        this.postalCodes = [];
        this.filteredPostalCodes = [];
        this._listFilter = '';

        if(this.searchCode)
        {
            this.errorMessage = '';
            this._postalCodeService.getPostalCodes(this.searchCode)
            .map(postCodes => postCodes['result'])
        .subscribe(codes => {
            this.postalCodes = codes;
            this.filteredPostalCodes = this.postalCodes;
            if(this.postalCodes == null || this.postalCodes.length <=0)
            {
                this.errorMessage = 'No Results Found';
            }
        },  error => this.errorMessage = <any>error);
        }
        else
        {
               this.errorMessage = 'Please enter the search code';
        }
        
    }

   
    ngOnInit(): void {
   
                    
    }
}
