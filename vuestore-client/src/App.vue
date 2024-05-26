<template>
  <div id="app">
    <Navbar @toggle-cart="toggleCart" :cartQty="cartItems.length" />
    <router-view />
    <Cart
      v-if="isCartVisible"
      :cart-items="cartItems"
      @close-cart="toggleCart"
    />
  </div>
</template>

<script>
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import { cartItems } from "./data-seed";

export default {
  components: {
    Navbar,
    Cart,
  },
  data() {
    return {
      isCartVisible: false,
      cartItems: cartItems,
    };
  },
  methods: {
    toggleCart() {
      this.isCartVisible = !this.isCartVisible;
    },
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  scroll-behavior: smooth;
  font-family: "Urbanist", sans-serif;
}
</style>
