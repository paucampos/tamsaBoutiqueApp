import { Injectable, computed, signal } from '@angular/core';
import { Producto, Variante } from '../models/producto.model';

export interface LineaCarrito {
  varianteId: number;
  producto: Producto;
  variante: Variante;
  cantidad: number;
}

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private readonly items = signal<LineaCarrito[]>([]);

  readonly lineas = this.items.asReadonly();

  readonly unidades = computed(() => this.lineas().reduce((total, linea) => total + linea.cantidad, 0));

  readonly total = computed(() =>
    this.lineas().reduce((total, linea) => total + linea.producto.precio * linea.cantidad, 0),
  );

  agregar(producto: Producto, variante: Variante): boolean {
    const existente = this.lineas().find((linea) => linea.varianteId === variante.id);

    if (variante.stock <= 0) return false;

    if (existente) {
      if (existente.cantidad >= variante.stock) return false;

      this.items.update((lineas) =>
        lineas.map((linea) => (linea.varianteId === variante.id ? { ...linea, cantidad: linea.cantidad + 1 } : linea)),
      );
    } else {
      this.items.update((lineas) => [
        ...lineas,
        {
          varianteId: variante.id,
          producto,
          variante,
          cantidad: 1,
        },
      ]);
    }

    return true;
  }

  cambiarCantidad(varianteId: number, delta: number) {
    this.items.update((lineas) =>
      lineas.map((linea) => {
        if (linea.varianteId !== varianteId) return linea;

        return {
          ...linea,
          cantidad: Math.max(1, Math.min(linea.variante.stock, linea.cantidad + delta)),
        };
      }),
    );
  }

  quitar(varianteId: number) {
    this.items.update((lineas) => lineas.filter((linea) => linea.varianteId !== varianteId));
  }

  vaciar() {
    this.items.set([]);
  }
}
