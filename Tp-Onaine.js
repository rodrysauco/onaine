class Bebida {
  idProducto;
  cantidad;
  tipo;
  variedad;
  cantidad;
  existencia;
  indiceRotacion;

  constructor() { }
}

class Balance {
  semana;
  bebidaList;

  constructor() {
    this.bebidaList = [];
    this.semana = 0;
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

class Inventario {
  inventario;

  constructor() {
    this.inventario = [];
  }

  addBebida(value) {
    this.inventario.push(value);
  }

  getInventario() {
    return this.inventario;
  }

  getBebida(id) {
    let aux;
    for (let bebida of this.inventario) {
      if (bebida.idProducto === id) {
        aux = bebida;
      }
    }
    return bebida;
  }
}

class ModeloP {
  periodoT;
  leadTime;
  demandaDiaria;
  demandaAnual;
  existenciaIndice;
  nivelService;
  sigma;
  diasLaborales;

  constructor(demandaAnual,demandaDiaria,nivel,tiempoRev,leadTime,sigD,exist) {
    this.demandaAnual = demandaAnual;
    this.demandaDiaria = demandaDiaria;
    this.nivelService = nivel / 100;
    this.periodoT = tiempoRev;
    this.leadTime = leadTime;
    this.sigma = sigD;
    this.existenciaIndice = exist;
  }

}