import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Poll } from '../models/poll.interface';
import { TeamsService } from './teams.service';


export interface Vote {
  pollId: number;
  driverId: number;
  voterName: string;
  voterEmail: string;
}

@Injectable({ providedIn: 'root' })
export class PollsService {

  private apiUrl = 'http://localhost:8080/api/votaciones';

  constructor(private http: HttpClient, private teamsService: TeamsService) {}

  getPolls(): Observable<Poll[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
    map(polls =>
      polls.map(p => ({
        ...p,
        limite: new Date(p.limite)
      }))
    )
  );
  }

  getPollDetail(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      switchMap(poll =>
        this.teamsService.getTeams().pipe(
          map(teams => {
            const fullDrivers = [];

            for (const driverId of poll.id_pilotos) {
              for (const team of teams) {
                const driver = team.pilotos.find(d => d.id === driverId);
                if (driver) {
                  fullDrivers.push({ ...driver, teamName: team.nombre });
                  break;
                }
              }
            }

            const limite = new Date(poll.limite);

            return {
              poll: {
                ...poll,
                limite
              },
              drivers: fullDrivers,
              isExpired: new Date() > limite,
              totalVotes: this.calculateTotalVotes(poll.votos || {})
            };
          })
        )
      )
    );
  }

  createPoll(poll: Partial<Poll>): Observable<Poll> {
    return this.http.post<Poll>(`${this.apiUrl}/admin`, poll);
  }

  deletePoll(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/admin/${id}`);
  }

  submitVote(vote: Vote): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/${vote.pollId}/vote`, vote);
  }

  private calculateTotalVotes(votes: any): number {
    return Object.values(votes).reduce((a: any, b: any) => a + b, 0) as number;
  }
}