<template>
  <div v-if="catalogo.length" class="tableInventory">
    <div>
      <el-table :data="catalogo" height="600" stripe>
        <el-table-column prop="tipo" width="150" label="Tipo" sortable></el-table-column>
        <el-table-column prop="variedad" width="150" label="Bebida" sortable></el-table-column>
        <el-table-column prop="cantidad" label="Stock" align="center" sortable></el-table-column>
        <el-table-column prop="costo" label="Costo" align="center" sortable></el-table-column>
        <el-table-column prop="precio" label="Precio" align="center" sortable></el-table-column>
        <el-table-column prop="leadTime" label="Lead Time" align="center" sortable></el-table-column>

        <el-table-column label="Acciones" align="center" width="205">
          <template slot-scope="scope">
            <el-button size="mini" type=info @click="modelP(scope.row)">Modelo P</el-button>
            <el-button size="mini" type=info @click="modelQ(scope.row)">Modelo Q</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import inventarioService from '@/services/inventarioService';
  import router from '../router.js';
  export default {
    name: 'inventario-component',
    props: {
      noInv: Boolean,
    },
    data() {
      return {
        catalogo: [],
      }
    },
    beforeMount() {
      inventarioService.getInventario()
        .then((data) => this.catalogo = data) // eslint-disable-next-line
        .catch((error) => console.log(error))
    },
    methods: {
      modelP(bebida) {
        router.push({
          name: 'itemP',
          params: {
            id: bebida.idProducto
          }
        })
      },
      modelQ(bebida) {
        router.push({
          name: 'itemQ',
          params: {
            id: bebida.idProducto
          }
        })
      }
    }
  }
</script>

<style>
  .tableInventory {
    width: 80%;
    max-width: 1000px;
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    margin-top: 20px;
  }

  @media only screen and (max-width: 996px) {
    .tableInventory {
      width: 90%;
    }
  }
</style>