import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AdminUserRequest } from '../models/admin.interface';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  getPendingUsers(): Observable<AdminUserRequest[]> {
     return this.http.get<AdminUserRequest[]>(`${this.apiUrl}/pendientes`);
  }

  validateUser(id: number, role: 'administrador' | 'responsable_equipo'): Observable<boolean> {
     return this.http.put<boolean>(`${this.apiUrl}/${id}/validar`, { role });
  }

  deleteUser(id: number): Observable<boolean> {
     return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}