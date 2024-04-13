import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryName'
})
export class CategoryNamePipe implements PipeTransform {

  transform(value: any, args?: any[]): any {
    const categoryOptions = [
      // { id: 1, name: 'Mapache' },
      // categorias: { id: string, etiqueta: string }
        { id: 1, etiqueta: "1. Carnicería y Pollo" },
        { id: 2, etiqueta: "1. Panadería" },
        { id: 3, etiqueta: "1. Quesería" },
        { id: 4, etiqueta: "1. Supermercado" },
        { id: 5, etiqueta: "1. Verdulería" },
        { id: 6, etiqueta: "1. Leña y carbon" },
        { id: 7, etiqueta: "1. Almacén" },
        { id: 8, etiqueta: "2. Personal Limpieza" },
        { id: 9, etiqueta: "3. Roberto" },
        { id: 10, etiqueta: "4. Delivery´s" },
        { id: 11, etiqueta: "4. Salidas" },
        { id: 12, etiqueta: "5. Hogar & Mantenimiento" },
        { id: 13, etiqueta: "5. Jardinería" },
        { id: 14, etiqueta: "6. Remises & Transportes" },
        { id: 15, etiqueta: "7. Prestamos Soquetudenses" },
        { id: 16, etiqueta: "8. Regalos" },
        { id: 17, etiqueta: "9. Combustible" },
        { id: 18, etiqueta: "9. Mantenimiento y taller" },
        { id: 19, etiqueta: "10. Vacaciones" },
        { id: 20, etiqueta: "9. Seguro" }
      ];

    const found = categoryOptions.find(option => option.id === value);
    return found ? found.etiqueta : 'Desconocido';
  }

}
