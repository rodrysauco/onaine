import Bebida from '../models/Bebida';
import Transacciones from '../models/Transacciones';

let transacciones = new Transacciones();

const inventory = [
  new Bebida(1, "Gaseosa", "Coca", 20, 19, transacciones.calcularIR(1, 20, 24)),
  new Bebida(2, "Gaseosa", "Coca Light", 20, 12, transacciones.calcularIR(2, 20, 24)),
  new Bebida(3, "Gaseosa", "Coca Zero", 20, 14, transacciones.calcularIR(3, 20, 24)),
  new Bebida(4, "Gaseosa", "Sprite", 20, 6, transacciones.calcularIR(4, 20, 24)),
  new Bebida(5, "Gaseosa", "Sprite Light", 20, 14, transacciones.calcularIR(5, 20, 24)),
  new Bebida(6, "Gaseosa", "Fanta", 20, 5, transacciones.calcularIR(6, 20, 24)),
  new Bebida(7, "Gaseosa", "Schweppes", 22, 2, transacciones.calcularIR(7, 22, 24)),
  new Bebida(8, "Gaseosa", "Schweppes Pomelo", 22, 1, transacciones.calcularIR(8, 22, 24)),
  new Bebida(9, "Agua Saborisada", "We Citrus", 15, 5, transacciones.calcularIR(9, 15, 24)),
  new Bebida(10, "Agua Saborisada", "We Lemon", 15, 3, transacciones.calcularIR(10, 15, 24)),
  new Bebida(11, "Agua Saborisada", "We Naranja", 15, 4, transacciones.calcularIR(11, 15, 24)),
  new Bebida(12, "Agua Saborisada", "We Pomelo", 15, 1, transacciones.calcularIR(12, 15, 24)),
  new Bebida(13, "Agua", "Agua sin gas", 5, 3, transacciones.calcularIR(13, 5, 24)),
  new Bebida(14, "Agua", "Agua con gas", 5, 1, transacciones.calcularIR(14, 5, 24)),
  new Bebida(15, "Vino Tinto", "Lopez", 31, 1, transacciones.calcularIR(15, 31, 20)),
  new Bebida(16, "Vino Tinto", "Rincon Famoso", 90, 1, transacciones.calcularIR(16, 90, 16)),
  new Bebida(17, "Vino Tinto", "Traful", 38, 3, transacciones.calcularIR(17, 38, 24)),
  new Bebida(18, "Vino Tinto", "Elementos", 65, 1, transacciones.calcularIR(18, 65, 14)),
  new Bebida(19, "Vino Tinto", "Bianchi", 47, 4, transacciones.calcularIR(19, 47, 28)),
  new Bebida(20, "Vino Tinto", "Benjamin Senetiner", 55, 1, transacciones.calcularIR(20, 55, 24)),
  new Bebida(21, "Vino Tinto", "Valmont", 65, 1, transacciones.calcularIR(21, 65, 20)),
  new Bebida(22, "Vino Tinto", "Latitud 33", 90, 1, transacciones.calcularIR(22, 90, 18)),
  new Bebida(23, "Vino Tinto", "Uxmal", 65, 1, transacciones.calcularIR(23, 65, 24)),
  new Bebida(24, "Vino Tinto", "Suter", 90, 1, transacciones.calcularIR(24, 90, 18)),
  new Bebida(25, "Vino Blanco", "Norton Cosecha Tardia", 70, 1, transacciones.calcularIR(25, 70, 18)),
  new Bebida(26, "Vino Blanco", "Lopez", 65, 1, transacciones.calcularIR(26, 65, 24)),
  new Bebida(27, "Vino Blanco", "Vasco Viejo", 35, 1, transacciones.calcularIR(27, 35, 24)),
  new Bebida(28, "Vino Blanco", "Bianchi Chablis", 47, 1, transacciones.calcularIR(28, 47, 24)),
  new Bebida(29, "Vino Blanco", "Etchart Privado", 39, 1, transacciones.calcularIR(29, 39, 24)),
  new Bebida(30, "Vino Blanco", "Frizze", 30, 1, transacciones.calcularIR(30, 30, 12)),
]

export default {
  getInventario(){
    return new Promise((resolve,reject)=>{
      try{
        resolve(inventory);
      } catch (e){
        reject(e.toString());
      }
    });
  },
  getBebida(id){
    return new Promise((resolve,reject)=>{
      try{
        let bebida = inventory.find(drink => drink.id === id);
        resolve(bebida);
      } catch (e){
        reject(e.toString());
      }
    });
  },
  addBebida(value){
    inventory.push(value);
  }
}