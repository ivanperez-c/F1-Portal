import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Asegurar import HttpClient
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
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

  private apiUrl = 'http://localhost:8080/api/polls';

  private polls: Poll[] = [
    // ... tus datos mock ...
    { 
      id: 1, 
      title: 'Piloto del Día - GP Bahrein', 
      description: '¿Quién ha sido el piloto más destacado?', 
      deadline: new Date('2026-04-01'),
      driverIds: [16, 44, 1, 14, 55],
      votes: {} 
    },
    { 
      id: 2, 
      title: 'Mejor Adelantamiento', 
      description: 'Votación cerrada.', 
      deadline: new Date('2025-12-31'),
      driverIds: [1, 16, 44],
      votes: { 1: 50, 16: 120, 44: 80 }
    }
  ];

  private castVotes: Vote[] = [];

  constructor(private http: HttpClient, private teamsService: TeamsService) {}

  /**
   * OBTENER VOTACIONES
   * -------------------------------------------------------------------------
   * Operación: Lista las votaciones públicas disponibles.
   * Endpoint: GET /api/polls
   * @returns Observable<Poll[]> Lista de votaciones.
   */
  getPolls(): Observable<Poll[]> {
    // --- API CALL ---
    // return this.http.get<Poll[]>(this.apiUrl);

    // --- MOCK ---
    return of(this.polls).pipe(delay(500));
  }

  /**
   * DETALLE DE VOTACIÓN
   * -------------------------------------------------------------------------
   * Operación: Obtiene info de una votación (Backend debería devolver pilotos ya poblados).
   * Endpoint: GET /api/polls/{id}
   * @param id ID de la votación
   * @returns Observable<any> Objeto votación enriquecido.
   */
  getPollDetail(id: number): Observable<any> {
    // --- API CALL ---
    // return this.http.get<any>(`${this.apiUrl}/${id}`);

    // --- MOCK (Lógica compleja de cruce de datos en frontend) ---
    const poll = this.polls.find(p => p.id === id);
    if (!poll) return throwError(() => new Error('Votación no encontrada'));

    return new Observable(observer => {
      this.teamsService.getTeams().subscribe(teams => {
        const fullDrivers = [];
        for (const driverId of poll.driverIds) {
          for (const team of teams) {
            const driver = team.drivers.find(d => d.id === driverId);
            if (driver) {
              fullDrivers.push({ ...driver, teamName: team.name });
              break;
            }
          }
        }
        const isExpired = new Date() > new Date(poll.deadline);
        observer.next({
          poll: poll,
          drivers: fullDrivers,
          isExpired: isExpired,
          totalVotes: this.calculateTotalVotes(poll.votes || {})
        });
        observer.complete();
      });
    });
  }

  /**
   * CREAR VOTACIÓN (ADMIN)
   * -------------------------------------------------------------------------
   * Operación: Admin crea una nueva encuesta.
   * Endpoint: POST /api/admin/polls
   * @param poll Objeto Poll
   * @returns Observable<Poll> Votación creada.
   */
  createPoll(poll: Partial<Poll>): Observable<Poll> {
    // --- API CALL ---
    // return this.http.post<Poll>(`${this.apiUrl}/admin`, poll);

    // --- MOCK ---
    const newPoll = { ...poll, id: Date.now(), votes: {} } as Poll;
    this.polls.push(newPoll);
    return of(newPoll).pipe(delay(600));
  }

  /**
   * BORRAR VOTACIÓN (ADMIN)
   * -------------------------------------------------------------------------
   * Endpoint: DELETE /api/admin/polls/{id}
   */
  deletePoll(id: number): Observable<boolean> {
    // --- API CALL ---
    // return this.http.delete<boolean>(`${this.apiUrl}/admin/${id}`);

    // --- MOCK ---
    this.polls = this.polls.filter(p => p.id !== id);
    return of(true).pipe(delay(500));
  }

  /**
   * EMITIR VOTO
   * -------------------------------------------------------------------------
   * Operación: Usuario anónimo vota. Backend debe validar email único por Poll.
   * Endpoint: POST /api/polls/{id}/vote
   * @param vote Objeto Vote { pollId, driverId, email, name }
   * @returns Observable<boolean> Éxito.
   */
  submitVote(vote: Vote): Observable<boolean> {
    // --- API CALL ---
    // return this.http.post<boolean>(`${this.apiUrl}/${vote.pollId}/vote`, vote);

    // --- MOCK ---
    const alreadyVoted = this.castVotes.some(v => v.pollId === vote.pollId && v.voterEmail === vote.voterEmail);
    if (alreadyVoted) return throwError(() => new Error('Este email ya ha sido utilizado.'));

    this.castVotes.push(vote);
    const poll = this.polls.find(p => p.id === vote.pollId);
    if (poll) {
      if (!poll.votes) poll.votes = {};
      poll.votes[vote.driverId] = (poll.votes[vote.driverId] || 0) + 1;
    }
    return of(true).pipe(delay(800));
  }

  private calculateTotalVotes(votes: any): number {
    return Object.values(votes).reduce((a: any, b: any) => a + b, 0) as number;
  }
}