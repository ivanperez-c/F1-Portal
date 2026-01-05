import { Routes } from '@angular/router';
import { Home } from './features/public/home/home';

export const routes: Routes = [
  // Ruta por defecto (Home)
  { path: '', component: Home },
  
  // Redirección por seguridad (si pone una url rara, va al home)
  { path: '**', redirectTo: '' }
];