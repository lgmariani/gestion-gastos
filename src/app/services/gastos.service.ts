import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from '../interfaces/gasto.model';
import { NuevoGasto } from '../interfaces/nuevogasto.model';

@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiUrl = 'http://localhost:3005/gastos';

  constructor(private http: HttpClient) { }

  crearGasto(gasto: NuevoGasto): Observable<NuevoGasto> {
    return this.http.post<NuevoGasto>(this.apiUrl, gasto);
  }

  actualizarGasto(id: string, gasto: NuevoGasto): Observable<Gasto> {
    return this.http.put<Gasto>(`${this.apiUrl}/${id}`, gasto);
  }

  obtenerGasto(id: string): Observable<Gasto> {
    return this.http.get<Gasto>(`${this.apiUrl}/${id}`);
  }
}
