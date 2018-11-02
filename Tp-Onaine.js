class Bebida {
  idProducto;
  cantidad;
  tipo;
  variedad;
  cantidad;
  existencia;
  indiceRotacion;

  constructor() {}
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

  constructor(demandaAnual, demandaDiaria, nivel, tiempoRev, leadTime, sigD, exist) {
    this.demandaAnual = demandaAnual;
    this.demandaDiaria = demandaDiaria;
    this.nivelService = nivel / 100;
    this.periodoT = tiempoRev;
    this.leadTime = leadTime;
    this.sigma = sigD;
    this.existenciaIndice = exist;
  }
}

class modeloQ {
  costoAnualCT;
  demandaAnual;
  demandaDiaria;
  costoUnidad;
  costoPreparacion;
  leadTime;
  costoMantenimiento;

  constructor(demandaAnual, demandaDiaria, costoPreparacion, costoUnidad, costoMantenimiento) {
    this.demandaAnual = demandaAnual;
    this.demandaDiaria = demandaDiaria;
    this.costoPreparacion = costoPreparacion;
    this.costoUnidadcostoUnidad;
    this.costoMantenimiento = costoMantenimiento;
    this.leadTime = 1;
    //this.costoPreparacionS = 1; //------------------>> Ver 
  }

  calcularQ() {
    rta = Math.sqrt((2 * this.demandaAnual * this.costoPreparacion) / this.costoMantenimiento);
    return rta;
  }

  calcularReordenR() {
    rta = (this.demandaDiaria * this.leadTime);
    if (rta < 1) {
      rta = 1;
    }
    return rta;
  }
}

class Transacciones {
  lista;

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

transacciones = new Transacciones();

inventario = new Inventario();
if (!inventario.lista.lenght) {
  bebida01 = new Bebida(1, "Gaseosa", "Coca", 20, 19, transacciones.calcularIR(1, 20, 24));
  bebida02 = new Bebida(2, "Gaseosa", "Coca Light", 20, 12, transacciones.calcularIR(2, 20, 24));
  bebida03 = new Bebida(3, "Gaseosa", "Coca Zero", 20, 14, transacciones.calcularIR(3, 20, 24));
  bebida04 = new Bebida(4, "Gaseosa", "Sprite", 20, 6, transacciones.calcularIR(4, 20, 24));
  bebida05 = new Bebida(5, "Gaseosa", "Sprite Light", 20, 14, transacciones.calcularIR(5, 20, 24));
  bebida06 = new Bebida(6, "Gaseosa", "Fanta", 20, 5, transacciones.calcularIR(6, 20, 24));
  bebida07 = new Bebida(7, "Gaseosa", "Schweppes", 22, 2, transacciones.calcularIR(7, 22, 24));
  bebida08 = new Bebida(8, "Gaseosa", "Schweppes Pomelo", 22, 1, transacciones.calcularIR(8, 22, 24));
  bebida09 = new Bebida(9, "Agua Saborisada", "We Citrus", 15, 5, transacciones.calcularIR(9, 15, 24));
  bebida10 = new Bebida(10, "Agua Saborisada", "We Lemon", 15, 3, transacciones.calcularIR(10, 15, 24));
  bebida11 = new Bebida(11, "Agua Saborisada", "We Naranja", 15, 4, transacciones.calcularIR(11, 15, 24));
  bebida12 = new Bebida(12, "Agua Saborisada", "We Pomelo", 15, 1, transacciones.calcularIR(12, 15, 24));
  bebida13 = new Bebida(13, "Agua", "Agua sin gas", 5, 3, transacciones.calcularIR(13, 5, 24));
  bebida14 = new Bebida(14, "Agua", "Agua con gas", 5, 1, transacciones.calcularIR(14, 5, 24));
  bebida15 = new Bebida(15, "Vino Tinto", "Lopez", 31, 1, transacciones.calcularIR(15, 31, 20));
  bebida16 = new Bebida(16, "Vino Tinto", "Rincon Famoso", 90, 1, transacciones.calcularIR(16, 90, 16));
  bebida17 = new Bebida(17, "Vino Tinto", "Traful", 38, 3, transacciones.calcularIR(17, 38, 24));
  bebida18 = new Bebida(18, "Vino Tinto", "Elementos", 65, 1, transacciones.calcularIR(18, 65, 14));
  bebida19 = new Bebida(19, "Vino Tinto", "Bianchi", 47, 4, transacciones.calcularIR(19, 47, 28));
  bebida20 = new Bebida(20, "Vino Tinto", "Benjamin Senetiner", 55, 1, transacciones.calcularIR(20, 55, 24));
  bebida21 = new Bebida(21, "Vino Tinto", "Valmont", 65, 1, transacciones.calcularIR(21, 65, 20));
  bebida22 = new Bebida(22, "Vino Tinto", "Latitud 33", 90, 1, transacciones.calcularIR(22, 90, 18));
  bebida23 = new Bebida(23, "Vino Tinto", "Uxmal", 65, 1, transacciones.calcularIR(23, 65, 24));
  bebida24 = new Bebida(24, "Vino Tinto", "Suter", 90, 1, transacciones.calcularIR(24, 90, 18));
  bebida25 = new Bebida(25, "Vino Blanco", "Norton Cosecha Tardia", 70, 1, transacciones.calcularIR(25, 70, 18));
  bebida26 = new Bebida(26, "Vino Blanco", "Lopez", 65, 1, transacciones.calcularIR(26, 65, 24));
  bebida27 = new Bebida(27, "Vino Blanco", "Vasco Viejo", 35, 1, transacciones.calcularIR(27, 35, 24));
  bebida28 = new Bebida(28, "Vino Blanco", "Bianchi Chablis", 47, 1, transacciones.calcularIR(28, 47, 24));
  bebida29 = new Bebida(29, "Vino Blanco", "Etchart Privado", 39, 1, transacciones.calcularIR(29, 39, 24));
  bebida30 = new Bebida(30, "Vino Blanco", "Frizze", 30, 1, transacciones.calcularIR(30, 30, 12));

  inventario.agregarBebida(bebida01);
  inventario.agregarBebida(bebida02);
  inventario.agregarBebida(bebida03);
  inventario.agregarBebida(bebida04);
  inventario.agregarBebida(bebida05);
  inventario.agregarBebida(bebida06);
  inventario.agregarBebida(bebida07);
  inventario.agregarBebida(bebida08);
  inventario.agregarBebida(bebida09);
  inventario.agregarBebida(bebida10);
  inventario.agregarBebida(bebida11);
  inventario.agregarBebida(bebida12);
  inventario.agregarBebida(bebida13);
  inventario.agregarBebida(bebida14);
  inventario.agregarBebida(bebida15);
  inventario.agregarBebida(bebida16);
  inventario.agregarBebida(bebida17);
  inventario.agregarBebida(bebida18);
  inventario.agregarBebida(bebida19);
  inventario.agregarBebida(bebida20);
  inventario.agregarBebida(bebida21);
  inventario.agregarBebida(bebida22);
  inventario.agregarBebida(bebida23);
  inventario.agregarBebida(bebida24);
  inventario.agregarBebida(bebida25);
  inventario.agregarBebida(bebida26);
  inventario.agregarBebida(bebida27);
  inventario.agregarBebida(bebida28);
  inventario.agregarBebida(bebida29);
  inventario.agregarBebida(bebida30);
}