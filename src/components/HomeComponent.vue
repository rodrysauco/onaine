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
                <el-input-number v-model="randDrink.desviacionEstandar" size="mini" :step='0.01' :min=0></el-input-number>
              </td>
            </tr>
            <tr>
              <td><span>Nivel de Servicio</span></td> <!-- P -->
              <td>
                <el-input-number v-model="randDrink.nivelServicio" size="mini" :min=0></el-input-number>
              </td>
            </tr>
          </table>
          <div class="calculateActions">
            
          </div>
        </div>
        <div v-if="active == 1">
          <div class="modelsHeader">
            <el-switch v-model="isPSelected" active-text="Usar modelo P" inactive-text=" Usar modelo Q"></el-switch>
          </div>
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
              <table class="tableCalculos">
                <tr>
                  <td>Desviación demanda</td>
                  <td><el-input-number v-model="modeloQ.zD" size="mini" :step="0.01" :min=0></el-input-number></td>
                </tr>
              </table>
            </div>
          </div>
          <div class="calculateActions">
              <el-button @click="goBack"><i class="el-icon-arrow-left"></i> Regresar</el-button>
              <section class="continue">
                <el-button type="primary"><i class="el-icon-arrow-right"></i> Continuar</el-button>
              </section>
          </div>
        </div>
        <div v-if="active > 1">
          muestra los results
        </div>
      </div>
    </el-card>
  </div>
</template>
<script>
  export default {
    name: 'home-component',
    data() {
      return {
        active: 1,
        isPSelected: true,
        randDrink: {
          costo: 0, //C
          costoAlma: 0, //H
          costoPedido: 0, //S
          demandaAnual: 0, //D
          demandaDiaria: 0, //d
          leadTime: 0, //L
          desviacionEstandar: 0, //Z
          nivelServicio: 0, //P
        },
        modeloP: {
          sigmaL: 0, //desviacion durante entrega
          revision: 0, //T
          inventario: 0, //I
        },
        modeloQ: {
          zL: 0, //Desviacion durante la entrega
          zD:0, //Desviacion de la demanda

        },
        resultado: {
          reorden: 0, //R
          CTE: 0, //CTE
          cantidadOptima: 0, //Q optima
          faltantes: 0, //E(z)
        }
      }
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
      }
    },
    methods: {
      goBack(){
        this.active--;
      },
      Qoptima() {

      }
    }
  }
</script>
<style>
  .tableCalculos {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  .topBar {
    margin-bottom: 15px;
  }

  .modelsHeader {
    text-align: center;
  }
</style>