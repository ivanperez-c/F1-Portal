import { Routes } from '@angular/router';
import { Home } from './features/public/home/home';
import { Login } from './features/public/login/login';
import { guestGuard } from './core/guards/public.guard';
import { News } from './features/public/news/news';
import { NewsDetail } from './features/public/newsDetail/newsDetail';
import { Calendar } from './features/public/calendar/calendar';
import { Teams } from './features/public/teams/teams';

export const routes: Routes = [
  // Ruta por defecto (Home)
  { path: '', component: Home },

  // Login
  { path: 'login', component: Login, canActivate: [guestGuard] },

  // Noticias
  { path: 'noticias', component: News},
  { path: 'noticias/:permalink', component: NewsDetail },
  
  // Calendario
  { path: 'calendario', component: Calendar },

  // Equipos
  { path: 'escuderias', component: Teams },

  // Redirección por seguridad (si pone una url rara, va al home)
  { path: '**', redirectTo: '' }
];