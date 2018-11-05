<template>
    <p>
        Pensaba mostrar el inventario, vos que decis?
        </p>
  
</template>
<script>
import inventarioService from '@/services/inventarioService'
export default {
  name:'inventario-component',
  data(){
    return {
      catalogo:[],
    }
  },
  beforeMount(){
    inventarioService.getInventario()
      .then((data)=>this.catalogo = data) // eslint-disable-next-line
        .catch((error)=>console.log(error))
  },
}
</script>

<style>

</style>

