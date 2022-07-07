import { TecnicoUpdadeComponent } from './components/tecnico/tecnico-updade/tecnico-updade.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TecnicoListComponent } from './components/tecnico/tecnico-list/tecnico-list.component';
import { NavComponent } from './components/nav/nav.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TecnicoCreateComponent } from './components/tecnico/tecnico-create/tecnico-create.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: NavComponent, canActivate: [AuthGuard], children: [
      { path: 'home', component: HomeComponent },

      { path: 'tecnicos', component: TecnicoListComponent },
      { path: 'tecnicos/create', component: TecnicoCreateComponent },
      { path: 'tecnicos/updade/:id', component: TecnicoUpdadeComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 