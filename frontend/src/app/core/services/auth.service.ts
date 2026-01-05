import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../models/auth.interfaces';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    /*
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.saveSession(response))
    );
    */

    // simulación
    const mockResponse: LoginResponse = {
      username: 'TestUser',
      role: 'TEAM'
    };

    return of(mockResponse).pipe(
      delay(1000), 
      tap(response => this.saveSession(response))
    );
    //
  }

  private saveSession(data: LoginResponse): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userName', data.username);
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('userRole');
      localStorage.removeItem('userName');
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('userName');
    } else {
      return false;
    }
  }
}
