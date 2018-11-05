export default class Balance {
  week;
  drinkList;
  constructor() {
    this.drinkList = [];
    this.week = 0;
  }
  
  addBebida(value) {
    this.bebidaList.push(value);
  }

  totalVendido() {
    let total = 0;
    for (let bebida of this.bebidaList) {
      total += bebida.cantidad;
    }
    return total;
  }

  demandaProducto(idProducto) {
    let demanda = 0;
    for (let bebida of this.bebidaList) {
      if (bebida.id === idProducto) {
        demanda += bebida.cantidad;
      }
    }
    return demanda;
  }
}