import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircuitService } from '../../../core/services/circuit.service';
import { Circuit } from '../../../core/models/circuit.interface';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss']
})
export class Calendar implements OnInit {

  circuits: any[] = [];
  loading: boolean = true;
  today: Date = new Date();

  constructor(private circuitsService: CircuitService) {}

  ngOnInit(): void {
    this.circuitsService.getCircuits().subscribe((data:any) => {
      this.circuits = data;
      this.loading = false;
    });
  }

  isFinished(date: Date): boolean {
    return new Date(date) < this.today;
  }
}