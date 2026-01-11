import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SimulationService {

  private apiUrl = 'http://localhost:8080/api/simulation';

  constructor(private http: HttpClient) {}

  /**
   * CALCULAR COMBUSTIBLE
   * -------------------------------------------------------------------------
   * Operación: Calcula consumo por vuelta y total según circuito y coche.
   * Endpoint: POST /api/simulation/fuel
   * * @param data Objeto { carId: number, circuitId: number }
   * * @returns Observable con JSON:
   * {
   * consumptionPerLap: number (litros/vuelta),
   * totalFuelNeeded: number (litros totales),
   * laps: number (vueltas del circuito)
   * }
   */
  calculateFuel(data: { carId: number, circuitId: number }): Observable<any> {
    // return this.http.post(`${this.apiUrl}/fuel`, data);

    const mockResult = {
      consumptionPerLap: (1.7 + Math.random() * 0.2).toFixed(2),
      totalFuelNeeded: (100 + Math.random() * 10).toFixed(1),
      laps: 57
    };
    return of(mockResult).pipe(delay(800));
  }

  /**
   * CALCULAR ERS (ENERGÍA)
   * -------------------------------------------------------------------------
   * Operación: Calcula recuperación de energía y vueltas de carga.
   * Lógica de negocio: Debe aplicar factores según modo SAVING, NORMAL, HOTLAP.
   * Endpoint: POST /api/simulation/ers
   * * @param data Objeto { carId: number, circuitId: number, mode: 'SAVING'|'NORMAL'|'HOTLAP' }
   * * @returns Observable con JSON:
   * {
   * energyMj: number (Energía recuperada por vuelta en MJ),
   * batteryPercent: number (% recargado por vuelta),
   * lapsToFull: number (Vueltas para cargar 100%)
   * }
   */
  calculateErs(data: { carId: number, circuitId: number, mode: string }): Observable<any> {
    // return this.http.post(`${this.apiUrl}/ers`, data);

    let modeFactor = 1.0;
    if (data.mode === 'SAVING') modeFactor = 1.2;
    if (data.mode === 'HOTLAP') modeFactor = 0.5;
    const recovered = (0.4 * modeFactor);
    
    return of({
      energyMj: recovered.toFixed(3),
      batteryPercent: Math.round((recovered / 2) * 100),
      lapsToFull: Math.ceil(2 / recovered)
    }).pipe(delay(800));
  }
}