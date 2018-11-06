<template>
  <div class="content">
    <el-card class="box-card">
      <div slot="header">
        <div class="returnLink">
          <router-link to="/inventario"><i class="el-icon-caret-left"></i> Volver</router-link>
        </div>
        <div class="text item">
          Tipo: {{bebida.tipo}}
          Variedad: {{bebida.variedad}}
          Precio: {{bebida.precio}}
          Cantidad: {{bebida.cantidad}}
          Indice de rotacion: {{bebida.indiceRotacion}}
          Costo: {{bebida.costo}}
          Lead Time: {{bebida.leadTime}}

          Demanda Anual: {{modelQ.demandaAnual}}
          Demanda Diaria: {{modelQ.demandaDiaria}}
          Costo de Mantenimiento: {{modelQ.costoMantenimiento}}
          Punteo de reorden: {{modelQ.puntoReorden}}
          Costo Preparacion: {{modelQ.costoPreparacion}}
          Cantidad Pedido Optima: {{modelQ.cantidadPedidoOptima}}
          Costo Total Esperado (CTE): {{modelQ.costoTotalEsperado}}
        </div>
      </div>
      <div slot="body">

      </div>
    </el-card>
  </div>
</template>
<script>
  import inventarioService from '@/services/inventarioService';
  export default {
    name: 'modelo-q',
    data() {
      return {
        bebida: {},
        modelQ: {
          costoTotalEsperado: 0, //cte
          puntoReorden: 0,
          cantidadPedidoOptima: 0, //q
          demandaAnual: 0, //D
          demandaDiaria: 0,//d
          costoMantenimiento: 0.5,//H
          costoPreparacion: 0.8, //S
        }
      }
    },
    methods: {
      loadingData(data) {
        let id = this.$route.params.id;
        this.modelQ.demandaAnual = data.demandaAnualProducto(id);
        this.modelQ.demandaDiaria = data.demandaDiariaProducto(id);
        this.calcularQ();
        this.calcularReorden();
        this.calcularCTE();
      },
      calcularQ() {
        this.modelQ.cantidadPedidoOptima = Math.sqrt((2 * this.modelQ.demandaAnual * this.modelQ.costoPreparacion) /
          this.modelQ.costoMantenimiento);
      },
      calcularReorden() {
        let rta = (this.modelQ.demandaDiaria * this.bebida.leadTime);
        if (rta < 1) {
          rta = 1;
        }
        this.modelQ.puntoReorden = rta;
      },
      calcularCTE(){
        this.modelQ.costoTotalEsperado = (this.modelQ.demandaAnual * this.bebida.costo) + ((this.modelQ.demandaAnual/this.modelQ.cantidadPedidoOptima)*this.modelQ.costoPreparacion) + ((this.modelQ.cantidadPedidoOptima/2)*this.modelQ.costoMantenimiento);
      },
      checkStatus() {
        if (this.$route.params.id !== undefined) {
          inventarioService.getBebida(this.$route.params.id)
            .then((data) => this.bebida = data)
            .catch((err) => console.log(err));
          inventarioService.getTransations()
            .then((data) => this.loadingData(data))
            .catch(err => console.log(err))
        }
      }
    },
    beforeMount() {
      this.checkStatus();
    }
  }
</script>
<style>

</style>