import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators'; 
import { User } from '../models/user.interface';
import { LoginRequest } from '../models/auth.interface';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private USER_KEY = 'auth-user';
  private currentUserSubject: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

  // MOCK DE USUARIOS EXISTENTES
  private existingUsersMock = [
    { username: 'admin', email: 'admin@f1.com' },
    { username: 'fvasseur', email: 'fred@ferrari.com' }
  ];

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {
    let savedUser = null;
    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.USER_KEY);
      if (stored) {
        try { savedUser = JSON.parse(stored); } catch (e) { console.error('Error parseando usuario', e); }
      }
    }
    this.currentUserSubject = new BehaviorSubject<User | null>(savedUser);
    this.user$ = this.currentUserSubject.asObservable();
  }

  /**
   * INICIO DE SESIÓN
   * -------------------------------------------------------------------------
   * Operación: Verifica credenciales y devuelve el usuario con su rol.
   * Endpoint: POST /api/auth/login
   * @param credentials Objeto { email, password }
   * @returns Observable<User> Datos del usuario logueado (incluyendo token si aplica).
   */
  login(credentials: LoginRequest): Observable<User> {
    
    // --- API CALL ---
    /*
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
      })
    );
    */

    // --- MOCK ---
    return of(true).pipe(
      delay(1000), 
      map(() => {
        let mockUser: User;
        if (credentials.email === 'admin'){
          mockUser = { username: 'AdminUser', role: 'ADMIN', teamId: undefined };
        } else {
          mockUser = { username: 'TeamUser', role: 'TEAM', teamId: 1 };
        } 
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(mockUser));
        }
        this.currentUserSubject.next(mockUser);
        return mockUser;
      })
    );
  }

  /**
   * CERRAR SESIÓN
   * -------------------------------------------------------------------------
   * Operación: Elimina la sesión local y redirige al login.
   * Endpoint: (Opcional) POST /api/auth/logout para invalidar token en servidor.
   */
  logout(): void {
    if (isPlatformBrowser(this.platformId)) localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  
  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * REGISTRO DE USUARIO
   * -------------------------------------------------------------------------
   * Operación: Crea solicitud de usuario. Valida unicidad de email/username.
   * Endpoint: POST /api/auth/register
   * @param userData Datos del registro
   */
  register(userData: RegisterRequest): Observable<boolean> {
    // --- API CALL REAL (Comentada) ---
    /*
    return this.http.post<boolean>(`${this.apiUrl}/register`, userData);
    */

    // --- MOCK CON VALIDACIÓN ---
    return of(true).pipe(
      delay(1000),
      map(() => {
        const userExists = this.existingUsersMock.some(u => u.username.toLowerCase() === userData.username.toLowerCase());
        if (userExists) {
          throw new Error('El nombre de usuario ya está en uso.');
        }

        const emailExists = this.existingUsersMock.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
        if (emailExists) {
          throw new Error('Esa dirección de correo ya está registrada.');
        }

        return true;
      })
    );
  }
}