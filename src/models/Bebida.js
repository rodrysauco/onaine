export default class Bebida {
  idProducto;
  tipo;
  variedad;
  precio;
  cantidad;
  indiceRotacion;
  costo;
  leadTime;

  constructor(id, tipo, variedad, precio, cantidad, costo, leadTime) {
    this.idProducto = id;
    this.precio = precio;
    this.tipo = tipo;
    this.variedad = variedad;
    this.cantidad = cantidad;
    this.costo = costo;
    this.leadTime = leadTime;
  }
}