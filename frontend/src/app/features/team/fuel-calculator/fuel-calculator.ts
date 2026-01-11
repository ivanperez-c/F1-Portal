import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../../../core/services/teams.service';
import { SimulationService } from '../../../core/services/simulation.service';
import { AuthService } from '../../../core/services/auth.service';
import { CircuitService } from '../../../core/services/circuit.service';

@Component({
  selector: 'app-fuel-calculator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './fuel-calculator.html',
  styleUrls: ['./fuel-calculator.scss']
})
export class FuelCalculatorComponent implements OnInit {
  form: FormGroup;
  cars: any[] = [];
  circuits: any[] = [];
  result: any;
  loading = false;
  currentTeamId!: number;

  constructor(
    private fb: FormBuilder,
    private teamSrv: TeamsService,
    private simSrv: SimulationService,
    private authSrv: AuthService,
    private route: ActivatedRoute,
    private circuitSrv: CircuitService,
  ) {
    this.form = this.fb.group({ carId: [null, Validators.required], circuitId: [null, Validators.required] });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const adminTeamId = params['teamId'];

      if (adminTeamId) {
        this.currentTeamId = Number(adminTeamId);
      } else {
        const user = this.authSrv.getUser();
        this.currentTeamId = user?.teamId || 1;
      }

      this.loadData();
    });
  }

  loadData() {
    this.teamSrv.getTeamById(this.currentTeamId).subscribe(t => this.cars = t.cars);
    this.circuitSrv.getCircuits().subscribe(c => this.circuits = c);
  }

  calc() {
    if(this.form.valid) {
      this.loading = true;
      this.result = null;
      this.simSrv.calculateFuel(this.form.value).subscribe(res => { this.result = res; this.loading = false; });
    }
  }
}