import {IAuthData} from '../../shared/interfaces';
import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable()

export class AuthService {
  public logged = false;
  public user: IAuthData = {email: '', password: ''};
  constructor() {
    this.userloggedin();
  }

  // Authenticate function
  public authenticate(data: IAuthData) {
    console.log('data', data);
    return new Observable((observer: Observer<object>) => {
      observer.next(
        data.email.toLowerCase() === 'admin@admin.com'
        && data.password === 'password1'
          ? {
            user: 'Vlad',
            email: 'admin@admin.com',
            authToken: 'q12we34ad1'
          }
          : {err: 'wrong email/password'}
      );
    }).pipe(map((resp: any) => {
      console.log('auth resp in service', resp);
      return resp;
    }));
  }

  // Checking for login User
  public userloggedin() {
    if (localStorage.getItem('currentUser')) {
      this.logged = true;
      this.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  // log out func, delete user from storage
  public logOutFunk() {
    localStorage.removeItem('currentUser');
  }
}
