import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IonContent, IonButton, IonIcon, IonTitle } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline, closeCircleOutline, timeOutline } from 'ionicons/icons';

import { HeaderComponent } from '../../components/header/header.component';
import { PedidosService } from '../../services/pedidos';
import { CarritoService } from '../../services/carrito';
import { clp } from '../../utils/tienda-demo';
import { PedidoDetalle } from '../../models/pedido.model';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  imports: [RouterLink, HeaderComponent, IonContent, IonButton, IonIcon],
})
export class ConfirmacionPage {
  private readonly route = inject(ActivatedRoute);
  private readonly pedidosService = inject(PedidosService);
  private readonly carrito = inject(CarritoService);

  readonly pedido = signal<PedidoDetalle | null>(null);
  readonly cargando = signal(true);
  readonly error = signal('');
  readonly clp = clp;

  constructor() {
    addIcons({
      checkmarkCircleOutline,
      closeCircleOutline,
      timeOutline,
    });

    const id = Number(this.route.snapshot.queryParamMap.get('pedido_id'));

    if (!Number.isSafeInteger(id) || id <= 0) {
      this.error.set('No se recibió un identificador de pedido válido.');
      this.cargando.set(false);
      return;
    }

    this.consultarPedido(id);
  }

  consultarPedido(id: number) {
    this.cargando.set(true);
    this.error.set('');

    this.pedidosService.obtenerPedido(id).subscribe({
      next: (pedido) => {
        this.pedido.set(pedido);
        this.cargando.set(false);

        if (pedido.estado === 'pagado') {
          this.carrito.vaciar();
          sessionStorage.removeItem('tamsa_pedido_id');
        }
      },
      error: (error) => {
        console.error('Error al consultar pedido:', error);
        this.error.set('No fue posible consultar el estado del pedido.');
        this.cargando.set(false);
      },
    });
  }
}
