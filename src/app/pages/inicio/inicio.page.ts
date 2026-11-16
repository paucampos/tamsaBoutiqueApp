import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular';
import { clp, foto, productos } from '../../utils/tienda-demo';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [
    CommonModule,
    HeaderComponent,
    IonButton,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonMenu,
    IonTitle,
    IonToolbar,
    RouterLink,
  ],
})
export class InicioPage implements OnInit {
  readonly destacados = productos.slice(0, 2);
  readonly clp = clp;
  readonly foto = foto;

  constructor() {}

  ngOnInit() {}
}
