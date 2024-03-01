import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

//PrimeNG
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import {InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';




import { AppComponent } from './app.component';
import { FormularioGastosComponent } from './formulario-gastos/formulario-gastos.component';
import { ListaGastosComponent } from './lista-gastos/lista-gastos.component';
import { PagadorNombrePipe } from './pagador-nombre.pipe';
import { CategoryNamePipe } from './category-name.pipe';


@NgModule({
  declarations: [
    AppComponent,
    FormularioGastosComponent,
    ListaGastosComponent,
    PagadorNombrePipe,
    CategoryNamePipe
   ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    DropdownModule,
    SelectButtonModule,
    InputNumberModule,
    InputTextModule,
    HttpClientModule,
    TableModule
  ],
  providers: [ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
