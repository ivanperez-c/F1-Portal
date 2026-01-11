import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamsService } from '../../../core/services/teams.service';
import { CircuitService } from '../../../core/services/circuit.service';
import { SimulationService } from '../../../core/services/simulation.service';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/user.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ers-simulator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ers-simulator.html',
  styleUrls: ['./ers-simulator.scss']
})
export class ErsSimulator implements OnInit {
  form: FormGroup;
  cars: any[] = [];
  circuits: any[] = [];
  result: any;
  loading = false;
  currentUser: User | null = null;

  constructor(private router: Router, public authService: AuthService, private fb: FormBuilder, private teamSrv: TeamsService,  private circuitSrv: CircuitService, private simSrv: SimulationService) {
    this.form = this.fb.group({
      carId: [null, Validators.required],
      circuitId: [null, Validators.required],
      mode: ['NORMAL', Validators.required]
    });
    this.currentUser = this.authService.getUser();
  }

  ngOnInit() {
    const user = this.authService.getUser();
    if(user?.teamId != undefined){
      this.teamSrv.getTeamById(user?.teamId).subscribe(t => this.cars = t.cars);
      this.circuitSrv.getCircuits().subscribe(c => this.circuits = c);
    }else{
      Swal.fire({
        title: 'Acceso Restringido',
        text: 'No tienes un equipo asignado.',
        icon: 'error',
        background: '#141414',
        color: '#fff',
        confirmButtonColor: '#e10600',
        confirmButtonText: 'Volver al inicio'
      }).then(() => {
        this.router.navigate(['/']);
      });
    }
  }

  sim() {
    if(this.form.valid) {
      this.loading = true;
      this.result = null;
      this.simSrv.calculateErs(this.form.value).subscribe(res => { this.result = res; this.loading = false; });
    }
  }
}