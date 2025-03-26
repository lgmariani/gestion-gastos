import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from '../interfaces/gasto.model';
import { NuevoGasto } from '../interfaces/nuevogasto.model';
import { GastosSharedService } from './gastos-shared.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GastosService {
  private apiUrl = environment.apiUrl + 'gastos';


  constructor(private http: HttpClient, private gastosSharedService: GastosSharedService) { }

  obtenerGastos(): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(this.apiUrl);
  }

  crearGasto(gasto: NuevoGasto): Observable<NuevoGasto> {
    return this.http.post<NuevoGasto>(this.apiUrl, gasto);
  }

  actualizarGasto(id: string, gasto: NuevoGasto): Observable<Gasto> {
    return this.http.put<Gasto>(`${this.apiUrl}/${id}`, gasto);
  }

  obtenerGasto(id: string): Observable<Gasto> {
    return this.http.get<Gasto>(`${this.apiUrl}/${id}`);
  }

  eliminar(pgasto: Gasto) {
    return this.http.delete<any>(this.apiUrl + pgasto.id).subscribe({
      next: (respuesta) => {
        this.gastosSharedService.notifyGastoAdded();
      },
      error: (error) => {
        console.error('Error:', error);
      }});
  }
}
