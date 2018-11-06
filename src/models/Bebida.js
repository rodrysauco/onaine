export default class Bebida {
  idProducto;
  tipo;
  variedad;
  precio;
  cantidad;
  existencia;
  indiceRotacion;

  constructor(id, tipo, variedad, precio, cantidad, existencia) {
    this.idProducto = id;
    this.precio = precio;
    this.tipo = tipo;
    this.variedad = variedad;
    this.cantidad = cantidad;
    this.existencia = existencia;
  }
}