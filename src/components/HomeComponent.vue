<template>
  <div>
    <el-card class="box-card">
      <span>Calculos</span>
      <div class="body">
        <section class="prodItem">
          <span>Costo en pesos </span>
          <el-input-number v-model="randDrink.costo" size="mini"></el-input-number>
        </section>
        <section class="prodItem">
          <span>Costo almacenamiento</span>
          <el-input-number v-model="randDrink.costoAlma" size="mini"></el-input-number>
        </section>
        <section class="prodItem">
          <span>Costo pedido</span>
          <el-input-number v-model="randDrink.costoPedido" size="mini"></el-input-number>
        </section>
        <section class="prodItem">
            <span>Dias laborales</span>
            <el-input-number v-model="randDrink.dias" size="mini"></el-input-number>
        </section>
        <section class="prodItem">
            <span>Demana anual</span>
            <el-input-number v-model="randDrink.demandaAnual" size="mini"></el-input-number>
        </section>
        <section class="prodItem">
            <span>Lead time</span>
            <el-input-number v-model="randDrink.leadTime" size="mini"></el-input-number>
        </section>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: 'home-component',
    data() {
      return {
        randDrink: {
          costo: 0,
          costoAlma: 0,
          costoPedido: 0,
          demandaAnual: 0,
          dias: 0,
          leadTime: 0,
        },
        modeloP: {
          demandaAnual: 0, //D
          demandaDiaria: 0, //d
          periodo: 0,
          sigmaTL: 0,
          desviacionEstandar: 0.8, //z
          cantidadQueDebeOrdenarse: 0 //q
        }
      }
    },
    methods: {

    }
  }
</script>
<style>
  .prodItem{
    padding: 5px;
  }
</style>