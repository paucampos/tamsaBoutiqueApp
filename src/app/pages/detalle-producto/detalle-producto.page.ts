import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular';
import { clp, foto, Producto, productos, TiendaDemo } from '../../utils/tienda-demo';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  imports: [HeaderComponent, RouterLink, IonButton, IonContent],
})
export class DetalleProductoPage {
  private readonly ruta = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly parametros = toSignal(this.ruta.paramMap, {
    initialValue: this.ruta.snapshot.paramMap,
  });
  readonly tienda = inject(TiendaDemo);

  readonly producto = computed(() => productos.find((producto) => producto.id === this.parametros()?.get('id')));

  readonly talla = signal('M');
  readonly colorPolera = signal('Negro');
  readonly tallas = ['S', 'M', 'L', 'XL'];
  readonly coloresPolera = [
    { nombre: 'Negro', hex: '#332b27' },
    { nombre: 'Rosado', hex: '#ddb6b7' },
    { nombre: 'Beige', hex: '#c8b49d' },
  ];
  readonly clp = clp;
  readonly foto = foto;

  reservar(producto: Producto) {
    const talla = producto.categoria === 'Accesorios' ? 'Única' : this.talla();
    const color = producto.id === 'polera' ? this.colorPolera() : producto.color;

    this.tienda.agregar(producto, talla, color);
    void this.router.navigateByUrl('/mis-pedidos');
  }
}
