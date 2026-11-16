export interface Variante {
  id: number;
  talla: string;
  color: string;
  stock: number;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen_url: string | null;
  categoria: string;
  variantes: Variante[];
}
