import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeamsService } from '../../../core/services/teams.service';
import { Team } from '../../../core/models/team.interface';

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './teams.html',
  styleUrls: ['./teams.scss']
})
export class Teams implements OnInit {

  teams: Team[] = [];
  loading: boolean = true;

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.loading = true;
    this.teamsService.getTeams().subscribe({
      next: (data) => {
        this.teams = data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });
  }
}