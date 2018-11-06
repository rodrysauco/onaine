<template>
  <div class="content" v-if="flag">
    <el-card class="box-card">
      <div slot="header">
        <div class="returnLink">
          <router-link to="/inventario"><i class="el-icon-caret-left"></i> Volver</router-link>
        </div>
        <div class="bebidaName">
          {{bebida.tipo}} / {{bebida.variedad}}
        </div>
      </div>
      <div slot="body">

      </div>
    </el-card>
  </div>
  <div class="content" v-else>
    HOLA
  </div>
</template>
<script>
  import inventarioService from '@/services/inventarioService';
  export default {
    name: 'modelo-p',
    data() {
      return {
        flag: false,
        bebida: {},
        modelP: {
          demandaAnual: 0,
          demandaDiaria: 0,
          nivelServicio: 0,
          periodo: 7,
          leadTime: 1,
          sigma: 1,
          existencia: 0,
        }
      }
    },
    components: {
    },
    methods: {
      calculate(event) {
        console.log(event);

        /* new ModeloP(transacciones.demandaAnualProducto(id), transacciones.demandaDiariaProducto(id), 
  nivel, 7, 1, 1,inventario.devolverExistencia(id))  */
      },
      loadingData(data) {
        let id = this.$route.params.id;
        this.modelP.demandaAnual = data.demandaAnualProducto(id);
        this.modelP.demandaDiaria = data.demandaDiariaProducto(id);
        this.modelP.existencia = inventarioService.devolverExistencia(id);
      },
      checkStatus() {
        if (this.$route.params.id !== undefined) {
          this.flag = true;
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
  .box-card {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }

  .returnLink {
    font-size: 12px;
    padding-bottom: 5px;
  }

  .returnLink a {
    color: blue;
    text-decoration: none;
  }

  .bebidaName {
    font-size: 18px;
    padding: 2px;
  }
</style>