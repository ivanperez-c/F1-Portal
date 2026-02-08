import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeamsService } from '../../../core/services/teams.service';
import { AuthService } from '../../../core/services/auth.service';
import { Team } from '../../../core/models/team.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ImageUploaderComponent } from '../../../shared/image-uploader/image-uploader';

type ModalType = 'USER' | 'DRIVER' | 'CAR' | null;

@Component({
  selector: 'app-team-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageUploaderComponent],
  templateUrl: './team-management.html',
  styleUrls: ['./team-management.scss']
})
export class TeamManagement implements OnInit {
  
  team!: Team;
  isLoading = true;
  isSubmitting = false;
  currentModal: ModalType = null;
  createTeamForm: FormGroup;
  userForm: FormGroup;
  driverForm: FormGroup;
  carForm: FormGroup;
  user: any = null;
  hasTeam: boolean = false;
  isCreating = false;
  editingId: number | null = null;

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
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      siglas: ['', [Validators.required, Validators.maxLength(3)]],
      dorsal: ['', Validators.required],
      pais: ['', Validators.required],
      foto: ['', Validators.required],
      twitter: ['', Validators.required]
    });

    this.carForm = this.fb.group({
      nombre: ['', Validators.required], 
      codigo: ['', Validators.required],
      consumo: ['', Validators.required],
      ers_curva_lenta: ['', Validators.required],
      ers_curva_media: ['', Validators.required],
      ers_curva_rapida: ['', Validators.required]
    });

    this.createTeamForm = this.fb.group({
      nombre: ['', Validators.required],
      logo: ['', Validators.required],
      twitter: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.user$.subscribe(user => {
      this.user = user;
      
      if (user?.id_equipo) {
        this.hasTeam = true;
        this.loadTeam(user.id_equipo);
      } else {
        this.hasTeam = false;
        this.isLoading = false;
      }
    });
  }
  

  loadTeam(id: number) {
    this.isLoading = true;
    this.teamsService.getTeamById(id, this.user?.id).subscribe({
      next: (data) => {
        this.team = JSON.parse(JSON.stringify(data)); 
        
        if (!this.team.pilotos) this.team.pilotos = [];
        if (!this.team.coches) this.team.coches = [];
        if (!this.team.responsables) this.team.responsables = [];
        
        this.isLoading = false;
      },
      error: () => this.isLoading = false
    });
  }

  onSubmitCreate() {
    if (this.createTeamForm.invalid) return;
    this.isCreating = true;
    
    const newTeamData = {
      nombre: this.createTeamForm.value.nombre,
      logo: this.createTeamForm.value.logo,
      twitter: this.createTeamForm.value.twitter,
      id_usuario_creador: this.user.id
    };

    this.teamsService.createTeam(newTeamData).subscribe({
      next: (newTeam: Team) => { 

        this.isCreating = false;

        if (newTeam && newTeam.id) {
          
          this.authService.updateUserTeam(newTeam.id);
          
          this.team = newTeam;
          
          if (!this.team.pilotos) this.team.pilotos = [];
          if (!this.team.coches) this.team.coches = [];
          if (!this.team.responsables) this.team.responsables = [];

          Swal.fire({
            icon: 'success',
            title: '¡Escudería Fundada!',
            text: `Bienvenido al paddock, ${newTeam.nombre}.`,
            background: '#141414', 
            color: '#fff', 
            confirmButtonColor: '#e10600'
          });

        } else {
          console.warn('El backend respondió 200 OK pero el cuerpo está vacío o sin ID:', newTeam);
          
          Swal.fire({
            icon: 'warning',
            title: 'Respuesta inesperada',
            text: 'El equipo parece haberse creado, pero no hemos recibido los datos de vuelta. Mira la consola (F12).',
            confirmButtonText: 'Recargar página',
            background: '#141414', 
            color: '#fff', 
            confirmButtonColor: '#e10600'
          }).then(() => window.location.reload());
        }
      },
      error: (err) => {
        this.isCreating = false;
      }
    });
  }

  openModal(type: ModalType, item: any = null) {
    this.currentModal = type;
    this.userForm.reset();
    this.driverForm.reset();
    this.carForm.reset();

    if (item) {
      this.editingId = item.id;
      if (type === 'DRIVER') this.driverForm.patchValue(item);
      if (type === 'CAR') this.carForm.patchValue(item);
      if (type === 'USER') this.userForm.patchValue({ usuario: item.usuario });
    } else {
      this.editingId = null;
    }
  }

  closeModal() {
    this.currentModal = null;
    this.editingId = null;
  }

  submitUser() {
    if (this.userForm.invalid) return;
    this.isSubmitting = true;
    
    this.teamsService.addResponsible(this.user.id_equipo, this.userForm.value.usuario).subscribe(u => {
      this.team.responsables.push(u);
      this.isSubmitting = false;
      this.closeModal();
      this.showToast('Usuario autorizado');
    });
  }

  submitDriver() {
    if (this.driverForm.invalid) return;
    this.isSubmitting = true;
    
    const val = this.driverForm.value;
    val.siglas = val.siglas.toUpperCase();

    if (this.editingId) {
      this.teamsService.updateDriver(this.team.id, this.editingId as number, val).subscribe({
        next: (updatedDriver) => {
          const index = this.team.pilotos.findIndex((d: any) => d.id === this.editingId);
          if (index !== -1 && updatedDriver) {
             this.team.pilotos[index] = updatedDriver;
          } else {
             this.loadTeam(this.team.id);
          }
          this.isSubmitting = false;
          this.closeModal();
          this.showToast('Piloto actualizado');
        },
        error: () => this.isSubmitting = false
      });

    } else {
      this.teamsService.addDriver(this.team.id, val).subscribe({
        next: (newDriver) => {
          if (newDriver && newDriver.id) {
            this.team.pilotos.push(newDriver);
          } else {
            this.loadTeam(this.team.id);
          }
          
          this.isSubmitting = false;
          this.closeModal();
          this.showToast('Piloto fichado');
        },
        error: () => this.isSubmitting = false
      });
    }
  }

  submitCar() {
    if (this.carForm.invalid) return;
    this.isSubmitting = true;
    const val = this.carForm.value;

    if (this.editingId) {
      this.teamsService.updateCar(this.team.id, this.editingId as number, val).subscribe({
        next: (updatedCar) => {
          const index = this.team.coches.findIndex((c: any) => c.id === this.editingId);
          
          if (index !== -1 && updatedCar) {
            this.team.coches[index] = updatedCar;
          } else {
            this.loadTeam(this.team.id);
          }

          this.isSubmitting = false;
          this.closeModal();
          this.showToast('Coche actualizado');
        },
        error: () => {
          this.isSubmitting = false;
        }
      });

    } else {
      this.teamsService.addCar(this.team.id, val).subscribe({
        next: (newCar) => {
          if (newCar && newCar.id) {
            this.team.coches.push(newCar);
          } else {
            this.loadTeam(this.team.id);
          }

          this.isSubmitting = false;
          this.closeModal();
          this.showToast('Coche fabricado');
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  deleteItem(type: 'USER' | 'DRIVER' | 'CAR', id: number | string | any) { 
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e10600',
      cancelButtonColor: '#7a7479',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#141414',
      color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        
        if (type === 'USER') {
          this.teamsService.deleteResponsible(this.user.id_equipo, id).subscribe(() => {
            this.team.responsables = this.team.responsables.filter(u => u.id !== id);
            this.showToast('Acceso eliminado');
          });
        } else if (type === 'DRIVER') {
          this.teamsService.deleteDriver(id as number).subscribe(() => {
            this.team.pilotos = this.team.pilotos.filter(d => d.id !== id);
            this.showToast('Piloto eliminado');
          });
        } else if (type === 'CAR') {
          this.teamsService.deleteCar(id as number).subscribe(() => {
            this.team.coches = this.team.coches.filter(c => c.id !== id);
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