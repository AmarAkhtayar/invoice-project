import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {MsalService} from '@azure/msal-angular';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'invoice-system';
  apiResponse: string;
  isNavbarCollapsed = false;


  constructor(private authService: MsalService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.authService.instance.handleRedirectPromise().then(res => {
      if (res != null && res.account != null) {
        console.log(res);
        this.authService.instance.setActiveAccount(res.account);
      }
    });


  }


  isLoggedIn(): boolean {
    return this.authService.instance.getActiveAccount() != null;
  }

  login(): void {
    this.authService.loginRedirect();
  }

  logout(): void {
    this.authService.logout();
  }

}
