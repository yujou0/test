<template>
  <div id="app">
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <div class=" navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item ">
          <router-link class="nav-link" :to="{name:'首頁'}">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/page">Page</router-link>
        </li>
      </ul>
</div>
</nav>
    <!-- <HelloWorld/> -->
    <router-view name="menu"></router-view>
    <div class="container">
    <router-view></router-view>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  created(){
    this.$http.get('https://randomuser.me/api/')
    .then((response) => {
      console.log(response.data)
    });
  }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
