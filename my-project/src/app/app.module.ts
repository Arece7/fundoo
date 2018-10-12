import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { SignupComponent } from './components/signup/signup.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgetComponent } from './components/forget/forget.component';
import { RouterModule} from '@angular/router';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgetComponent,
    ResetComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,AppRoutingModule,BrowserAnimationsModule,FlexLayoutModule,MatFormFieldModule,
    MatInputModule,MatButtonModule,MatCardModule,MatIconModule,MatButtonToggleModule, HttpClientModule,FormsModule,MatSnackBarModule,ReactiveFormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}), RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
