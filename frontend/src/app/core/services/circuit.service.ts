import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Circuit } from '../models/circuit.interface';

@Injectable({
  providedIn: 'root'
})
export class CircuitService {

  private apiUrl = 'http://localhost:8080/api/circuitos';

  constructor(private http: HttpClient) { }

  private mockCircuits: Circuit[] = [
    {
      id: 1,
      nombre: 'Bahrain International Circuit',
      ciudad: 'Sakhir',
      pais: 'Bahrein',
      trazado: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Bahrain%20carbon.png.transform/2col/image.png',
      longitud: 5412,
      numero_vueltas: 57,
      curvas_lentas: 3,
      curvas_media: 4,
      curvas_rapidas: 8,
      calendario: true,
      fecha_carrera: new Date("2026-03-02")
    }
  ];

  /**
   * OBTENER CIRCUITOS
   * -------------------------------------------------------------------------
   * Operación: Devuelve la lista de todos los circuitos (calendario y reserva).
   * Endpoint: GET /api/circuits
   * @returns Observable<Circuit[]> Lista de circuitos.
   */
  getCircuits(): Observable<Circuit[]> {
    // --- API CALL ---
    return this.http.get<Circuit[]>(this.apiUrl);
    
    // --- MOCK ---
    //return of(this.mockCircuits).pipe(delay(600));
  }

  /**
   * CREAR CIRCUITO (ADMIN)
   * -------------------------------------------------------------------------
   * Operación: Registra un nuevo circuito en la base de datos.
   * Endpoint: POST /api/circuits
   * @param circuit Objeto Circuit (sin ID)
   * @returns Observable<boolean> o el Circuito creado.
   */
  createCircuit(circuit: Circuit): Observable<boolean> {
    // --- API CALL ---
    // return this.http.post<boolean>(this.apiUrl, circuit);

    // --- MOCK ---
    return of(true).pipe(delay(600));
  }

  /**
   * ACTUALIZAR CIRCUITO (ADMIN)
   * -------------------------------------------------------------------------
   * Operación: Modifica datos de un circuito existente.
   * Endpoint: PUT /api/circuits/{id}
   * @param id ID del circuito
   * @param circuit Datos parciales o completos a actualizar
   * @returns Observable<Circuit> Circuito actualizado.
   */
  updateCircuit(id: number, circuit: Partial<Circuit>): Observable<Circuit> {
    // --- API CALL ---
    // return this.http.put<Circuit>(`${this.apiUrl}/${id}`, circuit);

    // --- MOCK ---
    const index = this.mockCircuits.findIndex(c => c.id === id);
    if (index !== -1) {
      this.mockCircuits[index] = { ...this.mockCircuits[index], ...circuit };
      return of(this.mockCircuits[index]).pipe(delay(600));
    }
    return throwError(() => new Error('Not found'));
  }

  /**
   * BORRAR CIRCUITO (ADMIN)
   * -------------------------------------------------------------------------
   * Operación: Elimina un circuito.
   * Regla de Negocio: No se puede borrar si 'isInCalendar' es true.
   * Endpoint: DELETE /api/circuits/{id}
   * @param id ID del circuito
   * @returns Observable<boolean> Éxito.
   */
  deleteCircuit(id: number): Observable<boolean> {
    // --- API CALL ---
    // return this.http.delete<boolean>(`${this.apiUrl}/${id}`);

    // --- MOCK ---
    if (id === 1) return throwError(() => new Error('No se puede borrar un circuito del calendario activo.'));
    return of(true).pipe(delay(600));
  }
}