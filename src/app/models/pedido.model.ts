export interface DetallePedidoRequest {
  variante_id: number;
  cantidad: number;
}

export interface CrearPedidoRequest {
  productos: DetallePedidoRequest[];
}

export interface Pedido {
  id: number;
  estado: string;
  total: number;
  stock_reservado: boolean;
  reserva_expira: string;
  productos: (DetallePedidoRequest & {
    precio_unitario: number;
  })[];
}

export interface CrearPedidoResponse {
  message: string;
  pedido: Pedido;
}

export interface ProductoPedido {
  variante_id: number;
  producto: string;
  talla: string;
  color: string;
  cantidad: number;
  precio_unitario: number;
}

export interface PedidoDetalle {
  id: number;
  estado: string;
  total: number;
  fecha_creacion: string;
  productos: ProductoPedido[];
}
