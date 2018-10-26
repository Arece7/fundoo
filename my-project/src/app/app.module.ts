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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { ForgetComponent } from './components/forget/forget.component';
import { RouterModule} from '@angular/router';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule, MatListModule } from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { NotesComponent } from './components/notes/notes.component';
import { ClickOutsideModule } from 'ng4-click-outside';
import { AddNotesComponent } from './components/add-notes/add-notes.component';

import { NotesCollectionComponent } from './components/notes-collection/notes-collection.component';
import { MoreComponent } from './components/more/more.component';
import { ChangeColorComponent } from './components/change-color/change-color.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
import { MainArchiveComponent } from './components/main-archive/main-archive.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateComponent } from './components/update/update.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgetComponent,
    ResetComponent,
    DashboardComponent,
    NavbarComponent,
    NotesComponent,
    AddNotesComponent,

    NotesCollectionComponent,

    MoreComponent,

    ChangeColorComponent,

    ArchiveComponent,

    TrashComponent,

    MainArchiveComponent,

    UpdateComponent,

  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule, FlexLayoutModule, MatFormFieldModule,
     MatInputModule, MatButtonModule, MatCardModule, MatIconModule, MatButtonToggleModule,
      HttpClientModule, FormsModule, MatSnackBarModule, ReactiveFormsModule,
      ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}), RouterModule,
   MatToolbarModule, LayoutModule, MatSidenavModule, MatListModule, MatMenuModule,ClickOutsideModule,MatTooltipModule,MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[UpdateComponent, NotesCollectionComponent]
})
export class AppModule { }
