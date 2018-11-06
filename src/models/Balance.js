export default class Balance {
  week;
  drinkList;
  constructor() {
    this.drinkList = [];
    this.week = 0;
  }
  
  addBebida(value) {
    this.drinkList.push(value);
  }

  totalVendido() {
    let total = 0;
    for (let bebida of this.drinkList) {
      total += bebida.cantidad;
    }
    return total;
  }

  demandaProducto(idProducto) {
    let demanda = 0;
    for (let bebida of this.drinkList) {
      if (bebida.idProducto === idProducto) {
        demanda += bebida.cantidad;
      }
    }
    return demanda;
  }
}