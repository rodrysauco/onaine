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
            <el-step title="Datos adicionales"></el-step>
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
                <el-input-number v-model="randDrink.costoPreparacion" size="mini" :min=0></el-input-number>
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
          <div class="continue continue__first">
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
              Tiene produccion? <el-switch v-model="modeloQ.produccion" active-text="Si" inactive-text="No"></el-switch>
              <div v-if="modeloQ.produccion">
                <p class="modeloQ__tabla">Busque en la tabla Brown: {{modeloQ.zD}}</p>
                <table class="tableCalculos">
                  <tr>
                    <td>Ingrese el valor Z</td>
                    <td>
                      <el-input-number v-model="modeloQ.eZ" size="mini" :step="0.01"></el-input-number>
                    </td>
                  </tr>
                </table>
              </div>
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
            <div>Costo Total Esperado: $ {{modeloQ.CTE}}</div>
            <div>Cantidad optima de compra: {{resultado.cantidadOptima}} u.</div>
            <div>Punto de reorden: {{resultado.reorden}} u.</div>
            <div>Faltantes: {{resultado.faltantes}} u.</div>
            <div>Nº de Ordenes de compra anuales:{{resultado.nOrdenes}}</div>
          </section>
          <section>
            <el-button @click="goBack">Volver</el-button>
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
        active: 0,
        isPSelected: false,
        randDrink: {
          costo: 0, //C
          costoAlma: 0, //H
          costoPreparacion: 0, //S
          demandaAnual: 0, //D
          demandaDiaria: 0, //d
          leadTime: 0, //L
          desviacionEstandar: 0, //Z
          nivelServicio: 0, //P
          diasLaborales: 0
        },
        modeloP: {
          sigmaL: 0, //desviacion durante entrega
          revision: 0, //T
          inventario: 0, //I
          oTL: 0,
        },
        modeloQ: {
          produccion: false,
          zD: 0, //Valor de la tabla brown
          eZ: 0, // Pide el valor de la tabla
          oL: 0, // Desviación estándar de la demanda durante el plazo de entrega
          CTE: 0 //CTE
        },
        resultado: {
          nOrdenes: 0, //D/q
          reorden: 0, //R
          cantidadOptima: 0, //Q optima
          faltantes: 0 //E(z)
        }
      };
    },
    computed: {
      d: function () {
        if (this.randDrink.demandaAnual !== 0) {
          return true;
        } else {
          return false;
        }
      },
      D: function () {
        if (this.randDrink.demandaDiaria !== 0) {
          return true;
        } else {
          return false;
        }
      },
      butt: function () {
        if (
          (this.randDrink.demandaDiaria || this.randDrink.demandaAnual) &&
          this.randDrink.costo &&
          this.randDrink.costoAlma &&
          this.randDrink.costoPreparacion &&
          this.randDrink.leadTime
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      goBack() {
        if (this.isPSelected) {
          this.active = 0;
        } else {
          this.active--;
        }
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
        if (this.randDrink.nivelServicio > 1) {
          this.randDrink.nivelServicio = this.randDrink.nivelServicio / 100;
        }
        if (this.randDrink.demandaAnual === 0) {
          this.randDrink.demandaAnual =
            this.randDrink.demandaDiaria * this.randDrink.diasLaborales * 12;
        } else {
          this.randDrink.demandaDiaria =
            this.randDrink.demandaAnual / this.randDrink.diasLaborales;
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
        let mQp = 0;
        if (this.modeloQ.produccion) {
          mQp = this.modeloQ.eZ * this.modeloQ.oL
        }
        let rta =
          this.randDrink.demandaDiaria * this.randDrink.leadTime +
          mQp;
        this.resultado.reorden = Math.round(rta);
      },
      calcularCTE() {
        let mQP = 0;
        if (this.modeloQ.produccion) {
          mQP = this.modeloQ.eZ * this.modeloQ.oL * this.randDrink.costoAlma;
        }
        // DxC + Q/2*H+D/L*S + MQP
        let cte = this.randDrink.demandaAnual * this.randDrink.costo +
          ((this.resultado.cantidadOptima / 2) * this.randDrink.costoAlma) +
          ((this.randDrink.demandaAnual / this.resultado.cantidadOptima) * this.randDrink.costoPreparacion)
          + mQP;
        this.modeloQ.CTE = Math.round(cte * 1000) / 1000;
      },
      calculoEz() {
        //((1-p)/q)/ol
        if (this.randDrink.nivelServicio > 0) {
          let ez =
            ((1 - this.randDrink.nivelServicio) * this.resultado.cantidadOptima) /
            this.modeloQ.oL;
          this.modeloQ.zD = Math.round(ez * 1000) / 1000;
        }
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
          let cpo = Math.sqrt(
            (2 * this.randDrink.demandaAnual * this.randDrink.costoPreparacion) /
            this.randDrink.costoAlma);
          this.resultado.cantidadOptima = Math.round(cpo * 1000) / 1000;
        }
      },
      obtenerCantidadOrdenes() {
        this.resultado.nOrdenes = Math.floor(this.randDrink.demandaAnual / this.resultado.cantidadOptima);
      },
      calcularSigmaL() {
        let v = Math.sqrt(this.modeloP.revision + this.randDrink.leadTime) * 1;
        this.modeloP.sigmaL = Math.round(v * 1000) / 1000;
      }
    },
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

  .continue__first button {
    margin-top: 10px;
  }

  .topBar {
    margin-bottom: 15px;
  }

  .modelsHeader {
    text-align: center;
  }

  .modeloQ__tabla {
    width: 90%;
    margin-left: auto;
    margin-right: auto
  }

  @media only screen and (max-width: 800px) {
    .continue {
      margin-left: 50%;
    }
  }
</style>