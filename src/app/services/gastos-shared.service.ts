import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastosSharedService {

  private gastoTouched = new Subject<void>();

  // Observable que los componentes pueden suscribirse
  gastoTouched$ = this.gastoTouched.asObservable();

  constructor() { }

  // Método para llamar cuando se añade un gasto
  notifyGastoAdded() {
    this.gastoTouched.next();
  }
}
