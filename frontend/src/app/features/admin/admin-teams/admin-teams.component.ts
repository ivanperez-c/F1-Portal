import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TeamsService } from '../../../core/services/teams.service';
import { Team } from '../../../core/models/team.interface';

@Component({
  selector: 'app-admin-teams',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-teams.component.html',
  styleUrls: ['./admin-teams.component.scss']
})
export class AdminTeamsComponent implements OnInit {

  teams: Team[] = [];
  isLoading = true;

  constructor(private teamsService: TeamsService) {}

  ngOnInit() {
    this.loadTeams();
  }

  loadTeams() {
    this.isLoading = true;
    this.teamsService.getTeams().subscribe({
      next: (data) => {
        this.teams = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
      }
    });
  }
}