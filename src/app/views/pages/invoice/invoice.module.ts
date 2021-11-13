import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InvoiceComponent} from './invoice.component';
import {RouterModule, Routes} from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
import {ReactiveFormsModule} from '@angular/forms';


const routes: Routes = [
  {path: '', component: InvoiceComponent},
];

@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    TourMatMenuModule,
    ReactiveFormsModule
  ]
})
export class InvoiceModule {
}
