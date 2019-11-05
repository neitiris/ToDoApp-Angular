import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UnknownPageComponent } from './unknown-page/unknown-page.component';
import { AuthGuardService } from '../services/authguard';


const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: LoginPageComponent, canActivate: [ AuthGuardService ] },
  { path: 'unknown', component: UnknownPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
