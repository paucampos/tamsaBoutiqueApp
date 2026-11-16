import { computed, Injectable, signal } from '@angular/core';

export const productos = [
  { id: 'polera', nombre: 'Polera algodón', precio: 11990, categoria: 'Poleras', foto: 'polera.png', color: 'Negro' },
  { id: 'poleron', nombre: 'Polerón primavera', precio: 16990, categoria: 'Polerones', foto: 'poleron.png', color: 'Rosado' },
  { id: 'sweater', nombre: 'Sweater tejido', precio: 14990, categoria: 'Sweaters', foto: 'sweater.png', color: 'Crudo' },
  { id: 'cinturon', nombre: 'Cinturón cuero', precio: 8990, categoria: 'Accesorios', foto: 'cinturon.png', color: 'Café' },
  { id: 'falda', nombre: 'Falda plisada', precio: 11990, categoria: 'Faldas', foto: 'falda.png', color: 'Gris' },
];

export type Producto = (typeof productos)[number];

type Linea = {
  clave: string;
  producto: Producto;
  talla: string;
  color: string;
  cantidad: number;
};

const formato = new Intl.NumberFormat('es-CL');
export const clp = (valor: number) => '$ ' + formato.format(valor);
export const foto = (producto: Producto) =>
  'url("assets/productos/' + producto.foto + '")';

@Injectable({ providedIn: 'root' })
export class TiendaDemo {
  private readonly reserva = signal<Linea[]>([]);
  readonly lineas = this.reserva.asReadonly();
  readonly comprobante = signal('');

  readonly unidades = computed(() =>
    this.lineas().reduce((total, linea) => total + linea.cantidad, 0),
  );

  readonly total = computed(() =>
    this.lineas().reduce(
      (total, linea) => total + linea.producto.precio * linea.cantidad, 0,
    ),
  );

  agregar(producto: Producto, talla: string, color: string) {
    if (this.comprobante()) return;

    const clave = `${producto.id}-${talla}-${color}`;

    if (this.lineas().some((linea) => linea.clave === clave)) {
      this.cambiarCantidad(clave, 1);
      return;
    }

    this.reserva.update((lineas) => [
      ...lineas, { clave, producto, talla, color, cantidad: 1 },
    ]);
  }

  cambiarCantidad(clave: string, delta: number) {
    if (this.comprobante()) return;

    this.reserva.update((lineas) =>
      lineas.map((linea) => linea.clave === clave
        ? { ...linea, cantidad: Math.max(1, linea.cantidad + delta) }
        : linea),
    );
  }

  quitar(clave: string) {
    if (this.comprobante()) return;
    this.reserva.update((lineas) => lineas.filter((linea) => linea.clave !== clave));
  }
}
