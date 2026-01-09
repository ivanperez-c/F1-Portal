import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Team } from '../models/team.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private apiUrl = 'http://localhost:8080/api/teams'; 

  constructor(private http: HttpClient) { }

  private mockTeams: Team[] = [
    {
      id: 1,
      name: 'Scuderia Ferrari HP',
      logo: 'https://media.formula1.com/content/dam/fom-website/teams/2025/ferrari-logo.png.transform/2col/image.png',
      drivers: [
        { 
          id: 16, firstname: 'Charles', lastname: 'Leclerc', code: 'LEC', number: 16, country: 'Monaco', 
          photo: 'https://media.formula1.com/content/dam/fom-website/drivers/C/CHALEC01_Charles_Leclerc/chalec01.png.transform/2col/image.png' 
        },
        { 
          id: 44, firstname: 'Lewis', lastname: 'Hamilton', code: 'HAM', number: 44, country: 'United Kingdom', 
          photo: 'https://media.formula1.com/content/dam/fom-website/drivers/L/LEWHAM01_Lewis_Hamilton/lewham01.png.transform/2col/image.png' 
        }
      ]
    },
    {
      id: 2,
      name: 'Oracle Red Bull Racing',
      logo: 'https://media.formula1.com/content/dam/fom-website/teams/2025/red-bull-racing-logo.png.transform/2col/image.png',
      drivers: [
        { 
          id: 1, firstname: 'Max', lastname: 'Verstappen', code: 'VER', number: 1, country: 'Netherlands', 
          photo: 'https://media.formula1.com/content/dam/fom-website/drivers/M/MAXVER01_Max_Verstappen/maxver01.png.transform/2col/image.png' 
        },
        { 
          id: 30, firstname: 'Liam', lastname: 'Lawson', code: 'LAW', number: 30, country: 'New Zealand', 
          photo: 'https://media.formula1.com/content/dam/fom-website/drivers/L/LIALAW01_Liam_Lawson/lialaw01.png.transform/2col/image.png' 
        }
      ]
    },
    {
      id: 3,
      name: 'Aston Martin Aramco',
      logo: 'https://media.formula1.com/content/dam/fom-website/teams/2025/aston-martin-logo.png.transform/2col/image.png',
      drivers: [
        { 
          id: 14, firstname: 'Fernando', lastname: 'Alonso', code: 'ALO', number: 14, country: 'Spain', 
          photo: 'https://media.formula1.com/content/dam/fom-website/drivers/F/FERALO01_Fernando_Alonso/feralo01.png.transform/2col/image.png' 
        },
        { 
          id: 18, firstname: 'Lance', lastname: 'Stroll', code: 'STR', number: 18, country: 'Canada', 
          photo: 'https://media.formula1.com/content/dam/fom-website/drivers/L/LANSTR01_Lance_Stroll/lanstr01.png.transform/2col/image.png' 
        }
      ]
    }
  ];

  getTeams(): Observable<Team[]> {
    return of(this.mockTeams).pipe(delay(500));

    // return this.http.get<Team[]>(this.apiUrl);
  }
}