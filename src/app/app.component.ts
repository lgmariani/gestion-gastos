import { Component, OnInit  } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit{

  title = 'Aplicación de Gastos Soquetuda';

	visibleSidebar: boolean = true;
  modalSidebar: boolean = false;
  items?: MenuItem[];

	ngOnInit() {

    this.items =
    [
          {
              label: 'Nuevo gasto',
              icon: 'pi pi-money-bill',
              routerLink: 'formulario-gastos',
          },
          {
              label: 'Vista general',
              icon: 'pi pi-chart-bar',
              routerLink: 'dashboard',
              items: []
          },
          {
              label: 'Lista de gastos',
              icon: 'pi pi-list',
              routerLink: 'lista-gastos',
              items: []
          }
  ];

	}
}
