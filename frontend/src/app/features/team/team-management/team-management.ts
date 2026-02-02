import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeamsService } from '../../../core/services/teams.service';
import { AuthService } from '../../../core/services/auth.service';
import { Team } from '../../../core/models/team.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

type ModalType = 'USER' | 'DRIVER' | 'CAR' | null;

@Component({
  selector: 'app-team-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './team-management.html',
  styleUrls: ['./team-management.scss']
})
export class TeamManagement implements OnInit {
  
  team!: Team;
  isLoading = true;
  isSubmitting = false;
  myTeamId!: number; 
  currentModal: ModalType = null;
  createTeamForm: FormGroup;
  userForm: FormGroup;
  driverForm: FormGroup;
  carForm: FormGroup;
  user: any = null;
  hasTeam: boolean = false;
  isCreating = false;

  constructor(
    private router: Router,
    private teamsService: TeamsService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.userForm = this.fb.group({
      usuario: ['', [Validators.required]]
    });

    this.driverForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      code: ['', [Validators.required, Validators.maxLength(3)]],
      number: ['', Validators.required],
      country: ['', Validators.required],
      photo: ['', Validators.required]
    });

    this.carForm = this.fb.group({
      name: ['', Validators.required], 
      code: ['', Validators.required],
      consumption: ['', Validators.required],
      ersSlow: ['', Validators.required],
      ersMedium: ['', Validators.required],
      ersFast: ['', Validators.required]
    });

    this.createTeamForm = this.fb.group({
      name: ['', Validators.required],
      logo: ['', Validators.required],
      twitter: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      
      if (user?.teamId) {
        this.hasTeam = true;
        this.loadTeam(user.teamId);
      } else {
        this.hasTeam = false;
        this.isLoading = false;
      }
    });
  }

  loadTeam(id: number) {
    this.isLoading = true;
    this.teamsService.getTeamById(id).subscribe({
      next: (data) => {
        this.team = JSON.parse(JSON.stringify(data)); 
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onSubmitCreate() {
    if (this.createTeamForm.invalid) return;

    this.isCreating = true;
    const formVal = this.createTeamForm.value;

    const newTeamData = {
      nombre: formVal.nombre,
      logo: formVal.logo,
      twitter: formVal.twitter,
      id_usuario_creador: this.user.id
    };

    this.teamsService.createTeam(newTeamData).subscribe({
      next: (newTeam) => {
        this.authService.updateUserTeam(newTeam.id);
        Swal.fire({
          icon: 'success',
          title: '¡Escudería Fundada!',
          text: `Bienvenido al paddock, ${newTeam.nombre}.`,
          background: '#141414', color: '#fff', confirmButtonColor: '#e10600'
        });
        this.isCreating = false;
      },
      error: () => {
        this.isCreating = false;
        Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo crear el equipo.' });
      }
    });
  }

  openModal(type: ModalType) {
    this.currentModal = type;
    this.userForm.reset();
    this.driverForm.reset();
    this.carForm.reset();
  }

  closeModal() { this.currentModal = null; }

  submitUser() {
    if (this.userForm.invalid) return;
    this.isSubmitting = true;
    
    this.teamsService.addResponsible(this.myTeamId, this.userForm.value.usuario).subscribe(u => {
      this.team.users.push(u);
      this.isSubmitting = false;
      this.closeModal();
      this.showToast('Usuario autorizado');
    });
  }

  submitDriver() {
    if (this.driverForm.invalid) return;
    this.isSubmitting = true;
    const val = this.driverForm.value;
    val.code = val.code.toUpperCase();

    this.teamsService.addDriver(this.myTeamId, val).subscribe(d => {
      this.team.drivers.push(d);
      this.isSubmitting = false;
      this.closeModal();
      this.showToast('Piloto fichado');
    });
  }

  submitCar() {
    if (this.carForm.invalid) return;
    this.isSubmitting = true;
    this.teamsService.addCar(this.myTeamId, this.carForm.value).subscribe(c => {
      this.team.cars.push(c);
      this.isSubmitting = false;
      this.closeModal();
      this.showToast('Coche registrado');
    });
  }

  deleteItem(type: 'USER' | 'DRIVER' | 'CAR', id: number | string) { 
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e10600',
      cancelButtonColor: '$c-border',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#141414',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        
        if (type === 'USER') {
          this.teamsService.deleteResponsible(this.myTeamId, id as string).subscribe(() => {
            this.team.users = this.team.users.filter(u => u.usuario !== id);
            this.showToast('Acceso eliminado');
          });
        } else if (type === 'DRIVER') {
          this.teamsService.deleteDriver(this.myTeamId, id as number).subscribe(() => {
            this.team.drivers = this.team.drivers.filter(d => d.id !== id);
            this.showToast('Piloto eliminado');
          });
        } else if (type === 'CAR') {
          this.teamsService.deleteCar(this.myTeamId, id as number).subscribe(() => {
            this.team.cars = this.team.cars.filter(c => c.id !== id);
            this.showToast('Coche eliminado');
          });
        }
      }
    });
  }

  private showToast(msg: string) {
    Swal.mixin({
      toast: true, position: 'top-end', showConfirmButton: false, timer: 3000,
      background: '#141414', color: '#fff', iconColor: '#e10600', timerProgressBar: true
    }).fire({ icon: 'success', title: msg });
  }
}