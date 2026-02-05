import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SimulationService {

  private apiUrl = 'http://localhost:8080/api/simulacion';

  constructor(private http: HttpClient) {}

  calculateFuel(data: { carId: number, circuitId: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/combustible`, data);
  }

  calculateErs(data: { carId: number, circuitId: number, mode: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/ers`, data);
  }
}