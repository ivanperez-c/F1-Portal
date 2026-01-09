import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Circuit } from '../models/circuit.interface';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private apiUrl = 'http://localhost:8080/api/calendar';

  constructor(private http: HttpClient) { }

  private mockCircuits: Circuit[] = [
    {
      id: 1,
      name: 'Gran Premio de Bahrein - Sakhir International Circuit',
      date: new Date('2024-03-02'),
      city: 'Sakhir',
      country: 'Bahrein',
      image: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Bahrain%20carbon.png.transform/2col/image.png'
    },
    {
      id: 2,
      name: 'Gran Premio de Arabia Saudí - Jeddah Corniche Circuit',
      date: new Date('2025-05-09'),
      city: 'Jeddah',
      country: 'Arabia Saudí',
      image: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Saudi%20Arabia%20carbon.png.transform/2col/image.png'
    },
    {
      id: 3,
      name: 'Gran Premio de Australia - Albert Park Circuit',
      date: new Date('2026-06-24'),
      city: 'Melbourne',
      country: 'Australia',
      image: 'https://media.formula1.com/image/upload/content/dam/fom-website/2018-redesign-assets/Track%20icons%204x3/Australia%20carbon.png.transform/2col/image.png'
    }
  ];

  getCalendar(): Observable<Circuit[]> {
    return of(this.mockCircuits).pipe(delay(600));

    /*
    return this.http.get<Circuit[]>(this.apiUrl).pipe(
      map(circuits => circuits.map(c => ({
        ...c,
        date: new Date(c.date)
      })))
    );
    */
  }
}