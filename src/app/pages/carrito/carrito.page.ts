import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular';
import { clp, foto } from '../../utils/tienda-demo';
import { HeaderComponent } from '../../components/header/header.component';
import { CarritoService } from '../../services/carrito';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
  imports: [HeaderComponent, RouterLink, IonContent, IonButton],
})
export class CarritoPage {
  private readonly router = inject(Router);
  readonly carrito = inject(CarritoService);
  readonly clp = clp;
  // readonly foto = foto;

  readonly imagenProducto = (producto: Producto): string =>
  producto.imagen_url || 'assets/productos/placeholder.png';

}
