import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services';
import { User } from './models';

@Component({ selector: 'test-app', templateUrl: 'app.component.html' })
export class AppComponent {
  currentUser: User;
  public currenUserIsAdmin: boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.authenticationService.currenUserIsAdmin.subscribe(x => this.currenUserIsAdmin = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}