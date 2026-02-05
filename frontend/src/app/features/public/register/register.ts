import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  
  registerForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', [Validators.required]],
      usuario: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      passwdUsuario: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const val = this.registerForm.value;

    if (val.passwdUsuario !== val.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden.',
        background: '#141414', color: '#fff', confirmButtonColor: '#e10600'
      });
      return;
    }

    this.isSubmitting = true;

    const requestData = {
      nombre: val.nombre,
      usuario: val.usuario,
      email: val.email,
      passwdUsuario: val.passwdUsuario
    };

    this.authService.register(requestData).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: 'Registro Completado',
          text: 'Tu cuenta ha sido creada. Un administrador debe validar tu acceso antes de poder entrar.',
          background: '#141414', color: '#fff', confirmButtonColor: '#e10600'
        }).then(() => {
          this.router.navigate(['/login']);
        });
      },
      error: (err) => {
        this.isSubmitting = false;
       
      }
    });
  }
}