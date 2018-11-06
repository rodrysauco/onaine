export default class Transacciones {
  lista; //Lista de balances

  constructor() {
    this.lista = [];
  }

  addBalance(value) {
    this.lista.push(value);
  }

  totalVendido() {
    let total = 0;
    for (let balance of this.lista) {
      total += balance.totalVendido();
    }
    return total;
  }

  demandaAnualProducto(id) { 
    let demanda = 0;
    for (let balance of this.lista) {
      demanda += balance.demandaProducto(id);
    }
    return demanda;
  }

  demandaDiariaProducto(id) {
    let demandaAnual = this.demandaAnualProducto(id);
    let diasLaborales = this.lista.lenght * 3;
    let rta = demandaAnual / diasLaborales;

    return rta;
  }

  calcularIR(id, precio, invPromedio) {
    let valorInv = precio * invPromedio;
    let costoAnual = this.demandaAnualProducto(id) * precio;
    let rta = costoAnual / valorInv;
    return rta;
  }
}