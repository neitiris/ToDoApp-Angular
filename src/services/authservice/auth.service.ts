import { IAuthData } from '../../shared/interfaces';
import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()

export class AuthService {
  public logged = false;
  public user: IAuthData = {email: '', password: ''};
  constructor(
    public router: Router,
  ) {
    this.userloggedin();
  }

  public authenticate(data: IAuthData) {
    console.log('data', data);
    return new Observable((observer: Observer<object>) => {
      observer.next(
        data.email.toLowerCase() === 'admin@admin.com'
        && data.password === 'password1'
          ? {
            user: 'Vlad',
            email: 'admin@admin.com',
            authToken: 'q12we34ad1',
            data: [{firstName: 'Vlad', lastName: 'Senchuk', id: 12314123412}]
          }
          : {err: 'wrong email/password'}
      );
    }).pipe(map((resp: any) => {
      console.log('auth resp in service', resp);
      return resp;
    }));
  }

  public userloggedin() {
    if (localStorage.getItem('currentUser')) {
      this.logged = true;
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  public logOutFunk() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }
}
