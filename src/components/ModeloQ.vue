<template>
  <div class="content">
    <el-card class="box-card">
      <div slot="header">
        <div class="returnLink">
          <router-link to="/inventario"><i class="el-icon-caret-left"></i> Volver</router-link>
        </div>
        <div class="bebidaName">
          {{bebida.tipo}} / {{bebida.variedad}}
        </div>
      </div>
      <div v-if="bebida.indiceRotacion > 3">
        <section class="cardHeader">
          <div>Precio: ${{bebida.precio}}.-</div>
          <div>Stock: {{bebida.cantidad}} unidades</div>
          <div>Costo: ${{bebida.costo}}.-</div>
        </section>
        <section class="cardBody">
          <div>Demora: {{bebida.leadTime}} dias</div>
          <div>Demanda Anual: {{modelQ.demandaAnual}} unidades</div>
          <div>Demanda Diaria: {{modelQ.demandaDiaria}} unidades</div>
        </section>
        <section class="cardAppend">
          <div>Indice de rotacion: {{bebida.indiceRotacion}}</div>
          <div>Costo de Mantenimiento: {{modelQ.costoMantenimiento}}</div>
          <div>Punteo de reorden: {{modelQ.puntoReorden}}</div>
          <div>Costo Preparacion: {{modelQ.costoPreparacion}}</div>
          <div>Cantidad Pedido Optima: {{modelQ.cantidadPedidoOptima}}</div>
          <div>Costo Total Esperado (CTE): {{modelQ.costoTotalEsperado}}</div>
        </section>
      </div>
      <div v-else>
        <section class="cardAppend">
          Se recomienda realizar medicion P
        </section>
        <section class="cardAction">
          <el-button type="info" round @click="redirectP">Modelo P</el-button>
        </section>
      </div>
    </el-card>
  </div>
</template>
<script>
  import inventarioService from '@/services/inventarioService';
  import router from '../router.js';
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
      calcularCTE() {
        this.modelQ.costoTotalEsperado = (this.modelQ.demandaAnual * this.bebida.costo) + ((this.modelQ.demandaAnual / this.modelQ.cantidadPedidoOptima) * this.modelQ.costoPreparacion) + ((this.modelQ.cantidadPedidoOptima / 2) * this.modelQ.costoMantenimiento);
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
      },
      redirectP() {
        router.push({
          name: 'itemP',
          params: {
            id: this.$route.params.id
          }
        })
      }
    },
    beforeMount() {
      this.checkStatus();
    }
  }
</script>
<style>
</style>