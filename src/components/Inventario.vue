<template>
  <div v-if="catalogo.length" class="tableInventory">
    <div>
      <el-table :data="catalogo" height="600" stripe>
        <el-table-column prop="tipo" width="130" label="Tipo" sortable></el-table-column>
        <el-table-column prop="variedad" width="165" label="Bebida" sortable></el-table-column>
        <el-table-column prop="cantidad" label="Stock"></el-table-column>
        <el-table-column label="Acciones" align="center">
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