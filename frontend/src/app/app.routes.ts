import { Routes } from '@angular/router';
import { Home } from './features/public/home/home';
import { Login } from './features/public/login/login';
import { Register } from './features/public/register/register';
import { guestGuard } from './core/guards/public.guard';
import { authGuard } from './core/guards/auth.guard';
import { News } from './features/public/news/news';
import { NewsDetail } from './features/public/newsDetail/newsDetail';
import { Calendar } from './features/public/calendar/calendar';
import { Teams } from './features/public/teams/teams';
import { PollVotingComponent } from './features/public/poll-voting/poll-voting.component';

export const routes: Routes = [
  { path: '', component: Home },

  { path: 'login', component: Login, canActivate: [guestGuard] },

  { path: 'registro', component: Register },

  { path: 'noticias', component: News},
  { path: 'noticias/:permalink', component: NewsDetail },
  
  { path: 'calendario', component: Calendar },

  { path: 'escuderias', component: Teams },

  { path: 'votaciones', component: PollVotingComponent },

  {
    path: 'equipo',
    loadChildren: () => import('./features/team/team.module').then(m => m.TeamModule),
    canActivate: [authGuard] 
  },

  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule),
    canActivate: [authGuard] 
  },

  { path: '**', redirectTo: '' }
];