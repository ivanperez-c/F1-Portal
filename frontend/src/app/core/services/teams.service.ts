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
        { username: 'fvasseur', role: 'TEAM', teamId: 1 },
        { username: 'ferrari_strat', role: 'TEAM', teamId: 1 }
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
   * Operación: Recupera toda la info de un equipo (usuarios, pilotos, coches).
   * Endpoint: GET /api/teams/{id}
   * @param id ID del equipo
   * @returns Observable<Team> Objeto Team completo.
   */
  getTeamById(id: number): Observable<Team> {
    // return this.http.get<Team>(`${this.apiUrl}/${id}`);
    
    const team = this.mockTeams.find(t => t.id === id);
    return team ? of(team).pipe(delay(600)) : throwError(() => new Error('Not Found'));
  }

  /**
   * OBTENER LISTA DE EQUIPOS (PÚBLICA)
   * -------------------------------------------------------------------------
   * Operación: Lista básica de equipos para la sección "Escuderías".
   * Endpoint: GET /api/teams
   * @returns Observable<Team[]> Array de equipos.
   */
  getTeams(): Observable<Team[]> {
    // return this.http.get<Team[]>(this.apiUrl);
    return of(this.mockTeams).pipe(delay(500));
  }

  /**
   * AÑADIR RESPONSABLE DE EQUIPO
   * -------------------------------------------------------------------------
   * Operación: Autoriza a un usuario existente (por username) en el equipo.
   * Endpoint: POST /api/teams/{teamId}/responsibles
   * @param teamId ID del equipo
   * @param username String con el nombre de usuario a autorizar
   * @returns Observable<User> El usuario añadido con su rol actualizado.
   */
  addResponsible(teamId: number, username: string): Observable<User> {
    // return this.http.post<User>(`${this.apiUrl}/${teamId}/responsibles`, { username });

    const team = this.mockTeams.find(t => t.id === teamId);
    if(team) {
      const newUser: User = { username: username, role: 'TEAM', teamId: teamId };
      team.users.push(newUser);
      return of(newUser).pipe(delay(600));
    }
    return throwError(() => new Error('Error'));
  }

  /**
   * ELIMINAR RESPONSABLE
   * -------------------------------------------------------------------------
   * Operación: Revoca el acceso de un usuario al equipo.
   * Endpoint: DELETE /api/teams/{teamId}/responsibles/{username}
   * @param teamId ID del equipo
   * @param username Usuario a eliminar
   */
  deleteResponsible(teamId: number, username: string): Observable<boolean> {
    // return this.http.delete<boolean>(`${this.apiUrl}/${teamId}/responsibles/${username}`);

    const team = this.mockTeams.find(t => t.id === teamId);
    if (team) {
      team.users = team.users.filter(u => u.username !== username);
      return of(true).pipe(delay(600));
    }
    return of(false);
  }

  /**
   * AÑADIR PILOTO
   * -------------------------------------------------------------------------
   * Operación: Da de alta un piloto nuevo en la escudería.
   * Endpoint: POST /api/teams/{teamId}/drivers
   * @param teamId ID del equipo
   * @param driver Objeto Driver
   * @returns Observable<Driver> El piloto creado con su ID.
   */
  addDriver(teamId: number, driver: Partial<Driver>): Observable<Driver> {
    // return this.http.post<Driver>(`${this.apiUrl}/${teamId}/drivers`, driver);

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
   * Operación: Borra un piloto de la base de datos.
   * Endpoint: DELETE /api/teams/{teamId}/drivers/{driverId}
   */
  deleteDriver(teamId: number, id: number): Observable<boolean> {
    // return this.http.delete<boolean>(`${this.apiUrl}/${teamId}/drivers/${id}`);

    const t = this.mockTeams.find(x => x.id === teamId);
    if (t) { t.drivers = t.drivers.filter(d => d.id !== id); return of(true).pipe(delay(600)); }
    return of(false);
  }

  /**
   * AÑADIR COCHE
   * -------------------------------------------------------------------------
   * Operación: Registra un nuevo coche con sus datos técnicos.
   * Endpoint: POST /api/teams/{teamId}/cars
   * @param teamId ID del equipo
   * @param car Objeto Car (Name, Code, ERS data, Consumption)
   * @returns Observable<Car> El coche creado con ID.
   */
  addCar(teamId: number, car: Partial<Car>): Observable<Car> {
    // return this.http.post<Car>(`${this.apiUrl}/${teamId}/cars`, car);

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
   * Operación: Elimina un coche.
   * Endpoint: DELETE /api/teams/{teamId}/cars/{carId}
   */
  deleteCar(teamId: number, id: number): Observable<boolean> {
    // return this.http.delete<boolean>(`${this.apiUrl}/${teamId}/cars/${id}`);

    const t = this.mockTeams.find(x => x.id === teamId);
    if (t) { t.cars = t.cars.filter(c => c.id !== id); return of(true).pipe(delay(600)); }
    return of(false);
  }
}