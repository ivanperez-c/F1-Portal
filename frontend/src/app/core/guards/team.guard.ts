import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; 

export const teamGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUser();
  
  if (user?.role !== "TEAM") {
    router.navigate(['/']);
    return false; 
  }

  return true;
};