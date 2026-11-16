import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular';

import { HeaderComponent } from '../../components/header/header.component';
import { clp } from '../../utils/tienda-demo';
import { CarritoService } from '../../services/carrito';
import { HttpErrorResponse } from '@angular/common/http';
import { PedidosService } from '../../services/pedidos';
import { PagosService } from '../../services/pagos';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrl: './checkout.page.scss',
  imports: [HeaderComponent, RouterLink, IonContent, IonButton],
})
export class CheckoutPage {
  readonly carrito = inject(CarritoService);
  readonly clp = clp;
  private readonly pedidosService = inject(PedidosService);

  readonly procesando = signal(false);
  readonly errorPedido = signal('');
  readonly pedidoCreadoId = signal<number | null>(null);
  private readonly pagosService = inject(PagosService);

  readonly iniciandoPago = signal(false);
  readonly errorPago = signal('');

  pagar() {
    if (this.procesando() || this.pedidoCreadoId() !== null || this.carrito.lineas().length === 0) {
      return;
    }

    this.procesando.set(true);
    this.errorPedido.set('');

    const productos = this.carrito.lineas().map((linea) => ({
      variante_id: linea.varianteId,
      cantidad: linea.cantidad,
    }));

    this.pedidosService.crearPedido({ productos }).subscribe({
      next: (respuesta) => {
        const pedido = respuesta.pedido;

        this.pedidoCreadoId.set(pedido.id);
        this.procesando.set(false);

        console.log('Pedido creado correctamente:', pedido);

        // En la siguiente etapa iniciaremos Webpay
        // utilizando pedido.id.
      },

      error: (error: HttpErrorResponse) => {
        this.procesando.set(false);

        this.errorPedido.set(
          typeof error.error?.message === 'string'
            ? error.error.message
            : 'No fue posible crear el pedido. Intenta nuevamente.',
        );

        console.error('Error al crear pedido:', error);
      },
    });
  }

  iniciarPago() {
    const pedidoId = this.pedidoCreadoId();

    if (!pedidoId || this.iniciandoPago()) {
      return;
    }

    this.iniciandoPago.set(true);
    this.errorPago.set('');

    this.pagosService.iniciarPago(pedidoId).subscribe({
      next: respuesta => {
        console.log('Transacción Webpay creada:', {
          pedido_id: respuesta.pedido_id,
          monto: respuesta.monto
        });

        // Guardamos el identificador para recuperarlo
        // después de regresar desde Webpay.
        sessionStorage.setItem(
          'tamsa_pedido_id',
          String(respuesta.pedido_id)
        );

        this.redirigirAWebpay(respuesta.url, respuesta.token);
      },

      error: error => {
        this.iniciandoPago.set(false);

        this.errorPago.set(
          typeof error.error?.message === 'string'
            ? error.error.message
            : 'No fue posible iniciar el pago.'
        );

        console.error('Error al iniciar Webpay:', error);
      }
    });
  }

  private redirigirAWebpay(url: string, token: string) {
    const destino = new URL(url);

    if (destino.protocol !== 'https:') {
      this.iniciandoPago.set(false);
      this.errorPago.set('La URL de Webpay no es válida.');
      return;
    }

    const formulario = document.createElement('form');

    formulario.method = 'POST';
    formulario.action = destino.toString();

    const input = document.createElement('input');

    input.type = 'hidden';
    input.name = 'token_ws';
    input.value = token;

    formulario.appendChild(input);
    document.body.appendChild(formulario);

    formulario.submit();
  }
}
