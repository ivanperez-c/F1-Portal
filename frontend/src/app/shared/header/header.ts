import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common'; 
import { RouterModule, RouterLink } from '@angular/router'; 
import { User } from '../../core/models/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [RouterLink, CommonModule, RouterModule], 
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header implements OnInit {
  currentUser: User | null = null;

  isBrowser: boolean;
  
  constructor(public authService: AuthService, @Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.currentUser = this.authService.getUser();
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      this.currentUser = user;
    });
  }

  get hasTeam(): boolean {
    const user = this.authService.getUser();
    return user?.id_equipo != null || user?.rol === 'administrador'; 
  }

  logout() {
    Swal.fire({
      title: '¿Abandonar el Paddock?',
      text: "Se cerrará tu sesión actual",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e10600', 
      cancelButtonColor: '#383838', 
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'Cancelar',
      background: '#1f1f1f',
      color: '#ffffff',     
      showClass: { popup: 'animate__animated animate__fadeInDown' },
      hideClass: { popup: 'animate__animated animate__fadeOutUp' }
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout();
      
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 2000,
          background: '#e10600',
          color: '#fff'
        });
        Toast.fire({ icon: 'success', title: 'Sesión cerrada correctamente' });
      }
    });
  }
}