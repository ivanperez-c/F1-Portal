import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamLayoutComponent } from './team-layout/team-layout';
import { TeamManagement } from './team-management/team-management';
import { FuelCalculator } from './fuel-calculator/fuel-calculator';
import { ErsSimulator } from './ers-simulator/ers-simulator';
import { teamGuard } from '../../core/guards/team.guard';

const routes: Routes = [
  {
    path: '',
    component: TeamLayoutComponent,
    canActivate: [teamGuard],
    children: [
      { path: '', redirectTo: 'gestion', pathMatch: 'full' },
      { path: 'gestion', component: TeamManagement },
      { path: 'gasolina', component: FuelCalculator},
      { path: 'ers', component: ErsSimulator }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }