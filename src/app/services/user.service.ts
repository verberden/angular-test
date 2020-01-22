import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../enviroments/environment.prod';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  create(login: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/user`, { login, password });
  }

  changePassword(oldPassword: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/api/user/password`, { oldPassword, password });
  }
}