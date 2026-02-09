import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Circuit } from '../models/circuit.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {

  private apiUrl = `${environment.apiUrl}/circuitos`;

  constructor(private http: HttpClient) { }

  getCircuits(): Observable<Circuit[]> {
    return this.http.get<Circuit[]>(this.apiUrl);
  }

  getCircuitsInCalendar(): Observable<Circuit[]> {
    return this.http.get<Circuit[]>(`${this.apiUrl}/calendario`);
  }

  createCircuit(circuit: Circuit): Observable<boolean> {
     return this.http.post<boolean>(this.apiUrl, circuit);
  }

  updateCircuit(id: number, circuit: Partial<Circuit>): Observable<Circuit> {
    const circuito = {
        ...circuit,
        id: id
    };
    return this.http.put<Circuit>(`${this.apiUrl}`, circuito);
  }

  deleteCircuit(id: number): Observable<boolean> {
     return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}