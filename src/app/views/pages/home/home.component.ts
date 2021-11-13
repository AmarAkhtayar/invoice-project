import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {fromEvent, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput', {static: true}) searchInput: ElementRef;

  private destroyed$ = new Subject();

  tempInvoices = [];

  invoices = [{
    invoice_number: 24,
    placement: 'Gemeente',
    product_owner: 'amar',
    invoice_date: '21-09-2021',
    client: 'mm',
    value: 1,
    tax_value: 20,
    invoice_sort: 'credit'
  },
    {
      invoice_number: 66,
      placement: 'Gemeente2',
      product_owner: 'amar2',
      invoice_date: '21-06-2021',
      client: 'mm2',
      value: 3,
      tax_value: 20,
      invoice_sort: 'credit'
    }
  ];


  constructor() {
  }

  ngOnInit(): void {

    this.tempInvoices = this.invoices;
    this.setSearchInputListener();
  }


  setSearchInputListener(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroyed$)
      ).subscribe((text: string) => {
      text = text.toLowerCase();
      this.invoices = this.tempInvoices;

      this.invoices = this.invoices.filter(item =>
        (item.invoice_number.toString().toLowerCase().includes(text)
          || item.placement.toLowerCase().includes(text))
      );
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}

