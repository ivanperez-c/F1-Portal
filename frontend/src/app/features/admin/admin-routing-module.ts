import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminCircuitsComponent } from './admin-circuits/admin-circuits.component';
import { AdminVotesComponent } from './admin-votes/admin-votes.component';
import { AdminTeamsComponent } from './admin-teams/admin-teams.component';
import { AdminNewsComponent } from './admin-news/admin-news.component';
import { authGuard } from '../../core/guards/auth.guard'; 

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
      { path: 'usuarios', component: AdminUsersComponent },
      { path: 'circuitos', component: AdminCircuitsComponent },
      { path: 'votaciones', component: AdminVotesComponent },
      { path: 'equipos', component: AdminTeamsComponent },
      { path: 'noticias', component: AdminNewsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }