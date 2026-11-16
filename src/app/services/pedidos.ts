import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearPedidoRequest, CrearPedidoResponse, Pedido, PedidoDetalle } from '../models/pedido.model';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/api/pedidos';

  crearPedido(datos: CrearPedidoRequest): Observable<CrearPedidoResponse> {
    return this.http.post<CrearPedidoResponse>(this.apiUrl, datos);
  }

  obtenerPedido(id: number): Observable<PedidoDetalle> {
    return this.http.get<PedidoDetalle>(`${this.apiUrl}/${id}`);
  }
}
