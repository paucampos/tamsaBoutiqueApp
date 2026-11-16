import { Component, OnInit } from '@angular/core';
import { IonContent, IonTitle } from '@ionic/angular';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  imports: [HeaderComponent, IonTitle, IonContent],
})
export class PerfilPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
