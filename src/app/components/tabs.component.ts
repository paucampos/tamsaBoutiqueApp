import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  homeOutline,
  searchOutline,
  cartOutline,
  personOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel],
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        @for (item of tabs; track item.tab) {
          <ion-tab-button [tab]="item.tab" [href]="'/' + item.tab">
            <ion-icon [name]="item.icon" aria-hidden="true"></ion-icon>
            <ion-label>{{ item.label }}</ion-label>
          </ion-tab-button>
        }
      </ion-tab-bar>
    </ion-tabs>
  `,
})
export class TabsPage {
  readonly tabs = [
    { tab: 'inicio', label: 'Inicio', icon: 'home-outline' },
    { tab: 'catalogo', label: 'Catálogo', icon: 'search-outline' },
    { tab: 'carrito', label: 'Carrito', icon: 'cart-outline' },
    { tab: 'perfil', label: 'Perfil', icon: 'person-outline' },
  ];

  constructor() {
    addIcons({ homeOutline, searchOutline, cartOutline, personOutline });
  }
}
