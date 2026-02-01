import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const user = authService.getUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const url = state.url;

  if (url.startsWith('/admin')) {
    if (user.rol === 'administrador') {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  }

  if (url.startsWith('/equipo')) {
    if (user.rol === 'responsable_equipo' || user.rol === 'administrador') {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  }

  return true;
};