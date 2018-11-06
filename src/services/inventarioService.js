import Bebida from '../models/Bebida';
import Balance from '../models/Balance';
import Transacciones from '../models/Transacciones';

const transacciones = new Transacciones();

const inventory = [ //Carga id / tipo / variedad / precio / cantidad / costo / lead time
  new Bebida(1, "Gaseosa", "Coca", 20, 9, 15, 7),
  new Bebida(2, "Gaseosa", "Coca Light", 20, 2, 15, 7),
  new Bebida(3, "Gaseosa", "Coca Zero", 20, 8, 15, 7),
  new Bebida(4, "Gaseosa", "Sprite", 20, 6, 12, 7),
  new Bebida(5, "Gaseosa", "Sprite Light", 20, 4, 12, 7),
  new Bebida(6, "Gaseosa", "Fanta", 20, 5, 13, 7),
  new Bebida(7, "Gaseosa", "Schweppes", 22, 7, 14, 7),
  new Bebida(8, "Gaseosa", "Schweppes Pomelo", 22, 1, 14, 7),
  new Bebida(9, "Agua Saborisada", "We Citrus", 15, 5, 11, 7),
  new Bebida(10, "Agua Saborisada", "We Lemon", 15, 7, 11, 7),
  new Bebida(11, "Agua Saborisada", "We Naranja", 15, 4, 11, 7),
  new Bebida(12, "Agua Saborisada", "We Pomelo", 15, 1, 11, 7),
  new Bebida(13, "Agua", "Agua sin gas", 5, 3, 3, 7),
  new Bebida(14, "Agua", "Agua con gas", 5, 9, 3, 7),
  new Bebida(15, "Vino Tinto", "Lopez", 31, 19, 25, 14),
  new Bebida(16, "Vino Tinto", "Rincon Famoso", 90, 4, 50, 14),
  new Bebida(17, "Vino Tinto", "Traful", 38, 12, 29, 14),
  new Bebida(18, "Vino Tinto", "Elementos", 65, 12, 33, 14),
  new Bebida(19, "Vino Tinto", "Bianchi", 47, 4, 23, 14),
  new Bebida(20, "Vino Tinto", "Benjamin Senetiner", 55, 1, 21, 14),
  new Bebida(21, "Vino Tinto", "Valmont", 65, 3, 30, 14),
  new Bebida(22, "Vino Tinto", "Latitud 33", 90, 1, 40, 14),
  new Bebida(23, "Vino Tinto", "Uxmal", 65, 10, 50, 14),
  new Bebida(24, "Vino Tinto", "Suter", 90, 6, 33, 14),
  new Bebida(25, "Vino Blanco", "Norton Cosecha Tardia", 70, 6, 28, 14),
  new Bebida(26, "Vino Blanco", "Lopez", 65, 1, 26, 14),
  new Bebida(27, "Vino Blanco", "Vasco Viejo", 35, 5, 19, 14),
  new Bebida(28, "Vino Blanco", "Bianchi Chablis", 47, 6, 30, 14),
  new Bebida(29, "Vino Blanco", "Etchart Privado", 39, 4, 26, 14),
  new Bebida(30, "Vino Blanco", "Frizze", 30, 10, 15, 14),
]

for (let i = 0; i < 10; i++) {
  let balance = new Balance();
  for (let bebida of inventory) {
    balance.addBebida(bebida);
  }
  transacciones.addBalance(balance);
}

inventory[0].indiceRotacion = transacciones.calcularIR(1, 20, 24);
inventory[1].indiceRotacion = transacciones.calcularIR(2, 20, 24);
inventory[2].indiceRotacion = transacciones.calcularIR(3, 20, 24);
inventory[3].indiceRotacion = transacciones.calcularIR(4, 20, 24);
inventory[4].indiceRotacion = transacciones.calcularIR(5, 20, 24);
inventory[5].indiceRotacion = transacciones.calcularIR(6, 20, 24);
inventory[6].indiceRotacion = transacciones.calcularIR(7, 22, 24);
inventory[7].indiceRotacion = transacciones.calcularIR(8, 22, 24);
inventory[8].indiceRotacion = transacciones.calcularIR(9, 15, 24);
inventory[9].indiceRotacion = transacciones.calcularIR(10, 15, 24);
inventory[10].indiceRotacion = transacciones.calcularIR(11, 15, 24);
inventory[11].indiceRotacion = transacciones.calcularIR(12, 15, 24);
inventory[12].indiceRotacion = transacciones.calcularIR(13, 5, 24);
inventory[13].indiceRotacion = transacciones.calcularIR(14, 5, 24);
inventory[14].indiceRotacion = transacciones.calcularIR(15, 31, 20);
inventory[15].indiceRotacion = transacciones.calcularIR(16, 90, 16);
inventory[16].indiceRotacion = transacciones.calcularIR(17, 38, 24);
inventory[17].indiceRotacion = transacciones.calcularIR(18, 65, 14);
inventory[18].indiceRotacion = transacciones.calcularIR(19, 47, 28);
inventory[19].indiceRotacion = transacciones.calcularIR(20, 55, 24);
inventory[20].indiceRotacion = transacciones.calcularIR(21, 65, 20);
inventory[21].indiceRotacion = transacciones.calcularIR(22, 90, 18);
inventory[22].indiceRotacion = transacciones.calcularIR(23, 65, 24);
inventory[23].indiceRotacion = transacciones.calcularIR(24, 90, 18);
inventory[24].indiceRotacion = transacciones.calcularIR(25, 70, 18);
inventory[25].indiceRotacion = transacciones.calcularIR(26, 65, 24);
inventory[26].indiceRotacion = transacciones.calcularIR(27, 35, 24);
inventory[27].indiceRotacion = transacciones.calcularIR(28, 47, 24);
inventory[28].indiceRotacion = transacciones.calcularIR(29, 39, 24);
inventory[29].indiceRotacion = transacciones.calcularIR(30, 30, 12);


export default {
  getInventario() {
    return new Promise((resolve, reject) => {
      try {
        resolve(inventory);
      } catch (e) {
        reject(e.toString());
      }
    });
  },
  getBebida(id) {
    return new Promise((resolve, reject) => {
      try {
        let bebida = inventory.find(drink => drink.idProducto == id);
        resolve(bebida);
      } catch (e) {
        reject(e.toString());
      }
    });
  },
  addBebida(value) {
    inventory.push(value);
  },
  getTransations() {
    return new Promise((res, rej) => {
      try {
        res(transacciones);
      } catch (e) {
        rej(e);
      }
    })
  },
  devolverPrecio(id) {
    let rta = 0
    for (let bebida of inventory) {
      if (bebida.idProducto == id) {
        rta += bebida.existencia;
      }
    }
    return rta;
  },
  devolverIR(id) {
    let rta = 0;
    for (let bebida of inventory) {
      if (bebida.idProducto == id) {
        rta += bebida.indiceRotacion;
      }
    }
    return rta;
  }
}