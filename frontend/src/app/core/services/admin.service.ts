import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importado HttpClient
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AdminUserRequest } from '../models/admin.interface';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  /* pendingUsers: AdminUserRequest[] = [
    { id: 10, username: 'new_team_manager', email: 'manager@f1.com', isValidated: false, registrationDate: new Date() },
    { id: 11, username: 'fan_boy_99', email: 'fan@gmail.com', isValidated: false, registrationDate: new Date() }
  ];*/

  /**
   * OBTENER SOLICITUDES PENDIENTES
   * -------------------------------------------------------------------------
   * Operación: Lista usuarios registrados que aún no han sido validados.
   * Endpoint: GET /api/admin/users/pending
   * @returns Observable<AdminUserRequest[]> Lista de solicitudes.
   */
  getPendingUsers(): Observable<AdminUserRequest[]> {
    // --- API CALL ---
     return this.http.get<AdminUserRequest[]>(`${this.apiUrl}/pendientes`);

    // --- MOCK ---
    //return of(this.pendingUsers).pipe(delay(500));
  }

  /**
   * VALIDAR USUARIO Y ASIGNAR ROL
   * -------------------------------------------------------------------------
   * Operación: Aprueba un usuario y le asigna su rol definitivo.
   * Endpoint: POST /api/admin/users/{id}/validate
   * @param id ID del usuario
   * @param role Rol asignado ('ADMIN' | 'TEAM')
   * @returns Observable<boolean> Éxito de la operación.
   */
  validateUser(id: number, role: 'administrador' | 'responsable_equipo'): Observable<boolean> {
    // --- API CALL ---
     return this.http.put<boolean>(`${this.apiUrl}/${id}/validar`, { role });

    // --- MOCK ---
    /*const idx = this.pendingUsers.findIndex(u => u.id === id);
    if (idx !== -1) {
      this.pendingUsers.splice(idx, 1);
      return of(true).pipe(delay(600));
    }
    return of(false);*/
  }

  /**
   * BORRAR USUARIO (RECHAZAR SOLICITUD)
   * -------------------------------------------------------------------------
   * Operación: Rechaza y elimina un usuario pendiente o existente.
   * Endpoint: DELETE /api/admin/users/{id}
   * @param id ID del usuario
   * @returns Observable<boolean> Éxito de la operación.
   */
  deleteUser(id: number): Observable<boolean> {
    // --- API CALL ---
     return this.http.delete<boolean>(`${this.apiUrl}/${id}`);

    // --- MOCK ---
    /*const idx = this.pendingUsers.findIndex(u => u.id === id);
    if (idx !== -1) {
      this.pendingUsers.splice(idx, 1);
      return of(true).pipe(delay(600));
    }
    return of(false);*/
  }
}