import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators'; 
import { User } from '../models/user.interface';
import { LoginRequest, LoginResponse } from '../models/auth.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = 'http://localhost:8080/api/';

  private USER_KEY = 'auth-user';

  private currentUserSubject: BehaviorSubject<User | null>;
  
  public user$: Observable<User | null>;

  constructor(private http: HttpClient, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {

    let savedUser = null;

    if (isPlatformBrowser(this.platformId)) {
      const stored = localStorage.getItem(this.USER_KEY);
      if (stored) {
        try {
          savedUser = JSON.parse(stored);
        } catch (e) {
          console.error('Error parseando usuario', e);
        }
      }
    }

    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(savedUser);
    this.user$ = this.currentUserSubject.asObservable();

   }

  login(credentials: LoginRequest): Observable<User> {
    /*
    return this.http.post<User>(`${this.apiUrl}/login`, credentials).pipe(
      tap((userResponse: User) => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(userResponse));
        }
        
        this.currentUserSubject.next(userResponse);
      })
    );
    */

    // simulación
    return of(true).pipe(
      delay(1000), 
      map(() => {
        
        let mockUser: User;

        if (credentials.email === 'admin'){
          mockUser = { username: 'AdminUser', role: 'ADMIN' };
          
        } else {
          mockUser = { username: 'TeamUser', role: 'TEAM' };
          
        } 

        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem(this.USER_KEY, JSON.stringify(mockUser));
        }

        this.currentUserSubject.next(mockUser);
        
        return mockUser;
      })
    );
    //
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.USER_KEY);
    }
    
    this.currentUserSubject.next(null);
    
    this.router.navigate(['/login']);
  }
  
  getUser(): User | null {
    return this.currentUserSubject.value;
  }
}
