import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gasto } from '../interfaces/gasto.model';
import { NuevoGasto } from '../interfaces/nuevogasto.model';
import { GastosSharedService } from './gastos-shared.service';
import { environment } from '../../environments/environment';

interface PaginationInfo {
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
  hasNextPage: boolean;
}

interface PaginatedResponse {
  data: Gasto[];
  pagination: PaginationInfo;
}

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
    return this.http.delete<any>(this.apiUrl + '/' + pgasto.id).subscribe({
      next: (respuesta) => {
        this.gastosSharedService.notifyGastoAdded();
      },
      error: (error) => {
        console.error('Error:', error);
      }});
  }

  obtenerGastosPaginados(
    first: number,
    rows: number,
    sortField?: string,
    sortOrder?: number,
    globalFilter?: string
  ): Observable<PaginatedResponse> {
    const page = Math.floor(first / rows) + 1;
    let url = `${this.apiUrl}?page=${page}&limit=${rows}`;

    if (sortField && sortOrder) {
      const validSortFields = ['id', 'fecha', 'pagador', 'titulo', 'categoria', 'valor', 'repartirentre'];
      if (validSortFields.includes(sortField)) {
        url += `&sort=${sortField}&order=${sortOrder === -1 ? 'desc' : 'asc'}`;
      }
    }

    if (globalFilter) {
      url += `&search=${encodeURIComponent(globalFilter)}`;
    }

    console.log('URL de la petición:', url);
    return this.http.get<PaginatedResponse>(url);
  }
}
