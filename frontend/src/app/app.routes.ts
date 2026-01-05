import { Routes } from '@angular/router';
import { Home } from './features/public/home/home';
import { Login } from './features/public/login/login';
import { guestGuard } from './core/guards/public.guard';

export const routes: Routes = [
  // Ruta por defecto (Home)
  { path: '', component: Home },

  // Login
  { path: 'login', component: Login, canActivate: [guestGuard] },
  
  // Redirección por seguridad (si pone una url rara, va al home)
  { path: '**', redirectTo: '' }
];