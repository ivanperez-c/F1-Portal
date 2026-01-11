import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import { AdminUserRequest } from '../../../core/models/admin.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  pendingUsers: AdminUserRequest[] = [];
  isLoading = true;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.adminService.getPendingUsers().subscribe(users => {
      this.pendingUsers = users;
      this.isLoading = false;
    });
  }

  validateUser(user: AdminUserRequest) {
    Swal.fire({
      title: 'Validar Usuario',
      text: `¿Qué rol asignar a ${user.username}?`,
      icon: 'question',
      input: 'radio',
      inputOptions: {
        'TEAM': 'Responsable de Equipo',
        'ADMIN': 'Administrador'
      },
      inputValue: 'TEAM',
      showCancelButton: true,
      confirmButtonText: 'Validar',
      confirmButtonColor: '#e10600',
      background: '#141414', color: '#fff'
    }).then((result) => {
      if (result.isConfirmed) {
        const role = result.value;
        this.adminService.validateUser(user.id, role).subscribe(() => {
          this.pendingUsers = this.pendingUsers.filter(u => u.id !== user.id);
          Swal.fire({ icon: 'success', title: 'Usuario validado', toast: true, position: 'top-end', timer: 3000, showConfirmButton: false });
        });
      }
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: '¿Rechazar solicitud?',
      text: "El usuario será eliminado.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      background: '#141414', color: '#fff'
    }).then((res) => {
      if (res.isConfirmed) {
        this.adminService.deleteUser(id).subscribe(() => {
          this.pendingUsers = this.pendingUsers.filter(u => u.id !== id);
        });
      }
    });
  }
}