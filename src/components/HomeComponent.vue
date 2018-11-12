<template>
  <div>
    <el-card class="box-card">
      <div slot="header">
        <span class="bebidaName">Cálculos</span>
      </div>
      <div class="body">
        <div class="topBar">
          <el-steps :active="active" finish-status="success" align-center>
            <el-step title="Carga el producto"></el-step>
            <el-step title="Elección de modelo"></el-step>
            <el-step title="Resultados"></el-step>
          </el-steps>
        </div>

        <div v-if="!active">
          <!-- Carga los datos del producto -->
          <table class="tableCalculos">
            <tr>
              <td><span>Costo unidad</span></td><!-- C -->
              <td>
                <el-input-number v-model="randDrink.costo" size="mini" :min=0></el-input-number>
              </td>
            </tr>
            <tr>
              <td><span>Costo anual mantenimiento</span></td><!-- H -->
              <td>
                <el-input-number v-model="randDrink.costoAlma" size="mini" :min=0></el-input-number>
              </td>
            </tr>
            <tr>
              <td><span>Costo preparación</span></td><!-- S -->
              <td>
                <el-input-number v-model="randDrink.costoPedido" size="mini" :min=0></el-input-number>
              </td>
            </tr>
            <tr>
              <td><span>Demanda anual</span></td><!-- D -->
              <td>
                <el-input-number v-model="randDrink.demandaAnual" size="mini" :disabled=D :min=0></el-input-number>
              </td>
            </tr>
            <tr>
              <td><span>Demanda diaria</span></td><!-- D -->
              <td>
                <el-input-number v-model="randDrink.demandaDiaria" size="mini" :disabled=d :min=0></el-input-number>
              </td>
            </tr>
            <tr>
              <td><span>Lead time</span></td><!-- L -->
              <td>
                <el-input-number v-model="randDrink.leadTime" size="mini" :min=0></el-input-number>
              </td>
            </tr>
            <tr>
              <td><span>Desviación estandar</span></td> <!-- Desviacion estandar -->
              <td>
                <el-input-number v-model="randDrink.desviacionEstandar" size="mini" :min=0></el-input-number>
              </td>
            </tr>
            <tr>
              <td><span>Nivel de Servicio</span></td> <!-- P -->
              <td>
                <el-input-number v-model="randDrink.nivelServicio" size="mini" :min=0></el-input-number>
              </td>
            </tr>
            <tr>
              <td><span>Dias Laborales</span></td>
              <td>
                <el-input-number v-model="randDrink.diasLaborales" size="mini" :min=0></el-input-number>
              </td>
            </tr>
          </table>
          <div class="modelsHeader">
            <el-switch v-model="isPSelected" active-text="Usar modelo P" inactive-text=" Usar modelo Q"></el-switch>
          </div>
          <div class="continue">
            <el-button type="primary" :disabled="!butt" @click="go1plus"><i class="el-icon-arrow-right"></i> Continuar</el-button>
          </div>
        </div>
        <div v-if="active == 1">
          <div>
            <div v-if="isPSelected">
              <table class="tableCalculos">
                <tr>
                  <td>Dias de revisión</td> <!-- T -->
                  <td>
                    <el-input-number v-model="modeloP.revision" size="mini" :min=0></el-input-number>
                  </td>
                </tr>
                <tr>
                  <td>Inventario</td>
                  <td>
                    <el-input-number v-model="modeloP.inventario" size="mini" :min=0></el-input-number>
                  </td>
                </tr>
              </table>
            </div>
            <div v-else>
              <p>Busque en la tabla Brown: {{modeloQ.zD}}</p>
              <table class="tableCalculos">
                <tr>
                  <td>Desviación demanda</td>
                  <td>
                    <el-input-number v-model="modeloQ.eZ" size="mini" :step="0.01"></el-input-number>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div class="calculateActions">
            <el-button @click="goBack"><i class="el-icon-arrow-left"></i> Regresar</el-button>
            <section class="continue">
              <el-button type="primary" @click="go1plus"><i class="el-icon-arrow-right"></i> Continuar</el-button>
            </section>
          </div>
        </div>
        <div v-if="active > 1">
          <section>
            <div>Costo Total Esperado: {{modeloQ.CTE}}</div>
            <div>Cantidad optima de compra: {{resultado.cantidadOptima}}</div>
            <div>Punto de reorden: {{resultado.reorden}}</div>
            <div>faltantes: {{resultado.faltantes}}</div>
            <div>Nº de Ordenes de compra anuales:{{resultado.nOrdenes}}</div>
          </section>
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: "home-component",
  data() {
    return {
      active: 1,
      isPSelected: false,
      randDrink: {
        costo: 5000, //C
        costoAlma: 60, //H
        costoPedido: 160, //S
        demandaAnual: 0, //D
        demandaDiaria: 400, //d
        leadTime: 9, //L
        desviacionEstandar: 5, //Z
        nivelServicio: 98, //P
        diasLaborales: 25
      },
      modeloP: {
        sigmaL: 0, //desviacion durante entrega
        revision: 0, //T
        inventario: 0 //I
      },
      modeloQ: {
        zD: 0, //Valor de la tabla brown
        eZ: 0, // Pide el valor de la tabla
        oL: 0, // Desviación estándar de la demanda durante el plazo de entrega
        CTE: 0 //CTE
      },
      resultado: {
        nOrdenes:0, //D/q
        reorden: 0, //R
        cantidadOptima: 0, //Q optima
        faltantes: 0 //E(z)
      }
    };
  },
  computed: {
    d: function() {
      if (this.randDrink.demandaAnual !== 0) {
        return true;
      } else {
        return false;
      }
    },
    D: function() {
      if (this.randDrink.demandaDiaria !== 0) {
        return true;
      } else {
        return false;
      }
    },
    butt: function() {
      if (
        (this.randDrink.demandaDiaria || this.randDrink.demandaAnual) &&
        this.randDrink.costo &&
        this.randDrink.costoAlma &&
        this.randDrink.costoPedido &&
        this.randDrink.leadTime &&
        this.randDrink.desviacionEstandar &&
        this.randDrink.nivelServicio
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    goBack() {
      this.active--;
    },
    go1plus() {
      if (this.active < 2) {
        if (this.isPSelected) {
          this.active = 2;
        } else {
          this.active++;
          if (this.active === 1) {
            this.preparar();
          }
        }
      } else {
        this.active = 0;
      }
      if (this.active === 2) {
        if (this.isPSelected) {
          this.calcularSigmaL();
          this.calcularQ();
        } else {
          this.calcularReorden();
          this.calcularCTE();
          this.obtenerCantidadOrdenes();
        }
      }
    },
    preparar() {
      this.randDrink.nivelServicio = this.randDrink.nivelServicio / 100;
      if (this.randDrink.demandaAnual === 0) {
        this.randDrink.demandaAnual =
          this.randDrink.demandaDiaria * this.randDrink.diasLaborales * 12;
      } else {
        this.randDrink.demandaDiaria =
          this.randDrink.demandaAnual / 12 / this.randDrink.diasLaborales;
      }
      this.calcularoL();
      this.calcularQ();
      this.calculoEz();
    },
    calcularoL() {
      this.modeloQ.oL =
        Math.sqrt(this.randDrink.leadTime) * this.randDrink.desviacionEstandar;
    },
    calcularReorden() {
      let rta =
        this.randDrink.demandaDiaria * this.randDrink.leadTime +
        (this.modeloQ.eZ * this.modeloQ.oL);
      this.resultado.reorden = rta;
    },
    calcularCTE() {
      let cte =
        this.randDrink.demandaAnual * this.randDrink.costo +
        (this.randDrink.demandaAnual / this.resultado.cantidadOptima) *
          this.randDrink.costoPedido +
        (this.resultado.cantidadOptima / 2) * this.randDrink.costoAlma;
      this.modeloQ.CTE = Math.round(cte * 1000) / 1000;
    },
    calculoEz() {
      //((1-p)/q)/ol
      let ez =
        ((1 - this.randDrink.nivelServicio) * this.resultado.cantidadOptima) /
        this.modeloQ.oL;
      this.modeloQ.zD = Math.round(ez * 1000) / 1000;
    },
    calcularQ() {
      if (this.isPSelected) {
        let rta =
          this.randDrink.demandaDiaria *
            (this.modeloP.revision + this.randDrink.leadTime) +
          this.randDrink.desviacionEstandar * this.modeloP.sigmaL -
          this.modeloP.inventario;
        if (rta < 0) {
          rta = 0;
        }
        this.resultado.cantidadOptima = Math.floor(rta);
      } else {
        //si es q
        let cpo = Math.sqrt(
          (2 * this.randDrink.demandaAnual * this.randDrink.costoPedido) /
            this.randDrink.costoAlma
        );
        this.resultado.cantidadOptima = Math.round(cpo * 1000) / 1000;
      }
    },
    obtenerCantidadOrdenes(){
      this.resultado.nOrdenes = Math.round(this.randDrink.demandaAnual / this.resultado.cantidadOptima);
    },
    calcularSigmaL() {
      let v = Math.sqrt(this.modeloP.revision + this.randDrink.leadTime) * 1;
      this.modeloP.sigmaL = Math.round(v * 1000) / 1000;
    }
  }
};
</script>
<style>
.tableCalculos {
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
}

.continue {
  margin-left: 70%;
  display: inline;
}

.topBar {
  margin-bottom: 15px;
}

.modelsHeader {
  text-align: center;
}

@media only screen and (max-width: 800px) {
  .continue {
    margin-left: 50%;
  }
}
</style>