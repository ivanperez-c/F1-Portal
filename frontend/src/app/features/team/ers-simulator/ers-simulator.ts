import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TeamsService } from '../../../core/services/teams.service';
import { SimulationService } from '../../../core/services/simulation.service';
import { AuthService } from '../../../core/services/auth.service';
import { CircuitService } from '../../../core/services/circuit.service';

@Component({
  selector: 'app-ers-simulator',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ers-simulator.html',
  styleUrls: ['./ers-simulator.scss']
})
export class ErsSimulatorComponent implements OnInit {
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
    this.form = this.fb.group({
      carId: [null, Validators.required],
      circuitId: [null, Validators.required],
      mode: ['NORMAL', Validators.required]
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['teamId']) {
        this.currentTeamId = Number(params['teamId']);
      } else {
        this.currentTeamId = this.authSrv.getUser()?.teamId || 1;
      }
      this.loadData();
    });
  }

  loadData() {
    this.teamSrv.getTeamById(this.currentTeamId).subscribe(t => this.cars = t.cars);
    this.circuitSrv.getCircuits().subscribe(c => this.circuits = c);
  }

  sim() {
    if(this.form.valid) {
      this.loading = true;
      this.result = null;
      this.simSrv.calculateErs(this.form.value).subscribe(res => { this.result = res; this.loading = false; });
    }
  }
}