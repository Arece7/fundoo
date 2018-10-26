import { MainArchiveComponent } from './components/main-archive/main-archive.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgetComponent } from './components/forget/forget.component';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotesComponent } from './components/notes/notes.component';
import { ArchiveComponent } from './components/archive/archive.component';
import { TrashComponent } from './components/trash/trash.component';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,  },
  { path: 'signup', component: SignupComponent,  },
  { path: 'forget', component: ForgetComponent,  },
  { path: 'resetpassword/:token', component: ResetComponent },
  { path: '', component: DashboardComponent,
  children: [
    {path: 'dashboard', component:NotesComponent },
    {path: 'archive', component:MainArchiveComponent },
    {path: 'trash', component: TrashComponent}
  ]
}
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
