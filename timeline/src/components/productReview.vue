<template>
<form class="review-form" @submit.prevent="onSubmit">
<p v-if="errors.length">
<b>Please correct the following error(s):</b>
<ul>
<li v-for="error in errors" :key="error">{{ error }} </li>
</ul>
</p>
<p>
<label for="name">Name:</label>
<input id="name" v-model="name">
</p>
<p>
<label for="review">Review:</label>
<textarea id="review" v-model="review" ></textarea>
</p>
<p>
<label for="rating">Rating:</label>
<select id="rating" v-model="rating">
<option>5</option>
<option>4</option>
<option>3</option>
<option>2</option>
<option>1</option>
</select>
</p>
<p>
<input type="submit" value="Submit"></p>
</form>
</template>

<script>
export default {
  name: 'product-review',
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: [],
    };
  },
  methods: {
    onSubmit() {
      this.errors= []
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        };
        this.$emit("review-submitted", productReview);
        (this.name = null), (this.review = null), (this.rating = null);
      } else {
        if (!this.name) this.errors.push("Name required");
        if (!this.review) this.errors.push("review required");
        if (!this.rating) this.errors.push("rating required");
      }
    },
  },
}
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
