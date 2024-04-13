import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastosSharedService {

  private gastoAdded = new Subject<void>();

  // Observable que los componentes pueden suscribirse
  gastoAdded$ = this.gastoAdded.asObservable();

  constructor() { }

  // Método para llamar cuando se añade un gasto
  notifyGastoAdded() {
    this.gastoAdded.next();
  }
}
