import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
	title = 'Aplicación de Gastos Soquetuda';

	visibleSidebar: boolean = true;
  items: MenuItem[] = 
  [{
    label: 'Navigate',
    items: [
        {
            label: 'Nuevo gasto',
            icon: 'pi pi-money-bill',
            url: 'http://angular.io'
        },
        {
            label: 'Vista general',
            icon: 'pi pi-chart-bar',
            url: 'http://angular.io'
        },
        {
            label: 'Lista de gastos',
            icon: 'pi pi-list',
            url: 'http://angular.io'
        }
    ]
}]



	onOnInit() {
		
	}
}
