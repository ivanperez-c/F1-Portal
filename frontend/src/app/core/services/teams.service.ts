import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Team } from '../models/team.interface';
import { Car } from '../models/car.interface';
import { Driver } from '../models/driver.interface';
import { User } from '../models/user.interface';

@Injectable({ providedIn: 'root' })
export class TeamsService {
  
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

  getTeamById(id: number): Observable<Team> {
    const team = this.mockTeams.find(t => t.id === id);
    return team ? of(team).pipe(delay(600)) : throwError(() => new Error('Not Found'));
  }

  addResponsible(teamId: number, username: string): Observable<User> {
    const team = this.mockTeams.find(t => t.id === teamId);
    if(team) {
      const newUser: User = { 
        username: username,
        role: 'TEAM', 
        teamId: teamId
      };
      team.users.push(newUser);
      return of(newUser).pipe(delay(600));
    }
    return throwError(() => new Error('Error'));
  }

  deleteResponsible(teamId: number, username: string): Observable<boolean> {
    const team = this.mockTeams.find(t => t.id === teamId);
    if (team) {
      team.users = team.users.filter(u => u.username !== username);
      return of(true).pipe(delay(600));
    }
    return of(false);
  }

  addDriver(teamId: number, driver: Partial<Driver>): Observable<Driver> {
    const team = this.mockTeams.find(t => t.id === teamId);
    if(team) {
      const newD = { ...driver, id: Date.now(), photo: 'assets/default.png' } as Driver;
      team.drivers.push(newD);
      return of(newD).pipe(delay(600));
    }
    return throwError(() => new Error('Err'));
  }

  deleteDriver(teamId: number, id: number): Observable<boolean> {
    const t = this.mockTeams.find(x => x.id === teamId);
    if (t) { t.drivers = t.drivers.filter(d => d.id !== id); return of(true).pipe(delay(600)); }
    return of(false);
  }

  addCar(teamId: number, car: Partial<Car>): Observable<Car> {
    const t = this.mockTeams.find(x => x.id === teamId);
    if(t) {
      const newC = { ...car, id: Date.now() } as Car;
      t.cars.push(newC);
      return of(newC).pipe(delay(600));
    }
    return throwError(() => new Error('Err'));
  }

  deleteCar(teamId: number, id: number): Observable<boolean> {
    const t = this.mockTeams.find(x => x.id === teamId);
    if (t) { t.cars = t.cars.filter(c => c.id !== id); return of(true).pipe(delay(600)); }
    return of(false);
  }

  getTeams(): Observable<Team[]> {
    return of(this.mockTeams).pipe(delay(500));
  }
}