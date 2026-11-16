import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonButtons, IonBackButton, IonIcon } from '@ionic/angular';
import { clp, foto, productos } from '../../utils/tienda-demo';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  imports: [RouterLink, IonBackButton, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonButton, IonButtons, IonIcon],
})
export class CatalogoPage {
  readonly categorias = ['Todo', 'Poleras', 'Polerones', 'Accesorios'];
  readonly categoria = signal('Todo');
  readonly busqueda = signal('');
  readonly clp = clp;
  readonly foto = foto;

  readonly resultados = computed(() => {
    const categoria = this.categoria();
    const texto = this.busqueda().trim().toLocaleLowerCase('es-CL');

    return productos.filter((producto) =>
      (categoria === 'Todo' || producto.categoria === categoria) &&
      producto.nombre.toLocaleLowerCase('es-CL').includes(texto),
    );
  });
}
