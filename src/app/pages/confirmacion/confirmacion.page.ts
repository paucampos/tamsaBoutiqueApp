import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonTitle, IonContent, IonButton, IonIcon } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { timeOutline } from 'ionicons/icons';
import { clp, TiendaDemo } from '../../utils/tienda-demo';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.page.html',
  imports: [RouterLink, IonTitle, IonContent, IonButton, IonIcon],
})
export class ConfirmacionPage {
  readonly tienda = inject(TiendaDemo);
  readonly clp = clp;

  constructor() {
    addIcons({ timeOutline });
  }
}
