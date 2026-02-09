import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators'; 
import { User } from '../models/user.interface';
import { LoginRequest } from '../models/auth.interface';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/auth.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/usuarios`;
  private USER_KEY = 'auth-user';
  private currentUserSubject: BehaviorSubject<User | null>;
  public user$: Observable<User | null>;

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

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap(user => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        }
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
  
  getUser(): User | null {
    return this.currentUserSubject.value;
  }

  register(userData: RegisterRequest): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/registro`, userData);
  }

  updateUserTeam(teamId: number): void {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      const updatedUser = { ...currentUser, id_equipo: teamId };
      
      this.currentUserSubject.next(updatedUser);
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
      }
    }
  }
}