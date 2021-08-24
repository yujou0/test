<template>
  <div id="app">
    <div class="container-fluid p-0">
      <h1 class="bg-secondary m-0 p-2 text-white">活動紀錄 Timeline</h1>
      <div
        id="btns"
        class="w-25 toolbar__btns--box d-flex justify-content-between"
      >
        <button
          type="button"
          class="btn shadow border-secondary btn-light rounded-circle "
          id="sortUp"
        >
          ▲
        </button>
        <button
          type="button"
          class="btn shadow border-secondary btn-light rounded-circle"
          id="sortDown"
        >
          ▼
        </button>
        <button
          type="button"
          class="btn shadow border-secondary btn-light rounded-circle"
          data-toggle="modal"
          data-target="#addModal"
          id="addBtn"
          click="addState()"
        >
          +
        </button>
      </div>
      <product
        class="container"
        :data="data"
        :inputName="inputName"
        :inputEmail="inputEmail"
        :inputTitle="inputTitle"
        :inputBref="inputBref"
        :inputDatetime="inputDatetime"
        :modeStateEdit="modeStateEdit"
        @add-to-data="addItem"
        @update-data="updateItem"
      ></product>
    </div>
    <div 
      class="mt-5 d-flex flex-column justify-content-center"
      style="width: 1000px; margin: auto;"
    >
      <div class="cards flex-column d-flex justify-content-between">
        <div v-for="item in data"
      :key="item.id" class="card">
          <div class="card_body" :id="item.id">
            <span class="card_ball-show">{{ item.id }}</span>
          </div>
        
        <div class="card-title py-2">
          <h5 class="mx-3 text-white">{{ item.title }}</h5>
        </div>
        <ul class="card-text pl-3 pr-3">
          <li class="font-weight-bold cardName">{{ item.name }}</li>
          <li class="cardEmail">{{ item.email }}</li>
          <hr class="mt-1 mb-0 card__hr" />
          <li class="cardContent">{{ item.bref }}</li>
          <li class="my-3 cardFooter">
            <span>
              <a v-on:click="updateItem(item.id)" href="#" class="edit-btn btn">Edit</a>
              <a v-on:click="deleteItem(item.id)" href="#" class="delete-btn btn">X</a>
            </span>
            <span class="cardDate">{{ item.datetime }}</span>
          </li>
        </ul>
        </div>
      </div>
      <div id="loadingBtnBox" class="d-flex  justify-content-center">
        <button type="button" id="loadingBtn" class="btn bottom__btn--loading">
          Load More
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import product from "./components/product.vue";
import $ from "jquery";

export default {
  name: "App",
  data() {
    return {
      data: [
        {
          id: "1",
          title: "maiores-iste-aut",
          datetime: "2021/03/30",
          name: "Alexandra Jast",
          email: "Delpha.Ratke@yahoo.com",
          bref: "Et sed enim qui in id cupiditate eveniet quo sint.",
        },
        {
          id: "2",
          title: "error-quod-ducimus",
          datetime: "2021/03/04",
          name: "Mrs. Jo Satterfield",
          email: "Noemi_Vandervort@yahoo.com",
          bref: "Odit ut quaerat voluptatem provident ullam hic.",
        },
        {
          id: "3",
          title: "nam-enim-quam",
          datetime: "2021/03/12",
          name: "Brett Nikolaus",
          email: "Earnest.Conroy94@gmail.com",
          bref: "Et id voluptatem iusto a laboriosam fuga.",
        },
        {
          id: "4",
          title: "ea-laboriosam-quas",
          datetime: "2021/03/03",
          name: "Josefina Simonis",
          email: "Abigail5@hotmail.com",
          bref: "Sint recusandae hic et tempore.",
        },
      ],
      inputName:'',
      inputEmail:null,
      inputTitle:null,
      inputBref:null,
      inputDatetime:null,
    };
  },
  methods: {
addState(){
  this.modeStateEdit=false
},
    addItem(item) {

      this.data.push(item);
    },
    deleteItem(id) {
      let data = this.data
      console.log(data)
      data.forEach(function (obj, i) {
      if (true && parseInt(obj.id) === parseInt(id)) {
        data.splice(i, 1);
      }
    });
    },
    updateItem(newItem) {
      $( "#addModal" ).modal( "show" );
      this.inputName=this.data[newItem-1].name,
      this.inputEmail=newItem.email,
      this.inputTitle=newItem.title,
      this.inputBref=newItem.bref,
      this.inputDatetime=newItem.datetime
    },
    updateCart(id) {
      this.cart.push(id);
    },
  },
  computed:{
    modeStateEdit(){
      return true
    }
  },
  components: {
    product,
  },
  created() {
    // this.test();
  },
};
</script>
<style lang="scss">
@import "./assets/all";
</style>
