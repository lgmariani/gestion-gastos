import { Gasto } from './../interfaces/gasto.model';
import { CategoryNamePipe } from './../pipes/category-name.pipe';
import { registerLocaleData } from '@angular/common';
import { PagadorNombrePipe } from './../pipes/pagador-nombre.pipe';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { GastoPreview } from '../interfaces/gastoPreview';
import { GastosSharedService } from '../services/gastos-shared.service';
import   localeEsAr  from '@angular/common/locales/es-AR';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GastosService } from '../services/gastos.service';

@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.component.html',
  styleUrls: ['./lista-gastos.component.scss']
})
export class ListaGastosComponent implements OnInit {
  @ViewChild('tablaGastos') tablaGastos: any;
  @ViewChild('searchInput') searchInput: any;

  constructor(private gastosService: GastosService, private gastosSharedService: GastosSharedService, private router: Router) {

    this.checkDevice();
    registerLocaleData(localeEsAr);
    this.onResize();
  }

  public isMobile: boolean = false;

  gastos: Gasto[] = [];
  gastosPreview: GastoPreview[] = [];

  selectedGasto?: Gasto;
  selectedGastoPreview?: GastoPreview;

  screenHeight? : number;
  screenWidth? : number;

  datePipe = new DatePipe("es-AR");
  PagadorNombrePipe = new PagadorNombrePipe();
  CategoryNamePipe = new CategoryNamePipe();
  CurrencyPipe = new CurrencyPipe('es-AR') ;

  // Propiedades para paginación
  first: number = 0;
  rows: number = 10;
  totalRecords: number = 0;

  // Propiedades para ordenamiento
  sortField: string = '';
  sortOrder: number = 1;

  globalFilterValue: string = '';

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkDevice();
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  private checkDevice() {
    this.isMobile = window.innerWidth < 768; // Considera <768px como móvil
  }

  editar(gasto_id: string) {

    console.log('editame a ' + gasto_id);
    this.router.navigate(['/formulario-gastos', gasto_id]);
  }

  ngOnInit(): void {
    this.cargarGastos();
    this.gastosSharedService.gastoTouched$.subscribe(() => {
      this.cargarGastos();
    });
  }

  nuevoGasto: Gasto = {
    id: '',
    fecha: new Date(), // Establece la fecha actual en formato 'yyyy-MM-dd'
    pagador: 0,
    valor: 0,
    categoria: '',
    titulo: '',
    repartirentre: 0
  };

  onRowSelect(gasto_id: string) {

    console.log('seleccionado (stringify):', JSON.stringify(gasto_id));
    console.log('seleccionado (id):', gasto_id);
    this.editar(gasto_id);

    //this.http.get<Gasto[]>('http://localhost:3005/gastos/' + event.data.id)
    //.subscribe((data) => { this.gastos = data; console.log(data) });
  }

  onRowUnselect(event: any) {
    console.log('deseleccionado', event.data);
  }

  onPage(event: any) {
    console.log('Evento de página:', event);
    this.first = event.first;
    this.rows = event.rows;
    this.cargarGastos();
  }

  onSort(event: any) {
    console.log('Evento de ordenamiento:', event);
    this.sortField = event.field;
    this.sortOrder = event.order;
    this.cargarGastos();
  }

  onGlobalFilter(event: any) {
    this.globalFilterValue = event.target.value;
    this.cargarGastos();
  }

  cargarGastos() {
    console.log('Cargando gastos con:', {
      first: this.first,
      rows: this.rows,
      sortField: this.sortField,
      sortOrder: this.sortOrder,
      globalFilter: this.globalFilterValue
    });

    this.gastosService.obtenerGastosPaginados(
      this.first,
      this.rows,
      this.sortField,
      this.sortOrder,
      this.globalFilterValue
    ).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        this.gastos = response.data;
        this.totalRecords = response.pagination.total;
        this.gastosPreview = this.gastos.map(dato => ({
          id: dato.id,
          fecha: this.datePipe.transform(dato.fecha, 'dd/MM/YYYY'),
          pagador: this.PagadorNombrePipe.transform(dato.pagador),
          valor: this.CurrencyPipe.transform(dato.valor, 'ARG', '$', '1.2-2'),
          categoria: this.CategoryNamePipe.transform(dato.categoria),
          titulo: dato.titulo,
          repartirentre: this.PagadorNombrePipe.transform(dato.repartirentre)
        }));
      },
      error: (error) => {
        console.error('Error al cargar gastos:', error);
      }
    });
  }

  eliminar(gasto: Gasto) {
    this.gastosService.eliminar(gasto);
    this.gastosSharedService.notifyGastoAdded();
  }

}
