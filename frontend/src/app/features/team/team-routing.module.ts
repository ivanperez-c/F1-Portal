import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamLayoutComponent } from './team-layout/team-layout';
import { TeamManagement } from './team-management/team-management';
import { FuelCalculatorComponent } from './fuel-calculator/fuel-calculator';
import { ErsSimulatorComponent } from './ers-simulator/ers-simulator';
import { authGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: TeamLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'gestion', pathMatch: 'full' },
      { path: 'gestion', component: TeamManagement },
      { path: 'gasolina', component: FuelCalculatorComponent},
      { path: 'ers', component: ErsSimulatorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }