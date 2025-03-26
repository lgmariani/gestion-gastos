import { Component, OnInit, inject } from '@angular/core';
import { Gasto } from '../interfaces/gasto.model';
import { NuevoGasto } from '../interfaces/nuevogasto.model';
import { MessageService } from 'primeng/api';
import { GastosSharedService } from '../services/gastos-shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GastosService } from '../services/gastos.service';

@Component({
  selector: 'app-formulario-gastos',
  templateUrl: './formulario-gastos.component.html',
  styleUrls: ['./formulario-gastos.component.scss']
})
export class FormularioGastosComponent implements OnInit {
  private gastosService = inject(GastosService);

  constructor(
    private messageService: MessageService,
    private gastosSharedService: GastosSharedService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.paramId = params['id'];
      if (this.paramId) {
        this.cargarGastoIndividual();
        this.btnInputText = 'Actualizar gasto';
      } else {
        this.btnInputText = 'Agregar gasto';
      }
    });
  }

  ngOnInit(): void {}

  paramId: string | null = null;

  peopleOptions = [
    { id: 1, name: 'Mapache' },
    { id: 2, name: 'Topo Rock' }
  ];

  peopleOptionsall = [
    { id: 1, name: 'Mapache' },
    { id: 2, name: 'Topo Rock' },
    { id: 0, name: 'Todos'}
  ];

  catalogo: { label: string, value: any }[] = [];

  categorias = [
    { value: "1", label: "1. Carnicería y Pollo" },
    { value: "2", label: "1. Panadería" },
    { value: "3", label: "1. Quesería" },
    { value: "4", label: "1. Supermercado" },
    { value: "5", label: "1. Verdulería" },
    { value: "6", label: "1. Leña y carbon" },
    { value: "7", label: "1. Almacén" },
    { value: "8", label: "2. Personal Limpieza" },
    { value: "9", label: "3. Roberto" },
    { value: "10", label: "4. Delivery s" },
    { value: "11", label: "4. Salidas" },
    { value: "12", label: "5. Hogar & Mantenimiento" },
    { value: "13", label: "5. Jardinería" },
    { value: "14", label: "6. Remises & Transportes" },
    { value: "15", label: "7. Prestamos Soquetudenses" },
    { value: "16", label: "8. Regalos" },
    { value: "17", label: "9. Combustible" },
    { value: "18", label: "9. Mantenimiento y taller" },
    { value: "19", label: "10. Vacaciones" },
    { value: "20", label: "9. Seguro" }
  ];

  nuevoGasto: Gasto = {
    id: '',
    fecha: new Date(),
    pagador: 0,
    valor: 0,
    categoria: '',
    titulo: '',
    repartirentre: 0
  };

  nuevoGastoPosteable: NuevoGasto = {
    fecha: new Date(),
    pagador: 0,
    valor: 0,
    categoria: '',
    titulo: '',
    repartirentre: 0
  };

  missingFields: string[] = [];

  isAmountValid: boolean = false;

  btnInputText: string = '';

  limpiarForm(): void {
    this.nuevoGasto = {
      id: '',
      fecha: new Date(),
      pagador: 0,
      valor: 0,
      categoria: '',
      titulo: '',
      repartirentre: 0
    };

    this.nuevoGastoPosteable = {
      fecha: new Date(),
      pagador: 0,
      valor: 0,
      categoria: '',
      titulo: '',
      repartirentre: 0
    };
  }

  validarCampos(): boolean {
    this.missingFields = [];

    if (!this.nuevoGasto.fecha) {
      this.missingFields.push('Fecha');
    }

    if (this.nuevoGasto.valor <= 1) {
      this.missingFields.push('Monto');
    }

    if (this.nuevoGasto.pagador === 0) {
      this.missingFields.push('Pagador');
    }

    if (!this.nuevoGasto.categoria) {
      this.missingFields.push('Categoria');
    }

    if (this.missingFields.length > 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Faltan campos obligatorios (' + this.missingFields.join() + ')'
      });
      return false;
    }

    return true;
  }

  prepararGastoParaEnvio(): void {
    if (!this.validarCampos()) return;

    this.nuevoGastoPosteable = {
      ...this.nuevoGasto,
      categoria: typeof this.nuevoGasto.categoria === 'object'
        ? this.nuevoGasto.categoria.value
        : this.nuevoGasto.categoria
    };
  }

  handleAction(): void {
    this.prepararGastoParaEnvio();

    if (this.paramId) {
      this.actualizarGasto();
    } else {
      this.agregarGasto();
    }
  }

  agregarGasto(): void {
    this.gastosService.crearGasto(this.nuevoGastoPosteable)
      .subscribe({
        next: () => {
          this.gastosSharedService.notifyGastoAdded();
          this.limpiarForm();
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Gasto agregado con éxito'
          });
        },
        error: (error) => {
          console.error('Error al agregar el gasto', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al agregar el gasto'
          });
        }
      });
  }

  actualizarGasto(): void {
    if (!this.paramId) return;

    this.gastosService.actualizarGasto(this.paramId, this.nuevoGastoPosteable)
      .subscribe({
        next: () => {
          this.gastosSharedService.notifyGastoAdded();
          this.limpiarForm();
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Gasto editado con éxito'
          });
          this.router.navigate(['/lista-gastos']);
        },
        error: (error) => {
          console.error('Error al editar el gasto', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al editar el gasto'
          });
        }
      });
  }

  cargarGastoIndividual(): void {
    if (!this.paramId) return;

    this.gastosService.obtenerGasto(this.paramId)
      .subscribe((data) => {
        this.nuevoGasto = {
          ...data,
          fecha: new Date(data.fecha)
        };
      });
  }

  onInputChange(event: any): void {
    const inputValue = event.value;
    this.isAmountValid = inputValue > 0;
  }

  // Función para realizar la actualización de la hoja de cálculo
  actualizarHoja() {
    const values = [[
      this.nuevoGasto.fecha,
      this.nuevoGasto.valor,
      this.nuevoGasto.pagador,
      this.nuevoGasto.categoria,
      this.nuevoGasto.titulo
    ]];
  }
}

