import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface IniciarPagoResponse {
  message: string;
  pedido_id: number;
  monto: number;
  url: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class PagosService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/api/pagos';

  iniciarPago(pedidoId: number): Observable<IniciarPagoResponse> {
    return this.http.post<IniciarPagoResponse>(
      `${this.apiUrl}/iniciar`,
      { pedido_id: pedidoId }
    );
  }
}
