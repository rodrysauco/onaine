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

          Demanda Anual: {{modelP.demandaAnual}}
          Demanda Diaria: {{modelP.demandaDiaria}}
          Periodo: {{modelP.periodo}}
          σTL: {{modelP.sigmaTL}}
          Desviacion Estandar: {{modelP.desviacionEstandar}}
          Q Cantidad que debe ordenarse: {{modelP.cantidadQueDebeOrdenarse}}
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
    name: 'modelo-p',
    data() {
      return {
        bebida: {},
        modelP: {
          demandaAnual: 0, //D
          demandaDiaria: 0, //d
          nivelServicio: 0,
          periodo: 7,
          sigmaTL: 1,
          desviacionEstandar: 0.8, //z
          cantidadQueDebeOrdenarse: 0 //q
        }
      }
    },
    components: {},
    methods: {
      loadingData(data) {
        let id = this.$route.params.id;
        this.modelP.demandaAnual = data.demandaAnualProducto(id);
        this.modelP.demandaDiaria = data.demandaDiariaProducto(id);
        this.calcularSigmaTL();
        this.calcularQ();
      },
      calcularQ() {
        let rta = (this.modelP.demandaDiaria * (this.modelP.periodo + this.bebida.leadTime)) + (this.modelP.desviacionEstandar *
          this.modelP.sigmaTL) - this.bebida.cantidad;
        if (rta < 0) {
          rta = 0;
        }
        this.modelP.cantidadQueDebeOrdenarse = rta;
      },
      calcularSigmaTL() {
        this.modelP.sigmaTL = Math.sqrt(this.modelP.periodo + this.bebida.leadTime) * 1;
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
    color: black;
    text-decoration: none;
  }

  .bebidaName {
    font-size: 18px;
    padding: 2px;
  }
</style>