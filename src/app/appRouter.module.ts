import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UnknownPageComponent } from './unknown-page/unknown-page.component';
import { AuthGuardService } from '../services/authguard';
import { HomePageComponent } from './home-page/home-page.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'home', component: HomePageComponent, canActivate: [ AuthGuardService ] },
  { path: '**', component: UnknownPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
