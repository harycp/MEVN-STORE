<template>
  <div>
    <!-- Cart Modal -->
    <div class="cart-modal" v-if="cartVisible">
      <div class="cart-modal-content">
        <span class="close" @click="closeCart">&times;</span>
        <h3 class="title">Your Shopping Cart</h3>
        <div class="empty-cart" v-if="cartItems.length === 0">
          <img
            src="../assets/img/empty-cart.png"
            alt="Empty Cart"
            class="empty-cart-image"
          />
          <p>Your cart is empty</p>
          <button @click="closeCart">Keep Browsing</button>
        </div>
        <div v-else>
          <div class="cart-items-container">
            <div
              class="cart-items-wrap"
              v-for="item in cartItems"
              :key="item.code"
            >
              <div class="wrapper">
                <div class="delete-item">
                  <span class="delete" @click="removeFromCart(item.code)"
                    >&times;</span
                  >
                </div>
                <div class="cart-items">
                  <div class="item-left">
                    <img
                      :src="`https://mevn-store.vercel.app${item.imageUrl}.png`"
                      alt="item.name"
                    />
                  </div>
                  <div class="item-mid">
                    <p class="item-name">{{ item.name }}</p>
                    <div class="item-btns">
                      <button @click="updateQuantity(item, item.quantity - 1)">
                        -
                      </button>
                      <p>{{ item.quantity }}</p>
                      <button @click="updateQuantity(item, item.quantity + 1)">
                        +
                      </button>
                    </div>
                  </div>
                  <div class="item-right">
                    <p class="price">Rp{{ item.price }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="total-div">
            <div class="sub-right">
              <p>Total Rp{{ totalPrice }}</p>
            </div>
            <div class="sub-left">
              <p>{{ totalCartQuantity }}</p>
            </div>
          </div>
          <button class="checkout" @click="checkout">Checkout</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { EventBus } from "../even-bus.js";

export default {
  data() {
    return {
      cartItems: [],
      cartVisible: true,
      userId: 1, // Sesuaikan ID user sesuai kebutuhan
    };
  },
  computed: {
    totalPrice() {
      return this.cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2);
    },
    totalCartQuantity() {
      return this.cartItems.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );
    },
  },
  methods: {
    closeCart() {
      this.$emit("close-cart");
    },
    checkout() {
      // Placeholder for checkout logic
      this.$emit("close-cart");
    },
    async updateQuantity(item, newQuantity) {
      if (newQuantity < 1) return;
      const response = await axios.put(
        `https://mevn-store.vercel.app/api/orders/user/${this.userId}/update`,
        {
          product: { code: item.code },
          quantity: newQuantity,
        }
      );
      if (response.status === 200) {
        item.quantity = newQuantity;
        EventBus.$emit("quantity-updated"); // Emit event saat quantity diupdate
      }
    },
    async removeFromCart(productCode) {
      const response = await axios.delete(
        `https://mevn-store.vercel.app/api/orders/user/${this.userId}/product/${productCode}`
      );
      if (response.status === 200) {
        this.cartItems = this.cartItems.filter(
          (item) => item.code !== productCode
        );
        EventBus.$emit("quantity-updated"); // Emit event saat produk dihapus
      }
    },
  },
  async created() {
    const result = await axios.get(
      `https://mevn-store.vercel.app/api/orders/user/${this.userId}`
    );
    let data = result.data.map((order) => ({
      ...order,
      products: order.products.map((product) => ({
        ...product,
        ...order.cart_items.find((item) => item.code === product.code),
      })),
    }));
    this.cartItems = data[0].products; // Adjust as needed
  },
};
</script>

<style scoped>
* {
  font-family: "Urbanist", sans-serif;
}

/* New CSS for Cart Modal */
.cart-modal {
  display: block;
  position: fixed;
  z-index: 1050;
  padding-top: 60px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.cart-modal-content {
  background-color: #fefefe;
  margin: 5% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 500px;
  position: relative;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 16rem;
  margin: 3rem auto;
}

.empty-cart-image {
  width: 100%;
  margin: 10px 0;
  opacity: 0.5;
}

.empty-cart p {
  font-size: 1.8rem;
  font-weight: 600;
}

.empty-cart button {
  font-size: 1.4rem;
  margin-top: 1rem;
  height: 3rem;
  width: 100%;
  background: transparent;
  color: black;
  border: 2px solid black;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s;
}
.empty-cart button:hover {
  background: black;
  color: white;
}

.title {
  margin-bottom: 1.4rem;
  font-size: 1.4rem;
}

.cart-items-container {
  max-height: 21rem; /* Set max-height to allow scrolling */
  overflow-y: auto;
}

.delete {
  color: #aaa;
  float: left;
  font-size: 1.4rem;
  font-weight: bold;
}

.delete:hover,
.delete:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.cart-items-wrap {
  width: 100%;
  display: grid;
}

.cart-items {
  width: 100%;
  height: 8rem;
  display: grid;
  grid-template-columns: 30fr 40fr 30fr;
  border: 1px solid #717171;
  border-radius: 3px;
  background-color: #f2f2f2;
  margin-bottom: 1rem;
}

.item-left {
  width: 100%;
  height: 88%;
  background-color: white;
}

.item-left img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-mid {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
}

.item-btns {
  display: flex;
}
.item-btns button {
  font-size: 1rem;
  width: 2rem;
  height: 2rem;
  background-color: #354f55;
  color: white;
  cursor: pointer;
}
.item-btns p {
  font-size: 1rem;
  outline: 2px solid #354f55;
  outline-offset: -2px;
  width: 2rem;
  text-align: center;
  padding-top: 6px;
}

.item-name {
  font-size: 1.4rem;
}

.item-right {
  width: 100%;
  display: flex;
  margin: auto 0;
  text-align: center;
}

.item-right p {
  font-size: 1.4rem;
  font-weight: 600;
  text-align: center;
}

.total-div {
  display: flex;
  width: 100%;
  height: 4rem;
  border-top: 2px dashed black;
  margin-top: 1.5rem;
  padding: 1rem 0;
  justify-content: space-between;
}

.sub-left {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
}

.sub-right {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.4rem;
  font-weight: 600;
}

.checkout {
  font-size: 1.4rem;
  height: 3rem;
  width: 100%;
  background: transparent;
  color: black;
  border: 2px solid black;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.2s;
}

.checkout:hover {
  background: black;
  color: white;
}
</style>
