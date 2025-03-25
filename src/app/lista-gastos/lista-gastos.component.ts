import { Gasto } from './../interfaces/gasto.model';
import { CategoryNamePipe } from './../pipes/category-name.pipe';
import { registerLocaleData } from '@angular/common';
import { PagadorNombrePipe } from './../pipes/pagador-nombre.pipe';
import { Component, HostListener, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { GastoPreview } from '../interfaces/gastoPreview';
import { GastosSharedService } from '../services/gastos-shared.service';
import localeEsAr  from '@angular/common/locales/es-AR';


import { Router } from '@angular/router';


@Component({
  selector: 'app-lista-gastos',
  templateUrl: './lista-gastos.component.html',
  styleUrls: ['./lista-gastos.component.scss']
})
export class ListaGastosComponent  {

  constructor(private gastosSharedService: GastosSharedService, private router: Router) {

    this.checkDevice();
    registerLocaleData(localeEsAr);
    this.onResize();

  }

  public isMobile: boolean = false;
  http = inject(HttpClient);

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

  eliminar(pgasto: Gasto) {

    console.log('eliminame a ' + pgasto.id);

    this.http.delete<any>('http://localhost:3005/gastos/' + pgasto.id).subscribe({
      next: (respuesta) => {
        console.log('eliminado:', pgasto.id);
        this.gastosSharedService.notifyGastoAdded();
      },
      error: (error) => {
        console.error('Error:', error);
      }});

      //this.cargarGastos();
  }

  cargarGastos() {
    //'https://65dbe96b3ea883a152924281.mockapi.io/tabla-gastos/gastos'

    this.http.get<Gasto[]>('http://localhost:3005/gastos')
    .subscribe((data) => {
        this.gastos = data;
        console.log('cargarGastos() got data:', data)

        this.gastosPreview = this.gastos.map(dato => (
          {
            id: dato.id,
            fecha: this.datePipe.transform(dato.fecha, 'dd/MM/YYYY'),
            pagador: this.PagadorNombrePipe.transform(dato.pagador),
            valor: this.CurrencyPipe.transform(dato.valor, 'ARG', '$', '1.2-2'),
            categoria: this.CategoryNamePipe.transform(dato.categoria),
            titulo: dato.titulo,
            repartirentre: this.PagadorNombrePipe.transform(dato.repartirentre)
          }));

        console.log('cargarGastos() got gastosPreview', this.gastosPreview);
        //console.log('gastos:', this.gastos);
      });
  }


  ngOnInit() {

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

}
