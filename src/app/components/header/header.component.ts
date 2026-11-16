import { booleanAttribute, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { bagHandleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    IonBackButton,
    IonButton,
    IonButtons,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonTitle,
    IonToolbar,
  ],
  styleUrl: './header.component.scss',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly title = input.required<string>();
  readonly backHref = input<string>();
  readonly showOrders = input(false, { transform: booleanAttribute });
  readonly showMenu = input(false, { transform: booleanAttribute });
  readonly brand = input(false, { transform: booleanAttribute });

  constructor() {
    addIcons({ bagHandleOutline });
  }
}
