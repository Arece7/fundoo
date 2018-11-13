
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./components/login/login.component";
import { AppRoutingModule } from "./app-routing.module";
import { SignupComponent } from "./components/signup/signup.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ForgetComponent } from "./components/forget/forget.component";
import { RouterModule } from "@angular/router";
import { ResetComponent } from "./components/reset/reset.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { LayoutModule } from "@angular/cdk/layout";
import { ImageCropperModule } from 'ngx-image-cropper';
import {
  MatSidenavModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatTooltipModule,
  MatMenuModule,
  MatDialogModule,
  MatCardModule,
  MatIconModule,
  MatButtonToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule
} from "@angular/material";
import { NotesComponent } from "./components/notes/notes.component";
import { ClickOutsideModule } from "ng4-click-outside";
import { AddNotesComponent } from "./components/add-notes/add-notes.component";
import { NotesCollectionComponent } from "./components/notes-collection/notes-collection.component";
import { MoreComponent } from "./components/more/more.component";
import { ChangeColorComponent } from "./components/change-color/change-color.component";
import { ArchiveComponent } from "./components/archive/archive.component";
import { TrashComponent } from "./components/trash/trash.component";
import { MainArchiveComponent } from "./components/main-archive/main-archive.component";
import { UpdateComponent } from "./components/update/update.component";
import { CreatelabelComponent } from "./components/createlabel/createlabel.component";
import { AddlabelComponent } from "./components/addlabel/addlabel.component";
import { SearchPipe } from "./core/pipes/search.pipe";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { SearchLabelPipe } from "./core/pipes/search-label.pipe";
import { LabelNotesComponent } from "./components/label-notes/label-notes.component";
import { CollaboratorComponent } from "./components/collaborator/collaborator.component";
import { ReminderComponent } from "./components/reminder/reminder.component";
import { AddImageComponent } from "./components/add-image/add-image.component";
import { PinComponent } from "./components/pin/pin.component";
import { CropImageComponent } from './components/crop-image/crop-image.component';
import { MainReminderComponent } from './components/main-reminder/main-reminder.component';


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

    CreatelabelComponent,

    AddlabelComponent,

    SearchPipe,

    SearchBarComponent,

    SearchLabelPipe,

    LabelNotesComponent,

    CollaboratorComponent,

    ReminderComponent,

    AddImageComponent,

    PinComponent,



    CropImageComponent,



    MainReminderComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatButtonToggleModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: "never" }),
    RouterModule,
    MatToolbarModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatMenuModule,
    ClickOutsideModule,
    MatTooltipModule,
    MatDialogModule,
    MatCheckboxModule,
    MatChipsModule,
    ImageCropperModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  entryComponents: [
    UpdateComponent,
    NotesCollectionComponent,
    CreatelabelComponent,
    AddlabelComponent,
    CropImageComponent
  ]
})
export class AppModule {}
