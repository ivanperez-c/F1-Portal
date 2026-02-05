import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.interface';
import { Car } from '../models/car.interface';
import { Driver } from '../models/driver.interface';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  
  private apiUrlEquipos = 'http://localhost:8080/api/equipos';

  constructor(private http: HttpClient) { }

  getTeamById(id: number): Observable<Team> {
     return this.http.get<Team>(`${this.apiUrlEquipos}/${id}`);
  }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(this.apiUrlEquipos);
  }

  addResponsible(teamId: number, username: string): Observable<User> {
     return this.http.post<User>(`${this.apiUrlEquipos}/${teamId}/responsibles`, { username });
  }

  deleteResponsible(teamId: number, username: string): Observable<boolean> {
     return this.http.delete<boolean>(`${this.apiUrlEquipos}/${teamId}/responsibles/${username}`);
  }

  addDriver(teamId: number, driver: Partial<Driver>): Observable<Driver> {
     return this.http.post<Driver>(`${this.apiUrlEquipos}/${teamId}/drivers`, driver);
  }

  deleteDriver(teamId: number, id: number): Observable<boolean> {
     return this.http.delete<boolean>(`${this.apiUrlEquipos}/${teamId}/drivers/${id}`);
  }

  addCar(teamId: number, car: Partial<Car>): Observable<Car> {
     return this.http.post<Car>(`${this.apiUrlEquipos}/${teamId}/cars`, car);
  }

  deleteCar(teamId: number, id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrlEquipos}/${teamId}/cars/${id}`);
  }

  createTeam(teamData: { nombre: string, logo: string, twitter: string, id_usuario_creador: number}): Observable<Team> {
    return this.http.post<Team>(this.apiUrlEquipos, teamData);
  }
}