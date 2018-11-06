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
    <el-card class="box-card">
      <div slot="header">
        Modelo Q
      </div>
      <div>
        <p>
            Este modelo trata de determinar el punto específico R de existencias en stock (punto
            de reorden) en el cual se colocará un pedido de tamaño Q. El punto del pedido R, es
            siempre un número específico de unidades que, de mantenerse la demanda
            constante, debería alcanzar para atender a los clientes hasta que llegue el nuevo
            lote. Ver Figura 1.
            En este modelo, el Costo total esperado anual (CTE) o Costo anual total (TC) se
            calcula como:
            El punto de reorden se calcula como: R= d.L
        </p>
      </div>
    </el-card>
  </div>
</template>
<script>
  import inventarioService from '@/services/inventarioService';
  export default {
    name: 'modelo-q',
    data() {
      return {
        flag: false,
        bebida: {},
      }
    },
    methods: {
      checkStatus() {
        if (this.$route.params.id !== undefined) {
          this.flag = true;
          inventarioService.getBebida(this.$route.params.id)
            .then((data) => this.bebida = data)
            .catch((err) => console.log(err))
        }
      }
    },
    beforeMount() {
      this.checkStatus();
    }
  }
</script>
<style>

</style>