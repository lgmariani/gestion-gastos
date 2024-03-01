import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pagadorNombre'
})
export class PagadorNombrePipe implements PipeTransform {

  transform(value: any, args?: any[]): any {
    const peopleOptions = [
      { id: 1, name: 'Mapache' },
      { id: 2, name: 'Topo Rock' }
    ];

    const found = peopleOptions.find(option => option.id === value);
    return found ? found.name : 'Desconocido';
  }

}
