import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ocurrió un error inesperado';
      let errorTitle = 'Error';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Error de red: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 400:
            errorTitle = 'Datos Incorrectos';
            errorMessage = error.error?.message || 'Revisa los datos del formulario.';
            break;
            
          case 401:
            errorTitle = 'Sesión Expirada';
            errorMessage = 'Tu sesión ha caducado o no tienes permiso. Inicia sesión de nuevo.';
            router.navigate(['/login']);
            break;

          case 403:
            errorTitle = 'Acceso Denegado';
            errorMessage = 'No tienes permisos para realizar esta acción (Solo Admins/Responsables).';
            break;

          case 404:
            errorTitle = 'No Encontrado';
            errorMessage = 'El recurso que buscas no existe o ha sido eliminado.';
            break;

          case 409:
            errorTitle = 'Datos duplicados o fuera de parámetros';
            errorMessage = error.error?.message || 'Revisa los datos del formulario.';
            break;

          case 500:
            errorTitle = 'Error del Servidor';
            errorMessage = 'El servidor de la FIA ha fallado. Inténtalo más tarde.';
            break;
            
          case 0:
            errorTitle = 'Conexión Perdida';
            errorMessage = 'No se puede conectar con el servidor. Revisa tu internet.';
            break;

          default:
            errorMessage = `Código: ${error.status}. ${error.message}`;
            break;
        }
      }

      Swal.fire({
        icon: 'error',
        title: errorTitle,
        text: errorMessage,
        background: '#141414',
        color: '#fff',
        confirmButtonColor: '#e10600',
        confirmButtonText: 'Entendido'
      });

      return throwError(() => error);
    })
  );
};