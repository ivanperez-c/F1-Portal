import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarService } from '../../../core/services/calendar.service';
import { Circuit } from '../../../core/models/circuit.interface';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss']
})
export class Calendar implements OnInit {

  circuits: Circuit[] = [];
  loading: boolean = true;
  today: Date = new Date();

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.calendarService.getCalendar().subscribe(data => {
      this.circuits = data;
      this.loading = false;
    });
  }

  isFinished(date: Date): boolean {
    return new Date(date) < this.today;
  }
}