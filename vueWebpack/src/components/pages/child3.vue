<template>
  <div class="">

  <div class="card-body">
    <h5 class="card-title">Card3</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  created(){
    // const id=this.$route.params.id
    // this.$http.get(`https://randomuser.me/api/?seed=${id}`).then((response) =>{
    //   console.log(response)
    // });


    const vm= this;
    this.$http.get(`https://randomuser.me/api/}`).then((response) =>{
      console.log(response);
      vm.user = response.data.results[0]
    });
    }
}
</script>
