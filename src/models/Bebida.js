export default class Bebida {
  idProducto;
  tipo;
  variedad;
  cantidad;
  existencia;
  indiceRotacion;

  constructor(id,type,variedad,qtt,existencia) {
    this.idProducto = id;
    this.tipo = type;
    this.variedad = variedad;
    this.cantidad= qtt;
    this.existencia = existencia;
  }
}