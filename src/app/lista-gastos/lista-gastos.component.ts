import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gasto } from '../interfaces/gasto.model';

@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.component.html',
  styleUrls: ['./lista-gastos.component.scss']
})
export class ListaGastosComponent {

  http = inject(HttpClient);

  gastos: Gasto[] = [];

  selectedGasto?: Gasto;

  ngOnInit() {


    //'https://65dbe96b3ea883a152924281.mockapi.io/tabla-gastos/gastos'
    this.http.get<Gasto[]>('http://localhost:3005/gastos')
    .subscribe((data) => { this.gastos = data; console.log(data) });
  }

  nuevoGasto: Gasto = {
    id: '',
    fecha: new Date(), // Establece la fecha actual en formato 'yyyy-MM-dd'
    pagador: 0,
    valor: 0,
    categoria: '',
    comentario: ''
  };

  onRowSelect(event: any) {
    console.log('seleccionado (completo):', event.data);

    console.log('seleccionado (id):', event.data.id);

    this.http.get<Gasto[]>('http://localhost:3005/gastos/' + event.data.id)
    .subscribe((data) => { this.gastos = data; console.log(data) });
  }
  
  onRowUnselect(event: any) {
    console.log('deseleccionado', event.data);
  }

}
