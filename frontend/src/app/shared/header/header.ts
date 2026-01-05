import { Component, OnInit, Inject, PLATFORM_ID  } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { RouterModule, RouterLink } from '@angular/router'; 
import { isPlatformBrowser } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [RouterLink, CommonModule, RouterModule], 
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header implements OnInit {
  userName: string = '';
  userRole: string = '';
  
  constructor(public authService: AuthService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.userName = localStorage.getItem('userName') || '';
      this.userRole = localStorage.getItem('userRole') || '';
    }
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
        this.router.navigate(['/login']);
      
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