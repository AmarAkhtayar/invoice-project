import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {TourService} from 'ngx-tour-md-menu';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject();

  formGroup: FormGroup;
  isFormSubmitted = false;

  constructor(private tourService: TourService,
              private formBuilder: FormBuilder,
              private router:Router) {
  }

  ngOnInit(): void {

    this.tourInit();

    this.setupForm();
  }

  setupForm(): void {
    this.formGroup = this.formBuilder.group({
      plaatsing: [null, {validators: [Validators.required]}],
      factuurnummer: [null, {validators: [Validators.required]}]

    });
  }

  // tslint:disable-next-line:typedef
   onlyNumberKey(evt) {

    // Only ASCII character in that range allowed
     // tslint:disable-next-line:prefer-const
    const ASCIICode = (evt.which) ? evt.which : evt.keyCode;
    return !(ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57));
  }

  submitForm(): void {
    this.isFormSubmitted = true;

    console.log(this.formGroup.value);

    if (this.formGroup.invalid) {
      return;
    }
    else {
      this.router.navigate(['/invoice-details']);
    }

  }

  tourInit(): void {
    this.tourService.initialize([
      {
        anchorId: 'invoice.test.1',
        title: 'test 1',
        content: 'content 2',
      },
      {
        anchorId: 'invoice.test.2',
        title: 'test 2',
        content: 'content 2'
      }
    ]);
  }

  startTour(): void {
    this.tourService.start();

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
