<template>
  <div class="my-3">
  <ul class="nav">
        <li class="nav-item">
            <router-link class="nav-link" to="/page/">卡片1</router-link>
        </li>
        <li class="nav-item">
            <router-link class="nav-link" to="/page/child2">卡片2</router-link>
        </li>
         <li class="nav-item">
          <router-link class="nav-link" to="/page/child3">卡片3</router-link>
        </li>
        <li class="nav-item">
          <a href="#" class="nav-link" @click.prevent="updatePath">切換到指定頁面</a>
        </li>
                <li class="nav-item">
          <a href="#" class="nav-link" @click.prevent="beforePath">回到前頁</a>
        </li>  
      </ul>
</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }, 
  methods:{
    updatePath(){
      // this.$router.push('/page/child2');

      this.$router.replace('/page/child2'); 
      //$router.replace(-1)用法和$router.push()相同，但回上一頁或下一頁時replace的頁面不會出現
    },
    beforePath(){
      // this.$router.back();

      this.$router.go(-1) //$router.go(-1)用法和$router.back()相同
    }
  }
}
</script>
