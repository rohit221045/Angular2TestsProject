import { NgModule } from '@angular/core';
import { PostalCodeComponent } from './postalcode.component';
import { OutCodeComponent } from './outcode.component';
import { RouterModule } from '@angular/router';
import { PostalCodeService } from './postalcode.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    RouterModule.forChild([
        { path: 'postalcode', component: PostalCodeComponent },
        { path: 'outcode/:code',
          component: OutCodeComponent }
    ])
   ,
   CommonModule,
   FormsModule
  ],
  declarations: [
    PostalCodeComponent,
    OutCodeComponent,
  ],
  providers: [
    PostalCodeService,
  ]
})
export class PostalCodeModule { }
