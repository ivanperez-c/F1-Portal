import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Team } from '../models/team.interface';
import { Car } from '../models/car.interface';
import { Driver } from '../models/driver.interface';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  
  private apiUrl = 'http://localhost:8080/api/teams';

  private mockTeams: Team[] = [
    {
      id: 1,
      name: 'Scuderia Ferrari HP',
      logo: 'https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col/image.png',
      users: [
        { usuario: 'fvasseur', rol: 'responsable_equipo', teamId: 1 },
        { usuario: 'ferrari_strat', rol: 'responsable_equipo', teamId: 1 }
      ],
      drivers: [
        { id: 16, firstname: 'Charles', lastname: 'Leclerc', code: 'LEC', number: 16, country: 'Monaco', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png' },
        { id: 44, firstname: 'Lewis', lastname: 'Hamilton', code: 'HAM', number: 44, country: 'United Kingdom', photo: 'https://media.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png' }
      ],
      cars: [
        { id: 101, name: 'Ferrari SF-24', code: 'FER-24-A', ersSlow: 0.055, ersMedium: 0.030, ersFast: 0.015, consumption: 34.2 }
      ]
    }
  ];

  constructor(private http: HttpClient) { }

  /**
   * OBTENER DETALLE DE EQUIPO
   * -------------------------------------------------------------------------
   * Operación: Recupera toda la info de un equipo (incluyendo relaciones).
   * Endpoint: GET /api/teams/{id}
   * @param id ID del equipo
   * @returns Observable<Team> Objeto Team completo.
   */
  getTeamById(id: number): Observable<Team> {
    // --- API CALL ---
    // return this.http.get<Team>(`${this.apiUrl}/${id}`);
    
    // --- MOCK ---
    const team = this.mockTeams.find(t => t.id === id);
    return team ? of(team).pipe(delay(600)) : throwError(() => new Error('Not Found'));
  }

  /**
   * OBTENER TODOS LOS EQUIPOS
   * -------------------------------------------------------------------------
   * Operación: Lista básica de equipos.
   * Endpoint: GET /api/teams
   * @returns Observable<Team[]> Array de equipos.
   */
  getTeams(): Observable<Team[]> {
    // --- API CALL ---
    // return this.http.get<Team[]>(this.apiUrl);
    
    // --- MOCK ---
    return of(this.mockTeams).pipe(delay(500));
  }

  /**
   * AÑADIR RESPONSABLE DE EQUIPO
   * -------------------------------------------------------------------------
   * Operación: Asocia un usuario existente a un equipo.
   * Endpoint: POST /api/teams/{teamId}/responsibles
   * @param teamId ID del equipo
   * @param username Username del usuario
   * @returns Observable<User> Usuario actualizado.
   */
  addResponsible(teamId: number, username: string): Observable<User> {
    // --- API CALL ---
    // return this.http.post<User>(`${this.apiUrl}/${teamId}/responsibles`, { username });

    // --- MOCK ---
    const team = this.mockTeams.find(t => t.id === teamId);
    if(team) {
      const newUser: User = { usuario: username, rol: 'responsable_equipo', teamId: teamId };
      team.users.push(newUser);
      return of(newUser).pipe(delay(600));
    }
    return throwError(() => new Error('Error'));
  }

  /**
   * ELIMINAR RESPONSABLE
   * -------------------------------------------------------------------------
   * Operación: Desvincula un usuario del equipo.
   * Endpoint: DELETE /api/teams/{teamId}/responsibles/{username}
   * @param teamId ID del equipo
   * @param username Username a eliminar
   * @returns Observable<boolean> Éxito.
   */
  deleteResponsible(teamId: number, username: string): Observable<boolean> {
    // --- API CALL ---
    // return this.http.delete<boolean>(`${this.apiUrl}/${teamId}/responsibles/${username}`);

    // --- MOCK ---
    const team = this.mockTeams.find(t => t.id === teamId);
    if (team) {
      team.users = team.users.filter(u => u.usuario !== username);
      return of(true).pipe(delay(600));
    }
    return of(false);
  }

  /**
   * AÑADIR PILOTO
   * -------------------------------------------------------------------------
   * Operación: Crea un piloto en el equipo.
   * Endpoint: POST /api/teams/{teamId}/drivers
   * @param teamId ID del equipo
   * @param driver Datos del piloto
   * @returns Observable<Driver> Piloto creado.
   */
  addDriver(teamId: number, driver: Partial<Driver>): Observable<Driver> {
    // --- API CALL ---
    // return this.http.post<Driver>(`${this.apiUrl}/${teamId}/drivers`, driver);

    // --- MOCK ---
    const team = this.mockTeams.find(t => t.id === teamId);
    if(team) {
      const newD = { ...driver, id: Date.now(), photo: driver.photo || 'assets/default.png' } as Driver;
      team.drivers.push(newD);
      return of(newD).pipe(delay(600));
    }
    return throwError(() => new Error('Err'));
  }

  /**
   * ELIMINAR PILOTO
   * -------------------------------------------------------------------------
   * Operación: Elimina un piloto.
   * Endpoint: DELETE /api/teams/{teamId}/drivers/{id}
   * @param teamId ID del equipo
   * @param id ID del piloto
   * @returns Observable<boolean> Éxito.
   */
  deleteDriver(teamId: number, id: number): Observable<boolean> {
    // --- API CALL ---
    // return this.http.delete<boolean>(`${this.apiUrl}/${teamId}/drivers/${id}`);

    // --- MOCK ---
    const t = this.mockTeams.find(x => x.id === teamId);
    if (t) { t.drivers = t.drivers.filter(d => d.id !== id); return of(true).pipe(delay(600)); }
    return of(false);
  }

  /**
   * AÑADIR COCHE
   * -------------------------------------------------------------------------
   * Operación: Registra un chasis en el equipo.
   * Endpoint: POST /api/teams/{teamId}/cars
   * @param teamId ID del equipo
   * @param car Datos del coche
   * @returns Observable<Car> Coche creado.
   */
  addCar(teamId: number, car: Partial<Car>): Observable<Car> {
    // --- API CALL ---
    // return this.http.post<Car>(`${this.apiUrl}/${teamId}/cars`, car);

    // --- MOCK ---
    const t = this.mockTeams.find(x => x.id === teamId);
    if(t) {
      const newC = { ...car, id: Date.now() } as Car;
      t.cars.push(newC);
      return of(newC).pipe(delay(600));
    }
    return throwError(() => new Error('Err'));
  }

  /**
   * ELIMINAR COCHE
   * -------------------------------------------------------------------------
   * Operación: Elimina un chasis.
   * Endpoint: DELETE /api/teams/{teamId}/cars/{id}
   * @param teamId ID del equipo
   * @param id ID del coche
   * @returns Observable<boolean> Éxito.
   */
  deleteCar(teamId: number, id: number): Observable<boolean> {
    // --- API CALL ---
    // return this.http.delete<boolean>(`${this.apiUrl}/${teamId}/cars/${id}`);

    // --- MOCK ---
    const t = this.mockTeams.find(x => x.id === teamId);
    if (t) { t.cars = t.cars.filter(c => c.id !== id); return of(true).pipe(delay(600)); }
    return of(false);
  }
}