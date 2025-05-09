import { Component } from '@angular/core';
//Angular components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule,Routes } from '@angular/router';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PrimeNGConfig } from 'primeng/api';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import {InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ChartModule } from 'primeng/chart';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import {SidebarModule} from 'primeng/sidebar';
import {TreeModule} from 'primeng/tree';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { RadioButtonModule } from 'primeng/radiobutton';


//Componentes propios
import { AppComponent } from './app.component';
import { FormularioGastosComponent } from './formulario-gastos/formulario-gastos.component';
import { ListaGastosComponent } from './lista-gastos/lista-gastos.component';
import { PagadorNombrePipe } from './pipes/pagador-nombre.pipe';
import { CategoryNamePipe } from './pipes/category-name.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DatePipe } from '@angular/common';
import { GastosService } from './services/gastos.service';
import { GastosSharedService } from './services/gastos-shared.service';


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'lista-gastos', component: ListaGastosComponent },
  { path: 'formulario-gastos', component: FormularioGastosComponent },
  { path: 'formulario-gastos/:id', component: FormularioGastosComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/error', pathMatch: 'full' }
];

//https://stackblitz.com/run?file=src%2Fapp%2Fapp.component.ts
//para probar un codigo loco


@NgModule({
  declarations: [
    AppComponent,
    FormularioGastosComponent,
    ListaGastosComponent,
    PagadorNombrePipe,
    CategoryNamePipe,
    DashboardComponent
   ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    CalendarModule,
    RadioButtonModule,
    DropdownModule,
    SelectButtonModule,
    InputNumberModule,
    InputTextModule,
    HttpClientModule,
    TableModule,
    ToastModule,
    MessagesModule,
    ChartModule,
    AvatarModule,
    AvatarGroupModule,
    DatePipe,
    SidebarModule,
    TreeModule,
    MenuModule,
    MenubarModule,
    RouterModule.forRoot(appRoutes)
    ],
  providers: [
    MessageService,
    PagadorNombrePipe,
    { provide: LOCALE_ID, useValue: 'es' },
    GastosService,
    GastosSharedService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private primengConfig: PrimeNGConfig) {
    registerLocaleData(localeEs);
    this.primengConfig.setTranslation({
      accept: 'Aceptar',
      reject: 'Cancelar',
      firstDayOfWeek: 1,
      dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
      monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
      today: 'Hoy',
      clear: 'Limpiar'
    });
  }
}

