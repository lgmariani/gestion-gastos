import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TotalByPerson } from '../interfaces/total-by-person.model';
import { PagadorNombrePipe } from '../pipes/pagador-nombre.pipe';
import { GastosSharedService } from '../services/gastos-shared.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(private gastosSharedService: GastosSharedService) {}

  http = inject(HttpClient);

  responsive: boolean = true;
  data_for_chart: any;
  options: any;
  debe: number = -1;
  sumWithInitial?: number;
  loQueDebe?: number;

  listaPagadores?: String[];

  //constructor(private pagadorNombrePipe: PagadorNombrePipe) {}

  cargarDatos() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    let pagadorNombrePipe = new PagadorNombrePipe();

    this.http.get<TotalByPerson[]>('http://localhost:3005/get-total-by-person')
      .subscribe((data) => {

        data.map((totalByPerson) => {
          //console.log('iterando pagadores: ' + totalByPerson.pagador);
          return totalByPerson.pagador;
        });

        this.listaPagadores =
          data.map((totalByPerson) =>  {
            return pagadorNombrePipe.transform(totalByPerson.pagador);
          }
        );

        console.log('lista pagadores:');

        // Ahora actualizamos data_for_chart aquí, dentro del subscribe
        this.data_for_chart = {
          labels: this.listaPagadores, // Esto también podrías querer dinamizarlo en base a los datos
          datasets: [
            {
              data: data.map((total) => total.totalGastado),
              backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--green-400')]
            }
          ]
        };

        const initialValue = 0;
        this.sumWithInitial = data.reduce((accumulator, currentValue) => accumulator + currentValue.totalGastado,
        initialValue,
        );
        let loquegasto=0;

        let index1=0;
        let index2=0;

        if (data[0].pagador == 1) {
          index1 = 0;
          index2 = 1;
        }
        else {
          index1 = 1;
          index2 = 0;
        }

        if (data[index1].totalGastado > data[index2].totalGastado) {
          //Gasto mas soquete, entonces me fijo cuanto gaste yo

          this.debe=data[index2].pagador;
          loquegasto=data[index2].totalGastado;
        }
        else {
          this.debe=data[index1].pagador;
          loquegasto=data[index1].totalGastado;
        }

        this.loQueDebe = (this.sumWithInitial/2)-loquegasto;

        console.log('total/2:' + (this.sumWithInitial/2).toString());
        console.log('elquedebe:' + this.debe + 'y [1]=' + data[1].totalGastado + 'y [0]=' + data[0].totalGastado );
        console.log('loquegasto=' + loquegasto.toString());


        // Opciones pueden permanecer fuera si no dependen de los datos
        this.options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
              labels: {
                usePointStyle: true,
                color: textColor
              }
            },
            title: {
              display: true,
              text: 'Distribucion de gastos por persona',
            }
          }
        };
      });
  }

  ngOnInit() {
    this.cargarDatos();

    this.gastosSharedService.gastoAdded$.subscribe(() => {
      // Recargar la lista de gastos
      this.cargarDatos();
    });
  }
}
