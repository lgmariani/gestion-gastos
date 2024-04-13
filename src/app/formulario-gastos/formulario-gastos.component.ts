import { Component, OnInit, inject } from '@angular/core';
import { Gasto } from '../interfaces/gasto.model';
import { NuevoGasto } from '../interfaces/nuevogasto.model';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { GastosSharedService } from '../services/gastos-shared.service';



@Component({
  selector: 'app-formulario-gastos',
  templateUrl: './formulario-gastos.component.html',
  styleUrls: ['./formulario-gastos.component.scss']
})
export class FormularioGastosComponent  {
  
  constructor(private messageService: MessageService, private gastosSharedService: GastosSharedService) {}

  http = inject(HttpClient);

  // peopleOptions: string[] = [ 'Mapache',  'Topo Rock' ];

  peopleOptions = [
    { id: 1, name: 'Mapache' },
    { id: 2, name: 'Topo Rock' }
  ];

  categorias: { valor: string, etiqueta: string }[] = [
    { valor: "1", etiqueta: "1. Carnicería y Pollo" },
    { valor: "2", etiqueta: "1. Panadería" },
    { valor: "3", etiqueta: "1. Quesería" },
    { valor: "4", etiqueta: "1. Supermercado" },
    { valor: "5", etiqueta: "1. Verdulería" },
    { valor: "6", etiqueta: "1. Leña y carbon" },
    { valor: "7", etiqueta: "1. Almacén" },
    { valor: "8", etiqueta: "2. Personal Limpieza" },
    { valor: "9", etiqueta: "3. Roberto" },
    { valor: "10", etiqueta: "4. Delivery´s" },
    { valor: "11", etiqueta: "4. Salidas" },
    { valor: "12", etiqueta: "5. Hogar & Mantenimiento" },
    { valor: "13", etiqueta: "5. Jardinería" },
    { valor: "14", etiqueta: "6. Remises & Transportes" },
    { valor: "15", etiqueta: "7. Prestamos Soquetudenses" },
    { valor: "16", etiqueta: "8. Regalos" },
    { valor: "17", etiqueta: "9. Combustible" },
    { valor: "18", etiqueta: "9. Mantenimiento y taller" },
    { valor: "19", etiqueta: "10. Vacaciones" },
    { valor: "20", etiqueta: "9. Seguro" }
  ];

  nuevoGasto: Gasto = {
    id: '',
    fecha: new Date(), // Establece la fecha actual en formato 'yyyy-MM-dd'
    pagador: 0,
    valor: 0,
    categoria: '',
    comentario: ''
  };

  nuevoGastoPosteable: NuevoGasto = {
    fecha: new Date(), // Establece la fecha actual en formato 'yyyy-MM-dd'
    pagador: 0,
    valor: 0,
    categoria: '',
    comentario: ''
  }

  missingFields: String[] = [];

  isAmountValid: boolean = false;

  limpiarForm() {
   
    this.nuevoGasto = {
      id: '',
      fecha: new Date(), // Establece la fecha actual en formato 'yyyy-MM-dd'
      pagador: 0,
      valor: 0,
      categoria: '',
      comentario: ''
    };

    this.nuevoGastoPosteable = {
      fecha: new Date(), // Establece la fecha actual en formato 'yyyy-MM-dd'
      pagador: 0,
      valor: 0,
      categoria: '',
      comentario: ''
    };

  }

  agregarGasto() {
    
    console.log(`nuevoGasto=${JSON.stringify(this.nuevoGasto)}`);

    this.missingFields = [];

    if (!this.nuevoGasto.fecha) {
      this.missingFields.push('Fecha');
    }

    if (this.nuevoGasto.valor <= 1) {
      this.missingFields.push('Monto');
    }

    if (this.nuevoGasto.pagador == 0) {
      this.missingFields.push('Pagador');
    }

    if (!this.nuevoGasto.categoria) {
      this.missingFields.push('Categoria');
    }

    if (this.missingFields.length > 0) {
      
      this.messageService.add({severity:'error', summary: 'Error', detail: 'Faltan campos obligatorios (' + this.missingFields.join() + ')'});
    }
    
    this.nuevoGastoPosteable.fecha = this.nuevoGasto.fecha;
    this.nuevoGastoPosteable.valor = this.nuevoGasto.valor;
    this.nuevoGastoPosteable.categoria = this.nuevoGasto.categoria;
    this.nuevoGastoPosteable.comentario = this.nuevoGasto.comentario;
    this.nuevoGastoPosteable.pagador = this.nuevoGasto.pagador;

    console.log(`nuevoGastoPosteable=${this.nuevoGastoPosteable}`);

    // Aquí puedes agregar lógica previa al envío, como validaciones o ajustes de formato
    this.http.post<NuevoGasto>('http://localhost:3005/gastos', this.nuevoGastoPosteable)
      .subscribe({
        next: (respuesta) => {
          console.log('Gasto agregado con éxito', respuesta);
          // Aquí puedes agregar lógica post-envío, como limpiar el formulario

          this.gastosSharedService.notifyGastoAdded();
          this.limpiarForm();
          this.messageService.add({severity:'success', summary: 'Éxito', detail: 'Gasto agregado con éxito'});

        },
        error: (error) => {
          console.error('Error al agregar el gasto', error);
          // Manejo de errores, por ejemplo, mostrar un mensaje de error al usuario
        }
      });
  }

onInputChange(event: any) {
    
  console.log('paso');
  const inputValue = event.value;
  this.isAmountValid = inputValue > 0;
  console.log('onInputChange: ' + 'inputValue=' + inputValue + ", isAmountValid='" + this.isAmountValid);

}

// Función para realizar la actualización de la hoja de cálculo
actualizarHoja() {

  const values = [[
    this.nuevoGasto.fecha,
    this.nuevoGasto.valor,
    this.nuevoGasto.pagador,
    this.nuevoGasto.categoria,
    this.nuevoGasto.comentario
  ]]; 

}

}
