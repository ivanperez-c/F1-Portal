import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-circuit-management',
  imports: [CommonModule, RouterModule],
  templateUrl: './team-layout.html',
  styleUrl: './team-layout.scss',
})
export class TeamLayoutComponent {

  private authService = inject(AuthService);
  get isTeamManager(): boolean {
    const user = this.authService.getUser();
    return user?.rol === 'responsable_equipo'; 
  }
}
