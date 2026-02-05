import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Circuit } from '../models/circuit.interface';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {

  private apiUrl = 'http://localhost:8080/api/circuitos';

  constructor(private http: HttpClient) { }

  getCircuits(): Observable<Circuit[]> {
    return this.http.get<Circuit[]>(this.apiUrl);
  }

  createCircuit(circuit: Circuit): Observable<boolean> {
     return this.http.post<boolean>(this.apiUrl, circuit);
  }

  updateCircuit(id: number, circuit: Partial<Circuit>): Observable<Circuit> {
     return this.http.put<Circuit>(`${this.apiUrl}/${id}`, circuit);
  }

  deleteCircuit(id: number): Observable<boolean> {
     return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}