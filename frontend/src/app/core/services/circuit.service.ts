import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Circuit } from '../models/circuit.interface';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {

  private apiUrl = 'http://localhost:8080/api/circuits';

  constructor(private http: HttpClient) { }

  private mockCircuits: Circuit[] = [
    {
      id: 1,
      name: 'Gran Premio de Bahrein',
      date: new Date('2024-03-02'),
      city: 'Sakhir',
      country: 'Bahrein',
      image: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Bahrain%20carbon.png.transform/2col/image.png',
      length: 5412
    },
    {
      id: 2,
      name: 'Gran Premio de Arabia Saudí - Jeddah Corniche Circuit',
      date: new Date('2026-05-09'),
      city: 'Jeddah',
      country: 'Arabia Saudí',
      image: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Saudi%20Arabia%20carbon.png.transform/2col/image.png',
      length: 6174
    },
    {
      id: 3,
      name: 'Gran Premio de Australia - Albert Park Circuit',
      date: new Date('2026-06-24'),
      city: 'Melbourne',
      country: 'Australia',
      image: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Australia%20carbon.png.transform/2col/image.png',
      length: 5278
    }
  ];

  /**
   * OBTENER CIRCUITOS / CALENDARIO
   * -------------------------------------------------------------------------
   * Operación: Devuelve la lista de circuitos de la temporada.
   * Endpoint: GET /api/circuits
   * @returns Observable<Circuit[]> Lista de circuitos.
   */
  getCircuits(): Observable<Circuit[]> {
    // return this.http.get<Circuit[]>(this.apiUrl);
    return of(this.mockCircuits).pipe(delay(600));
  }
}