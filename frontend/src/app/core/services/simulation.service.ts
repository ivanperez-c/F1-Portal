import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SimulationService {

  private apiUrl = `${environment.apiUrl}/api/simulacion`;

  constructor(private http: HttpClient) {}

  calculateFuel(data: { carId: number; circuitId: number }): Observable<any> {
    const params = {
      idCoche: data.carId,
      idCircuito: data.circuitId
    };

    return this.http.get(`${this.apiUrl}/combustible`, { params });
  }

  calculateErs(data: { carId: number, circuitId: number, mode: string }): Observable<any> {
    const params = {
      idCoche: data.carId,
      idCircuito: data.circuitId,
      modo: data.mode
    };
    return this.http.get(`${this.apiUrl}/ers`, { params });
  }
}