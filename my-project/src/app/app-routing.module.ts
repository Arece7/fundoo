import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './core/services/authGuard/auth.guard';
import { MainArchiveComponent } from "./components/main-archive/main-archive.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SignupComponent } from "./components/signup/signup.component";
import { ForgetComponent } from "./components/forget/forget.component";
import { ResetComponent } from "./components/reset/reset.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { NotesComponent } from "./components/notes/notes.component";
import { TrashComponent } from "./components/trash/trash.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { LabelNotesComponent } from "./components/label-notes/label-notes.component";
import { MainReminderComponent } from './components/main-reminder/main-reminder.component';
import { GlobalErrorComponentComponent } from './components/global-error-component/global-error-component.component';
import { QuestionComponent } from './components/question/question.component';
const routes: Routes = [
  { path: "", redirectTo: "/cart", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "forget", component: ForgetComponent },
  { path: "resetpassword/:token", component: ResetComponent },
  { path: 'error', component: GlobalErrorComponentComponent},
  { path: 'cart', component: CartComponent},

  {
    path: "",
    component: DashboardComponent,canActivate: [AuthGuard],
    children: [
      { path: "label/:labelName", component: LabelNotesComponent },
      { path: "dashboard", component: NotesComponent },
      { path: "archive", component: MainArchiveComponent },
      { path: "reminder", component: MainReminderComponent  },
      { path: "trash", component: TrashComponent },
      { path: "search", component: SearchBarComponent },
      { path: "questionAndAnswer/:id/Q&A", component: QuestionComponent },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
