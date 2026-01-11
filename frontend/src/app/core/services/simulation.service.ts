import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SimulationService {

  calculateFuel(data: { carId: number, circuitId: number }): Observable<any> {
    const mockResult = {
      consumptionPerLap: (1.7 + Math.random() * 0.2).toFixed(2),
      totalFuelNeeded: (100 + Math.random() * 10).toFixed(1),
      laps: 57
    };
    return of(mockResult).pipe(delay(800));
  }

  calculateErs(data: { carId: number, circuitId: number, mode: string }): Observable<any> {
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