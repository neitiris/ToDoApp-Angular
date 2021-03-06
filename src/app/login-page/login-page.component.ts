import { Component } from '@angular/core';
import { AuthService } from '../../services/authservice';
import { IAuthData } from '../../shared/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  public user: IAuthData = {email: '', password: ''};
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    if (authService.logged) {
      router.navigate(['home']);
    }
  }

  auth(user) {
    this.authService.authenticate(user).subscribe(
      (userData: any) => {
        if (userData && userData.authToken) {
          console.log('currentUser', JSON.stringify(userData));
          localStorage.setItem('currentUser', JSON.stringify(userData));
          this.user.email = userData.email;
          this.authService.userloggedin();
          console.log('Login Success');
          this.router.navigate([ 'home' ]);
        }
      },
      (err: any) => {
        console.log('err', err);
      }
    );
  }
}
