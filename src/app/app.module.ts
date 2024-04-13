//Angular components
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
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { ChartModule } from 'primeng/chart';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import {SidebarModule} from 'primeng/sidebar';
import {TreeModule} from 'primeng/tree';
import { MenuModule } from 'primeng/menu';

//Componentes propios
import { AppComponent } from './app.component';
import { FormularioGastosComponent } from './formulario-gastos/formulario-gastos.component';
import { ListaGastosComponent } from './lista-gastos/lista-gastos.component';
import { PagadorNombrePipe } from './pipes/pagador-nombre.pipe';
import { CategoryNamePipe } from './pipes/category-name.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';


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
    SidebarModule,
    TreeModule,
    MenuModule
    
  ],
  providers: [ MessageService, PagadorNombrePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
