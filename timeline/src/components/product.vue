<template>
  <div class="product">
    <div class="modal fade" id="addModal" data-backdrop="static">
      <div class="modal-dialog modal-dialog-centered modal-sm">
        <div class="modal-content">
          <div class="modal-header modal__header">
            <h5 class="modal-title" id="addModalLabel">新增</h5>
            <button
              type="button"
              class="close closeModalX"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true" class="text-white">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              ref="form"
              id="addForm"
              name="addForm"
              action="/something"
              method="post"
            >
              <label for="addDate"></label>
              <p id="addDate">2021-03-03</p>
              <!-- </form> -->
              <label for="activityTitle">活動標題</label>：<br /><input
                v-model="activityTitle"
                type="text"
                id="activityTitle"
                class="card__inputform"
              />
              <div class="errorActivityTitle text-danger">{{errorActivityTitle}}</div>
              <br />
              <label for="name">主辦人</label>：<br /><input
                v-model="name"
              v-if="!stateEdit"
                type="text"
                id="name"
                class="card__inputform"
              />
              <input
              v-if="stateEdit"
                v-model="updateName"
                type="text"
                id="name"
                class="card__inputform"
              />
              <div class="errorName text-danger">{{errorName}}</div>
              <br />
              <label for="email">電子郵件</label>：<br /><input
                v-model="email"
                type="text"
                id="email"
                class="card__inputform"
              />
              <div class="errorEmail text-danger">{{errorEmail}}</div>
              <br />
              <label for="activityContent">活動紀錄</label>：<br /><textarea
                v-model="activityContent"
                type="text"
                id="activityContent"
                class="card__inputform"
              ></textarea>
              <div class="errorActivity text-danger"></div>
              <br />
              <input id="rowID" type="hidden" value="" />
            </form>
          </div>
          <div class="modal-footer">
            <!-- data-dimiss="modal" 關閉 modal -->
            <button
              type="button"
              class="btn border-secondary"
              data-dismiss="modal"
              id="closeModal"
            >
              Close
            </button>
            <button
              id="addSubmit"
              type="button"
              class="btn btn-dark border-secondary"
              v-on:click="addToData"
            >
              Save
            </button>
            <button
              id="saveButton"
              type="button"
              class="btn btn-dark border-secondary"
              v-on:click="updateNewItem"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- <product-review @review-submitted="addReview"></product-review> -->
  </div>
</template>

<script>
// import productReview from './productReview.vue'
import $ from "jquery";

export default {
  name: "product",
  components: {
    // productReview
  },
  props: {
    data: Array, //定義傳值的型別
    inputName: String, //定義傳值的型別
    inputEmail: String, //定義傳值的型別
    inputTitle: String, //定義傳值的型別
    inputBref: String, //定義傳值的型別
    inputDatetime: String, //定義傳值的型別
    modeStateEdit:Boolean
  },
  data() {
    return {
      activityTitle: null,
      name: null,
      email: null,
      activityContent: null,
      errorActivityTitle: null,
      errorName: null,
      errorEmail: null,
      stateEdit:this.modeStateEdit
    };
  },
  methods: {
    // add-to-data
    addToData() {
      //       this.stateEdit = false
      // console.log(this.stateEdit)

  let emailRule =
    /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      let emailResult = emailRule.test(this.email);
      let dayjs = require("dayjs");
      // 宣告day是當下時間再加一天
      let currentDate = dayjs().format("YYYY/MM/DD");

      // 驗證
      if (!this.activityTitle) this.errorActivityTitle="必填";
      else this.errorActivityTitle="";
      if (!this.name) this.errorName="必填";
      else this.errorName="";
      if (!emailResult) this.errorEmail="必填/email格式驗證";
      else this.errorEmail="";

      let newItem = {
        id: this.data.length + 1,
        title: this.activityTitle,
        name: this.name,
        email: this.email,
        bref: this.activityContent,
        datetime: currentDate,
      };
                // 如果驗證都通過，提交表單
          if ( this.activityTitle && this.name  && emailResult ) {
      this.$emit("add-to-data", newItem);
      this.name="",
      this.activityTitle="",
      this.email="",
      this.activityContent=""
                $( "#addModal" ).modal( "hide" );
          }
    },
    // @update-data="updateItem"
    updateNewItem() {
  let emailRule =
    /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      let emailResult = emailRule.test(this.email);
      let dayjs = require("dayjs");
      // 宣告day是當下時間再加一天
      let currentDate = dayjs().format("YYYY/MM/DD");

      // 驗證
      if (!this.activityTitle) this.errorActivityTitle="必填";
      else this.errorActivityTitle="";
      if (!this.name) this.errorName="必填";
      else this.errorName="";
      if (!emailResult) this.errorEmail="必填/email格式驗證";
      else this.errorEmail="";

      let feedBackItem = {
        id: this.data.length + 1,
        title: this.activityTitle,
        name: this.name,
        email: this.email,
        bref: this.activityContent,
        datetime: currentDate,
      };
                // 如果驗證都通過，提交表單
          if ( this.activityTitle && this.name  && emailResult ) {
      this.$emit("update-data", feedBackItem);
                $( "#addModal" ).modal( "hide" );
          }
    },
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVarient].variantId);
    },
    updateProduct(index) {
      this.selectedVarient = index;
      console.log(index);
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    },
  },
  computed: {
    updateName:{
// return this.inputName
get: function () {
              return  this.inputName
        },
        set: function () {
 this.inputName = '123'
        }
    },
    image() {
      return this.variants[this.selectedVarient].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVarient].variantQuantity;
    },
    shipping() {
      if (this.premium) {
        return "Free";
      }
      return "2.99";
    },
  },
  created(){
    // console.log(this.modeStateEdit)
    // console.log('product'+ this.inputName)
    // this.name = this.inputName
    // console.log('name'+this.name)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
