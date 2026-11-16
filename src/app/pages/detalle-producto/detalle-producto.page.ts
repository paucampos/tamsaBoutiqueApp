import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular';

import { HeaderComponent } from '../../components/header/header.component';
import { ProductosService } from '../../services/productos';
import { Producto, Variante } from '../../models/producto.model';
import { clp } from '../../utils/tienda-demo';
import { CarritoService } from '../../services/carrito';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  imports: [HeaderComponent, RouterLink, IonContent, IonButton],
})
export class DetalleProductoPage {
  private readonly carrito = inject(CarritoService);
  private readonly ruta = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productosService = inject(ProductosService);

  readonly producto = signal<Producto | null>(null);
  readonly varianteSeleccionada = signal<Variante | null>(null);

  readonly cargando = signal(true);
  readonly error = signal(false);

  readonly clp = clp;

  readonly variantesDisponibles = computed(
    () => this.producto()?.variantes.filter((variante) => variante.stock > 0) ?? [],
  );

  readonly imagenProducto = (producto: Producto): string => producto.imagen_url || 'assets/productos/placeholder.png';

  constructor() {
    const id = Number(this.ruta.snapshot.paramMap.get('id'));

    this.productosService.obtenerProductoPorId(id).subscribe({
      next: (producto) => {
        this.producto.set(producto ?? null);
        this.varianteSeleccionada.set(producto?.variantes.find((variante) => variante.stock > 0) ?? null);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error('Error al cargar producto:', error);
        this.error.set(true);
        this.cargando.set(false);
      },
    });
  }

  agregarAlCarrito() {
    const producto = this.producto();
    const variante = this.varianteSeleccionada();

    if (!producto || !variante) return;

    const agregado = this.carrito.agregar(producto, variante);

    if (agregado) {
      void this.router.navigateByUrl('/carrito');
    } else {
      console.warn('No hay stock suficiente para agregar el producto');
    }
  }
}
