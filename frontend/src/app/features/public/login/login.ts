import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/auth.interface';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginData: LoginRequest = {
    usuario: '',
    password: ''
  };

  isLoading = false; 
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.loginData.usuario || !this.loginData.password) {
      this.errorMessage = 'Por favor, rellena todos los campos';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.isLoading = false;
        this.router.navigate(['/']); 
      },
      error: (error) => {
        console.error('Error en login:', error);
        this.isLoading = false;
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    });
  }
}
