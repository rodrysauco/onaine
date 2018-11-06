<template>
  <div id="app">
    <el-container>
      <el-header class="appHeader">
        <p class="appTitle">Stock</p>
      </el-header>
      <el-row>
        <el-menu :default-active="index" class="el-menu-demo" mode='horizontal' background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router='true'>
          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/inventario">Inventario</el-menu-item>
        </el-menu>
      </el-row>
      <transition name='component-fade' mode="out-in">
        <router-view />
      </transition>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    index: function () {
      let route = this.$route.path.split("/");
      return "/"+route[1];
    }
  }
  ,
  components: {
  },
}
</script>

<style>
#app {
  background: #ffffff;
  background: -moz-linear-gradient(
    -45deg,
    #ffffff 0%,
    #f3f3f3 50%,
    #ededed 51%,
    #ffffff 100%
  );
  background: -webkit-linear-gradient(
    -45deg,
    #ffffff 0%,
    #f3f3f3 50%,
    #ededed 51%,
    #ffffff 100%
  );
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #f3f3f3 50%,
    #ededed 51%,
    #ffffff 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#ffffff', endColorstr='#ffffff', GradientType=1);
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.appHeader {
  background-color: #eaeaead1;
  vertical-align: center;
}

.appTitle {
  margin: 0;
  font-size: 20px;
  box-sizing: border-box;
  padding: 18px;
}
.component-fade-enter-active, .component-fade-leave-active {
  transition: opacity .2s ease;
}
.component-fade-enter, .component-fade-leave-to{
  opacity: 0;
}
</style>