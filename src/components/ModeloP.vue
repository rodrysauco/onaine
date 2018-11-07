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
        <section class="cardAppend">
          Se recomienda realizar medicion Q
        </section>
        <section class="cardAction">
          <el-button type="info" round @click="redirectQ">Modelo Q</el-button>
        </section>
      </div>
      <div v-else>
        <section class="cardHeader">
          <div>Precio: ${{bebida.precio}}.- </div>
          <div>Cantidad: {{bebida.cantidad}} unidades</div>
          <div>Costo: ${{bebida.costo}}.-</div>
        </section>
        <section class="cardBody">
          <div>Demora: {{bebida.leadTime}} dias</div>
          <div>Demanda Anual: {{modelP.demandaAnual}} unidades</div>
          <div>Demanda Diaria: {{modelP.demandaDiaria}} unidades</div>
        </section>
        <section class="cardAppend">
          <div>Indice de rotacion: {{bebida.indiceRotacion}}</div>
          <div>Periodo: {{modelP.periodo}} dias</div>
          <div>σTL: {{modelP.sigmaTL}}</div>
          <div>Desviacion Estandar: {{modelP.desviacionEstandar}}</div>
          <div>Cantidad a pedir: {{modelP.cantidadQueDebeOrdenarse}}</div>
        </section>
      </div>
    </el-card>
  </div>
</template>
<script>
  import inventarioService from '@/services/inventarioService';
  import router from '../router.js';
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
        this.modelP.demandaDiaria = Math.round(data.demandaDiariaProducto(id) * 1000) / 1000;
        this.calcularSigmaTL();
        this.calcularQ();
      },
      calcularQ() {
        let rta = (this.modelP.demandaDiaria * (this.modelP.periodo + this.bebida.leadTime)) + (this.modelP.desviacionEstandar *
          this.modelP.sigmaTL) - this.bebida.cantidad;
        if (rta < 0) {
          rta = 0;
        }
        this.modelP.cantidadQueDebeOrdenarse = Math.floor(rta);
      },
      calcularSigmaTL() {
        let v = Math.sqrt(this.modelP.periodo + this.bebida.leadTime) * 1;
        this.modelP.sigmaTL = Math.round(v * 1000) / 1000;
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
      redirectQ() {
        router.push({
          name: "itemQ",
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
  .box-card {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
    font-size: 18px;
  }

  .returnLink {
    font-size: 12px;
    padding-bottom: 5px;
  }

  .returnLink a {
    color: #2196f3;
    text-decoration: none;
    transition: font-size 0.5s;
  }

  a:hover{
    font-size: 15px;
  }

  .bebidaName {
    font-size: 22px;
    font-style: italic;
    padding: 2px;
  }

  .cardHeader {
    line-height: 25px;
    padding-left: 5px;
    border-bottom: 1px solid #607d8b2e;
  }

  .cardBody {
    line-height: 25px;
    padding-left: 5px;
    padding-top: 5px;
    border-bottom: 1px solid #607d8b2e;
  }

  .cardAppend {
    line-height: 25px;
    padding-left: 5px;
    padding-top: 5px;
  }

  .cardAction {
    text-align: right;
  }
</style>