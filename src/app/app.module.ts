import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './appRouter.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/authservice/';
import { LoginPageComponent } from './login-page/login-page.component';
import { AuthGuardService } from '../services/authguard';
import { UnknownPageComponent } from './unknown-page/unknown-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataService } from '../services/data';
import { ManageItemComponent } from './manage-item/manage-item.component';
import {MatTableModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    UnknownPageComponent,
    HomePageComponent,
    ManageItemComponent,
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [
    HttpClientModule,
    HttpClient,
    AuthService,
    AuthGuardService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
