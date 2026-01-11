import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CircuitService } from '../../../core/services/circuit.service';
import { Circuit } from '../../../core/models/circuit.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-circuits',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-circuits.component.html',
  styleUrls: ['./admin-circuits.component.scss']
})
export class AdminCircuitsComponent implements OnInit {

  circuits: Circuit[] = [];
  isLoading = true;
  showForm = false;
  
  isEditing = false;
  editingId: number | null = null;
  
  circuitForm: FormGroup;

  constructor(
    private circuitService: CircuitService,
    private fb: FormBuilder
  ) {
    this.circuitForm = this.fb.group({
      name: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      image: ['', Validators.required],
      length: [null, [Validators.required, Validators.min(1)]],
      laps: [null, [Validators.required, Validators.min(1)]],
      cornersSlow: [null, [Validators.required, Validators.min(0)]],
      cornersMedium: [null, [Validators.required, Validators.min(0)]],
      cornersFast: [null, [Validators.required, Validators.min(0)]],
      isInCalendar: [false],
      date: ['']
    });
  }

  ngOnInit() {
    this.loadCircuits();
    this.setupDateValidation();
  }

  setupDateValidation() {
    this.circuitForm.get('isInCalendar')?.valueChanges.subscribe(checked => {
      const dateControl = this.circuitForm.get('date');
      if (checked) {
        dateControl?.setValidators(Validators.required);
      } else {
        dateControl?.clearValidators();
        dateControl?.setValue('');
      }
      dateControl?.updateValueAndValidity();
    });
  }

  loadCircuits() {
    this.isLoading = true;
    this.circuitService.getCircuits().subscribe({
      next: (data) => { this.circuits = data; this.isLoading = false; },
      error: () => this.isLoading = false
    });
  }

  openCreate() {
    this.isEditing = false;
    this.editingId = null;
    this.circuitForm.reset({ isInCalendar: false });
    this.showForm = true;
  }

  openEdit(circuit: Circuit) {
    this.isEditing = true;
    this.editingId = circuit.id;
    
    this.circuitForm.patchValue({
      name: circuit.name,
      city: circuit.city,
      country: circuit.country,
      image: circuit.image,
      length: circuit.length,
      laps: circuit.laps,
      cornersSlow: circuit.cornersSlow,
      cornersMedium: circuit.cornersMedium,
      cornersFast: circuit.cornersFast,
      isInCalendar: circuit.isInCalendar,
      date: circuit.date ? this.formatDate(circuit.date) : ''
    });

    this.showForm = true;
    
    setTimeout(() => {
      document.querySelector('.form-container')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  private formatDate(dateInput: Date | string): string {
    if (!dateInput) return '';
    const d = new Date(dateInput);
    return d.toISOString().split('T')[0];
  }

  closeForm() {
    this.showForm = false;
    this.circuitForm.reset();
  }

  onSubmit() {
    if (this.circuitForm.invalid) return;

    const formVal = this.circuitForm.value;
    const circuitData: any = {
      ...formVal,
      length: Number(formVal.length),
      laps: Number(formVal.laps),
      cornersSlow: Number(formVal.cornersSlow),
      cornersMedium: Number(formVal.cornersMedium),
      cornersFast: Number(formVal.cornersFast),
      isInCalendar: formVal.isInCalendar,
      date: formVal.isInCalendar ? formVal.date : undefined
    };

    if (this.isEditing && this.editingId) {
      this.circuitService.updateCircuit(this.editingId, circuitData).subscribe(() => {
        const idx = this.circuits.findIndex(c => c.id === this.editingId);
        if (idx !== -1) {
          this.circuits[idx] = { ...this.circuits[idx], ...circuitData };
        }
        this.closeForm();
        this.showToast('Circuito actualizado');
      });

    } else {
      this.circuitService.createCircuit(circuitData).subscribe(() => {
        this.circuits.push({ ...circuitData, id: Date.now() });
        this.closeForm();
        this.showToast('Circuito creado');
      });
    }
  }

  deleteCircuit(circuit: Circuit) {
    Swal.fire({
      title: '¿Eliminar Circuito?',
      text: `Se borrará ${circuit.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e10600',
      background: '#141414', color: '#fff',
      confirmButtonText: 'Sí, borrar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.circuitService.deleteCircuit(circuit.id).subscribe({
          next: () => {
            this.circuits = this.circuits.filter(c => c.id !== circuit.id);
            this.showToast('Circuito eliminado');
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'No se puede borrar un circuito activo en el calendario.',
              background: '#141414', color: '#fff', confirmButtonColor: '#e10600'
            });
          }
        });
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