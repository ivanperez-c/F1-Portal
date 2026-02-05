import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import { TeamsService } from '../../../core/services/teams.service';
import { PollsService } from '../../../core/services/polls.service';
import { Poll } from '../../../core/models/poll.interface';
import { Driver } from '../../../core/models/driver.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-votes',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-votes.component.html',
  styleUrls: ['./admin-votes.component.scss']
})
export class AdminVotesComponent implements OnInit {
  
  polls: Poll[] = [];
  allDrivers: Driver[] = [];
  showForm = false;
  pollForm: FormGroup;

  constructor(
    private adminService: AdminService,
    private pollsService: PollsService,
    private teamService: TeamsService,
    private fb: FormBuilder
  ) {
    this.pollForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      selectedDrivers: [[], [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.pollsService.getPolls().subscribe(p => this.polls = p);
    
    this.teamService.getTeams().subscribe(teams => {
      this.allDrivers = teams.flatMap(t => t.pilotos);
    });
  }

  toggleDriverSelection(driverId: number, event: any): void { 
    const current = this.pollForm.get('selectedDrivers')?.value as number[];
    if (event.target.checked) {
      if (current.length >= 10) {
        event.target.checked = false;
        Swal.fire({ icon: 'warning', title: 'Máximo 10 pilotos', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
        return;
      }
      this.pollForm.patchValue({ selectedDrivers: [...current, driverId] });
    } else {
      this.pollForm.patchValue({ selectedDrivers: current.filter(id => id !== driverId) });
    }
  }

  /*
  createPoll(): void {
    const drivers = this.pollForm.get('selectedDrivers')?.value;
    
    if (drivers.length < 5) {
      Swal.fire({ icon: 'error', title: 'Mínimo 5 pilotos requeridos' });
      return;
    }

    if (this.pollForm.invalid) return;

    this.pollsService.createPoll(this.pollForm.value).subscribe(newPoll => {
      this.polls.push(newPoll);
      this.showForm = false;
      this.pollForm.reset({ selectedDrivers: [] });
      
      const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
      checkboxes.forEach(cb => cb.checked = false);

      Swal.fire({ icon: 'success', title: 'Votación creada' });
    });
  }
  */

  createPoll(): void {
    const drivers = this.pollForm.get('selectedDrivers')?.value;
    
    console.log('=== DEBUG INFO ===');
    console.log('Form valid?', this.pollForm.valid);
    console.log('Form value:', this.pollForm.value);
    console.log('Selected drivers:', drivers);
    console.log('Driver count:', drivers?.length);
    console.log('==================');

    if (drivers.length < 5) {
      Swal.fire({ icon: 'error', title: 'Mínimo 5 pilotos requeridos' });
      return;
    }

    if (this.pollForm.invalid) return;

    // Convert deadline string to ISO format for backend
    const deadlineValue = this.pollForm.get('deadline')?.value;  // ← FIXED
    const deadlineDate = new Date(deadlineValue);
    
    // Build the request in the format your backend expects
    const request = {
      votacion: {
        titulo: this.pollForm.get('title')?.value,  // ← FIXED
        descripcion: this.pollForm.get('description')?.value,  // ← FIXED
        limite: deadlineDate.toISOString(),
        permalink: this.generatePermalink(this.pollForm.get('title')?.value),  // ← FIXED
        activo: true
      },
      pilotosIds: this.pollForm.get('selectedDrivers')?.value
    };

    console.log('Sending request:', request);

    this.pollsService.createPoll(request).subscribe({
      next: (newPoll) => {
        this.polls.push(newPoll);
        this.showForm = false;
        this.pollForm.reset({ selectedDrivers: [] });
        
        const checkboxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
        checkboxes.forEach(cb => cb.checked = false);

        Swal.fire({ icon: 'success', title: 'Votación creada' });
      },
      error: (err) => {
        console.error('Error creating poll:', err);
        const errorMsg = err.error?.error || err.error || 'No se pudo crear la votación';
        Swal.fire({ icon: 'error', title: 'Error', text: errorMsg });
      }
    });
  }

  private generatePermalink(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }


  // MÉTODO DE PRUEBA
    isDriverSelected(driverId: number): boolean {
    const selected = this.pollForm.get('selectedDrivers')?.value || [];
    return selected.includes(driverId);
  }

  deletePoll(id: number) {
    Swal.fire({
      title: '¿Borrar votación?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e10600',
      confirmButtonText: 'Sí, borrar',
      background: '#141414', color: '#fff'
    }).then((res) => {
      if(res.isConfirmed) {
        this.pollsService.deletePoll(id).subscribe(() => {
          this.polls = this.polls.filter(p => p.id !== id);
          Swal.fire({ icon: 'success', title: 'Eliminado', toast: true, position: 'top-end', timer: 2000, showConfirmButton: false });
        });
      }
    });
  }
}