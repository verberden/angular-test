import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../enviroments/environment.prod';
import { User } from '../models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUserIsAdminSubject: BehaviorSubject<boolean>;
  public currentUser: Observable<User>;
  public currenUserIsAdmin: Observable<boolean>;

  constructor(private http: HttpClient) {
    const storageUser = JSON.parse(localStorage.getItem('currentUser'));
    this.currentUserSubject = new BehaviorSubject<User>(storageUser);
    this.currentUser = this.currentUserSubject.asObservable();
    let state: boolean = false;
    if (storageUser && storageUser.id == 1)  {
      state = true;
    }
    this.currentUserIsAdminSubject = new BehaviorSubject<boolean>(state);
    this.currenUserIsAdmin = this.currentUserIsAdminSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(login: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/authenticate`, { login, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        if (user && user.id == 1) this.currentUserIsAdminSubject.next(true);
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserIsAdminSubject.next(false);
    this.currentUserSubject.next(null);
  }
}