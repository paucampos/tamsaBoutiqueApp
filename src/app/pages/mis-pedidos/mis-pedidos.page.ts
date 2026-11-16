import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonButton, IonSegment, IonSegmentButton, IonLabel } from '@ionic/angular';
import { clp, foto, TiendaDemo } from '../../utils/tienda-demo';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-mis-pedidos',
  templateUrl: './mis-pedidos.page.html',
  imports: [HeaderComponent, RouterLink, IonContent, IonButton, IonSegment, IonSegmentButton, IonLabel],
})
export class MisPedidosPage {
  private readonly router = inject(Router);
  readonly tienda = inject(TiendaDemo);
  readonly seccion = signal('reserva');
  readonly mostrarTransferencia = signal(false);
  readonly archivo = signal('');
  readonly clp = clp;
  readonly foto = foto;

  seleccionarArchivo(evento: Event) {
    const input = evento.target as HTMLInputElement;
    this.archivo.set(input.files?.[0]?.name ?? '');
  }

  enviarComprobante() {
    if (!this.archivo() || !this.tienda.lineas().length || this.tienda.comprobante()) return;
    this.tienda.comprobante.set(this.archivo());
    void this.router.navigateByUrl('/confirmacion');
  }
}
