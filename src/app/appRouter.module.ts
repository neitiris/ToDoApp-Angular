import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { UnknownPageComponent } from './unknown-page/unknown-page.component';
import { AuthGuardService } from '../services/authguard';
import { HomePageComponent } from './home-page/home-page.component';
import {ManageItemComponent} from './manage-item/manage-item.component';


const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },
  { path: 'home',
    component: HomePageComponent,
    children: [
      {path: 'edit/:id', component: ManageItemComponent}
    ],
    canActivate: [ AuthGuardService ]
  },
  { path: '**', component: UnknownPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
