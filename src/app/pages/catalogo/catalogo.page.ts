import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonSearchbar, IonButton } from '@ionic/angular';

import { HeaderComponent } from '../../components/header/header.component';
import { ProductosService } from '../../services/productos';
import { Producto } from '../../models/producto.model';
import { clp } from '../../utils/tienda-demo';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  imports: [
    HeaderComponent,
    RouterLink,
    IonContent,
    IonSearchbar,
    IonButton,
  ],
})
export class CatalogoPage {
  private readonly productosService = inject(ProductosService);

  readonly productos = signal<Producto[]>([]);
  readonly cargando = signal(true);
  readonly error = signal(false);

  readonly categoria = signal('Todo');
  readonly busqueda = signal('');

  readonly clp = clp;

  readonly categorias = computed(() => [
    'Todo',
    ...new Set(this.productos().map((producto) => producto.categoria)),
  ]);

  readonly resultados = computed(() => {
    const categoria = this.categoria();
    const texto = this.busqueda().trim().toLocaleLowerCase('es-CL');

    return this.productos().filter(
      (producto) =>
        (categoria === 'Todo' || producto.categoria === categoria) &&
        producto.nombre.toLocaleLowerCase('es-CL').includes(texto),
    );
  });

  readonly imagenProducto = (producto: Producto): string =>
  producto.imagen_url || 'assets/productos/placeholder.png';

  constructor() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.cargando.set(true);
    this.error.set(false);

    this.productosService.obtenerProductos().subscribe({
      next: (productos) => {
        this.productos.set(productos);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al obtener productos:', error);
        this.error.set(true);
        this.cargando.set(false);
      },
    });
  }
}
