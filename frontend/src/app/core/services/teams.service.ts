import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.interface';
import { Car } from '../models/car.interface';
import { Driver } from '../models/driver.interface';
import { User } from '../models/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  
  private apiUrl = `${environment.apiUrl}/api/equipos`;
  private apiUrlPilotos = `${environment.apiUrl}/api/pilotos`;
  private apiUrlCoches = `${environment.apiUrl}/api/coches`;

  constructor(private http: HttpClient) { }

  getTeamById(id: number, excludeUserId?: number): Observable<Team> {
    let url = `${this.apiUrl}/${id}`;
    if (excludeUserId) {
      url += `?excludeUserId=${excludeUserId}`;
    }
    return this.http.get<Team>(url);
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrl);
  }

  addResponsible(teamId: number, username: string): Observable<any> {
      const url = `${this.apiUrl}/${teamId}/responsables?username=${username}`;

      return this.http.post(
          url,
          {}
      );
  }

  deleteResponsible(teamId: number, id: number): Observable<any> {
      console.log('Eliminando responsable', { teamId, id });
      const url = `${this.apiUrl}/${teamId}/responsables?idUsuario=${id}`;

      return this.http.delete(
          url,
          { responseType: 'text' }
      );
  }

  addDriver(teamId: number, driver: Partial<Driver>): Observable<Driver> {
    const driverData = {
        ...driver,
        equipo: {
            id: teamId
        }
    };
    return this.http.post<Driver>(`${this.apiUrlPilotos}`,  driverData );
  }

  updateDriver(teamId: number, driverId: number, driverData: any): Observable<Driver> {
    const piloto = {
        ...driverData,
        equipo: {
            id: teamId
        },
        id: driverId
    };
    return this.http.put<Driver>(`${this.apiUrlPilotos}`, piloto);
  }
  
  deleteDriver(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrlPilotos}/${id}`);
  }

  updateCar(teamId: number, carId: number, carData: any): Observable<Car> {
    const coche = {
        ...carData,
        equipo: {
            id: teamId
        },
        id: carId
    };
    return this.http.put<Car>(`${this.apiUrlCoches}`, coche);
  }

  addCar(teamId: number, car: Partial<Car>): Observable<Car> {
    const coche = {
        ...car,
        equipo: {
            id: teamId
        }
    };
    return this.http.post<Car>(`${this.apiUrlCoches}`, coche);
  }

  deleteCar(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrlCoches}/${id}`);
  }

  createTeam(teamData: { nombre: string, logo: string, twitter: string, id_usuario_creador: number}): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, teamData);
  }
}