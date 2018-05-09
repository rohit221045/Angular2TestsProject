import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IOutCode } from './postalcode';
import { PostalCodeService } from './postalcode.service';

@Component({
  templateUrl: './outcode.component.html',
  styleUrls: ['./outcode.component.css']
})
export class OutCodeComponent implements OnInit {
   pageTitle: string = 'Out Codes Detail';
   errorMessage: string;
   outCode: IOutCode;
   code: string

   constructor(private _route: ActivatedRoute,
     private _router: Router,
     private _postalCodeService: PostalCodeService) {
   }

 ngOnInit() {
   this.code = this._route.snapshot.paramMap.get('code');
     if (this.code) {
       this.OutCodeDeails(this.code);
     }
   }

   OutCodeDeails(code: string) {
     this._postalCodeService.getOutcode(code).map(data => data['result'])
     .subscribe(res => {
         this.outCode = res;
     });
 }

   onBack(): void {
     this._router.navigate(['/postalcode']);
   }

}
