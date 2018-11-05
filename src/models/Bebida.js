export default class Bebida {
  idProducto;
  tipo;
  variedad;
  cantidad;
  existencia;
  indiceRotacion;

  constructor(id,type,variedad,qtt,existencia,IR) {
    this.idProducto = id;
    this.tipo = type;
    this.variedad = variedad;
    this.cantidad= qtt;
    this.existencia = existencia;
    this.indiceRotacion = IR;
  }
}