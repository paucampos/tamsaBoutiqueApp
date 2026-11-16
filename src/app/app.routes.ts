import type { Routes } from '@angular/router';
import { TabsPage } from './components/tabs.component';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch: 'full' },
      {
        path: 'inicio',
        loadComponent: () => import('./pages/inicio/inicio.page').then((m) => m.InicioPage),
      },
      {
        path: 'catalogo',
        loadComponent: () => import('./pages/catalogo/catalogo.page').then((m) => m.CatalogoPage),
      },
      {
        path: 'catalogo/:id',
        loadComponent: () =>
          import('./pages/detalle-producto/detalle-producto.page').then((m) => m.DetalleProductoPage),
      },
      {
        path: 'mis-pedidos',
        loadComponent: () => import('./pages/mis-pedidos/mis-pedidos.page').then((m) => m.MisPedidosPage),
      },
      {
        path: 'mis-pedidos/confirmacion',
        loadComponent: () => import('./pages/confirmacion/confirmacion.page').then((m) => m.ConfirmacionPage),
      },
      {
        path: 'perfil',
        loadComponent: () => import('./pages/perfil/perfil.page').then((m) => m.PerfilPage),
      },
    ],
  },
  { path: '**', redirectTo: 'inicio' },
];
