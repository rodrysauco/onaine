<template>
  <inventario-component :noInv='true' @selected="calculate($event)"></inventario-component>
</template>
<script>
  import InventarioComponent from './Inventario.vue'
  export default {
    name: 'modelo-p',
    components: {
      InventarioComponent
    },
    methods:{
      calculate(event){
        console.log(event);
        /* new ModeloP(transacciones.demandaAnualProducto(id), transacciones.demandaDiariaProducto(id), 
  nivel, 7, 1, 1,inventario.devolverExistencia(id))  */
      },
    }
  }
</script>

<style>

</style>