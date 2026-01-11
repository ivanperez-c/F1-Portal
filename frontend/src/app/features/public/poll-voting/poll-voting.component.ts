import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PollsService } from '../../../core/services/polls.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-poll-voting',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './poll-voting.component.html',
  styleUrls: ['./poll-voting.component.scss']
})
export class PollVotingComponent implements OnInit {

  polls: any[] = [];
  activePoll: any = null;
  now = new Date();
  voteForm: FormGroup;
  isSubmitting = false;
  selectedDriverId: number | null = null;

  constructor(
    private pollsService: PollsService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.voteForm = this.fb.group({
      voterName: ['', Validators.required],
      voterEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.loadList();
  }

  loadList() {
    this.pollsService.getPolls().subscribe(data => this.polls = data);
  }

  selectPoll(id: number) {
    this.activePoll = null;
    this.selectedDriverId = null;
    this.voteForm.reset();

    this.pollsService.getPollDetail(id).subscribe(data => {
      this.activePoll = data;
    });
  }

  selectDriver(driverId: number) {
    if (this.activePoll.isExpired) return;
    this.selectedDriverId = driverId;
  }

  submitVote() {
    if (this.voteForm.invalid) {
      this.voteForm.markAllAsTouched();
      return;
    }
    if (!this.selectedDriverId) {
      Swal.fire({ icon: 'warning', title: 'Debes elegir un piloto', toast: true });
      return;
    }

    this.isSubmitting = true;
    const voteData = {
      pollId: this.activePoll.poll.id,
      driverId: this.selectedDriverId,
      ...this.voteForm.value
    };

    this.pollsService.submitVote(voteData).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: '¡Voto registrado!',
          text: 'Gracias por participar.',
          background: '#141414', color: '#fff', confirmButtonColor: '#e10600'
        });

        this.selectedDriverId = null;
        this.voteForm.reset();
      },
      error: (err) => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.message,
          background: '#141414', color: '#fff', confirmButtonColor: '#e10600'
        });
      }
    });
  }

  getPercent(votes: number): number {
    if (!this.activePoll.totalVotes) return 0;
    return Math.round((votes / this.activePoll.totalVotes) * 100);
  }
}