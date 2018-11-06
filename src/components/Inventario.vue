<template>
  <div v-if="catalogo.length" class="tableInventory">
    <div v-if="noInv">
      <!-- CAMBIAR A CAMPOS DE MODELOS P Y Q -->
      <!-- comparten L, D, d -->
      <el-table :data="catalogo" height="600" :row-class-name="tableRow" @row-click="emit">
        <el-table-column prop="tipo" label="Tipo" sortable></el-table-column>
        <el-table-column prop="variedad" label="Marca" sortable></el-table-column>
        <el-table-column label="Stock" align="center">
          <el-table-column prop="cantidad" width="80" label="Deseado" align="center"></el-table-column>
          <el-table-column prop="existencia" width="80" label="Real" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="Acciones">
          <template slot-scope="scope">
            <el-button type=info @click="">Modelo P</el-button>
            <el-button type=info @click="">Modelo Q</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div v-else>
      <el-table :data="catalogo" height="600" :row-class-name="tableRow" @row-click="emit">
        <el-table-column prop="tipo" label="Tipo" sortable></el-table-column>
        <el-table-column prop="variedad" label="Marca" sortable></el-table-column>
        <el-table-column label="Stock" align="center">
          <el-table-column prop="cantidad" width="80" label="Deseado" align="center"></el-table-column>
          <el-table-column prop="existencia" width="80" label="Real" align="center"></el-table-column>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import inventarioService from '@/services/inventarioService'
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
      emit(event) {
        this.$emit("selected", event);
      },
      tableRow({
        row
      }) {
        if (row.existencia < 5) {
          return 'critical';
        } else if (row.existencia < 10) {
          return 'several';
        } else if (row.existencia < 15) {
          return 'minimal';
        }
        return '';
      }
    }
  }
</script>

<style>
  .el-table .critical {
    background-color: #ff000085;
  }

  .el-table .several {
    background-color: #ff9d00a3;
  }

  .el-table .minimal {
    background-color: #fff70063;
  }

  .tableInventory {
    width: 80%;
    box-sizing: border-box;
    margin: 20px 0 0 10%;
  }
</style>