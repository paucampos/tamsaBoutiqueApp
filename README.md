# TamSa Boutique

TamSa Boutique es una aplicación móvil de vestuario y accesorios. El prototipo permite navegar por el catálogo, reservar prendas y simular el envío de un comprobante de transferencia bancaria. La primera entrega se encuentra en la rama [`main`](https://github.com/paucampos/tamsaBoutiqueApp/tree/main).

## Tecnologías y requisitos

- Ionic Angular **9.0.11**, Angular **22.2.5** y Capacitor **8.6.2**, según el archivo de bloqueo.
- Tener instalado [Node.js 22 LTS](https://nodejs.org/dist/v22.23.5/node-v22.23.5-x64.msi) (22.12 o superior dentro de esa versión) o Node.js 24 LTS, con el npm incluido.
- [Git](https://github.com/git-for-windows/git/releases/download/v2.56.1.windows.1/Git-2.56.1-64-bit.exe) es necesario para clonar por terminal. También se puede descargar el código como ZIP desde la rama de entrega.
- Un navegador moderno.

## Instalación y ejecución

Clona la rama, instala las dependencias e inicia el servidor de desarrollo:

```bash
git clone https://github.com/paucampos/tamsaBoutiqueApp.git
cd tamsaBoutiqueApp
npm ci
npm start
```

Abre en el navegador la dirección que indica `npm start` en la terminal, por lo general <http://localhost:8100>.

Para generar la compilación:

```bash
npm run build
```

El resultado queda en `www/`, el mismo directorio configurado en Capacitor.

## Pantallas y navegación

| Pantalla | Ruta | Qué se puede probar |
| --- | --- | --- |
| Inicio | `/inicio` | Abrir el catálogo, un producto destacado o Mis pedidos. |
| Catálogo | `/catalogo` | Buscar por nombre, filtrar por categoría y abrir la ficha de una prenda. |
| Detalle de producto | `/catalogo/:id` | Seleccionar las opciones disponibles y reservar el producto. |
| Mis pedidos | `/mis-pedidos` | Cambiar cantidades, quitar prendas, revisar el total y seleccionar un comprobante de ejemplo. |
| Confirmación | `/confirmacion` | Ver el estado **Comprobante en revisión**, el resumen y la indicación de retiro en boutique. |
| Perfil | `/perfil` | Abrir la vista base de perfil desde la barra inferior. |

## Recorrido para evaluación

1. En **Inicio**, pulsa **Ver prendas** y abre **Polera algodón**.
2. Elige una talla y un color. Pulsa **Reservar producto** para ir a **Mis pedidos**.
3. Cambia la cantidad con **+** y comprueba que se actualice el total.
4. Pulsa **Continuar a transferencia**, selecciona una imagen o un PDF de ejemplo y pulsa **Simular envío**.
5. Comprueba que aparezca **Comprobante en revisión** y que el total coincida con la reserva. Usa **Ver mis pedidos** o **Volver al inicio** para continuar navegando.

## Consideraciones de desarrollo y problemas resueltos

| Dificultad | Cómo se resolvió |
| --- | --- |
| Varias pantallas necesitaban un encabezado con el mismo diseño y distintas acciones. | Se creó el componente reutilizable `app-header` en `src/app/components/header/`. Cada pantalla configura su título y los botones que necesita, como la flecha de regreso, el menú lateral o el acceso a Mis pedidos. La barra inferior se define con `ion-tabs` en `src/app/components/tabs.component.ts`. |
| La ficha del producto, la reserva y la confirmación debían mostrar los mismos datos y totales al cambiar de pantalla. | Se centralizó la reserva en el servicio `TiendaDemo`, ubicado en `src/app/utils/tienda-demo.ts`. El servicio comparte el estado mediante señales de Angular y recalcula el total a partir de las cantidades. |
| El flujo debía representar una transferencia manual sin confirmar el abono al seleccionar el archivo. | Se agregó la selección de un comprobante de ejemplo y el estado **Comprobante en revisión**. La confirmación muestra el resumen de la reserva mientras el pago queda pendiente de verificación. |
| Los comandos de ejecución y compilación dependen de Ionic CLI, que se instala en las devDdependencies del proyecto. | Se documentó el flujo de trabajo con `npm ci`, los scripts `npm start` y `npm run build`. |

### Alcance de la simulación

- **Transferencia manual.** El flujo conserva el nombre del comprobante en memoria y muestra que el pago queda pendiente de revisión. Al recargar se reinicia la reserva. La carga a un servidor, la validación bancaria y la gestión de stock quedan fuera de esta versión. La pestaña **Confirmados** muestra su estado vacío.
- **Imágenes de ejemplo.** Los recursos incluidos corresponden al banner, la polera y el polerón. Los demás productos se pueden consultar aunque sus fotografías estén pendientes.
