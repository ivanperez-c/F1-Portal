import { Component, OnInit, HostListener } from '@angular/core';
//import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [CommonModule, RouterModule], 
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header implements OnInit {
  isLoggedIn = false;
  userRole = 'TEAM';
  userName = '';
  
  constructor(/*private authService: AuthService,*/ private router: Router) {}

  ngOnInit(): void {
    // Suscripción a observable de usuario
    /*this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      if (user) {
        this.userRole = user.rol;
        this.userName = user.nombre;
      }
    });*/
  }

  logout() {
    //this.authService.logout();
    this.router.navigate(['/']);
  }
}