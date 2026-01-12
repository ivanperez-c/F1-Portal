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
  // Ruta por defecto (Home)
  { path: '', component: Home },

  // Login
  { path: 'login', component: Login, canActivate: [guestGuard] },

  { path: 'registro', component: Register },

  // Noticias
  { path: 'noticias', component: News},
  { path: 'noticias/:permalink', component: NewsDetail },
  
  // Calendario
  { path: 'calendario', component: Calendar },

  // Equipos
  { path: 'escuderias', component: Teams },

  { path: 'votaciones', component: PollVotingComponent },

  // Módulo de gestión de equipo
  {
    path: 'equipo',
    loadChildren: () => import('./features/team/team.module').then(m => m.TeamModule),
    canActivate: [authGuard] 
  },

  // Módulo de administración
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin-module').then(m => m.AdminModule),
    canActivate: [authGuard] 
  },

  // Redirección por seguridad (si pone una url rara, va al home)
  { path: '**', redirectTo: '' }
];