import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports: [IonButtons, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class PerfilPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
