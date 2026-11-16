import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:3000/api/productos';

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }

  obtenerProductoPorId(id: number): Observable<Producto | undefined> {
    return this.obtenerProductos().pipe(
      map(productos => productos.find(producto => producto.id === id))
    );
  }
}
