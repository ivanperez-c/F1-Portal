import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CircuitService } from '../../../core/services/circuit.service';
import { Circuit } from '../../../core/models/circuit.interface';
import Swal from 'sweetalert2';
import { ImageUploaderComponent } from '../../../shared/image-uploader/image-uploader';

@Component({
  selector: 'app-admin-circuits',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ImageUploaderComponent],
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
      nombre: ['', Validators.required],
      ciudad: ['', Validators.required],
      pais: ['', Validators.required],
      trazado: ['', Validators.required],
      longitud: [null, [Validators.required, Validators.min(1)]],
      numero_vueltas: [null, [Validators.required, Validators.min(1)]],
      curvas_lentas: [null, [Validators.required, Validators.min(0)]],
      curvas_media: [null, [Validators.required, Validators.min(0)]],
      curvas_rapidas: [null, [Validators.required, Validators.min(0)]],
      calendario: [false],
      fechaCarrera: ['']
    });
  }

  ngOnInit() {
    this.loadCircuits();
    this.setupDateValidation();
  }

  setupDateValidation() {
    this.circuitForm.get('calendario')?.valueChanges.subscribe(checked => {
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
    this.circuitForm.reset({ calendario: false });
    this.showForm = true;
  }

  openEdit(circuit: Circuit) {
    this.isEditing = true;
    this.editingId = circuit.id;
    
    this.circuitForm.patchValue({
      nombre: circuit.nombre,
      ciudad: circuit.ciudad,
      pais: circuit.pais,
      trazado: circuit.trazado,
      longitud: circuit.longitud,
      numero_vueltas: circuit.numero_vueltas,
      curvas_lentas: circuit.curvas_lentas,
      curvas_media: circuit.curvas_media,
      curvas_rapidas: circuit.curvas_rapidas,
      calendario: circuit.calendario,
      fechaCarrera: circuit.fecha_carrera ? this.formatDate(circuit.fecha_carrera) : ''
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
      nombre: formVal.nombre,
      ciudad: formVal.ciudad,
      pais: formVal.pais,
      trazado: formVal.trazado,
      longitud: Number(formVal.longitud),
      numero_vueltas: Number(formVal.numero_vueltas),
      curvas_lentas: Number(formVal.curvas_lentas),
      curvas_media: Number(formVal.curvas_media),
      curvas_rapidas: Number(formVal.curvas_rapidas),
      calendario: formVal.calendario,
      fechaCarrera: formVal.calendario ? formVal.date : undefined
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
      text: `Se borrará ${circuit.nombre}`,
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