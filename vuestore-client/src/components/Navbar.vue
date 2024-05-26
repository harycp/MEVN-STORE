<template>
  <div>
    <nav class="navbar" :class="{ scrolling: isScrolling }">
      <div class="container-nav">
        <div class="logo">
          <div class="circle">
            <router-link :to="{ name: 'home' }">
              <img class="logo" src="../assets/img/logo.png" alt="" />
            </router-link>
          </div>
        </div>
        <button class="navbar-toggler" @click="toggleMenu">☰</button>
        <div :class="{ menu: true, 'menu-active': menuActive }">
          <router-link :to="{ name: 'product' }" id="products-link">
            <p>PRODUCT</p>
          </router-link>
          <div class="cart-wrapper">
            <font-awesome-icon
              class="cart-icon"
              icon="shopping-cart"
              @click="showCart"
            ></font-awesome-icon>
            <span>{{ totalCartQuantity }}</span>
          </div>
        </div>
      </div>
    </nav>
    <button @click="topFunction" id="myBtn">
      <span style="font-size: 20px">&#8682;</span>
    </button>
  </div>
</template>

<script>
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { EventBus } from "../even-bus";

export default {
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      cartItems: [],
      isScrolling: false,
      menuActive: false,
      userId: 1, // Sesuaikan ID user sesuai kebutuhan
    };
  },
  computed: {
    totalCartQuantity() {
      return this.cartItems.reduce(
        (total, item) => total + (item.quantity || 0),
        0
      );
    },
  },
  methods: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    scrollFunction() {
      const myBtn = document.getElementById("myBtn");
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        myBtn.style.display = "block";
      } else {
        myBtn.style.display = "none";
      }
    },
    topFunction() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    showCart() {
      this.$emit("toggle-cart");
    },
    async fetchCartItems() {
      try {
        const response = await axios.get(
          `https://mevn-store.vercel.app/api/orders/user/${this.userId}`
        );
        const order = response.data[0]; // Assuming one order per user
        if (order && order.cart_items) {
          this.cartItems = order.cart_items;
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    },
  },
  created() {
    this.fetchCartItems();

    EventBus.$on("quantity-updated", () => {
      this.fetchCartItems();
    });

    EventBus.$on("item-added-to-cart", ({ product, quantity }) => {
      const existingItem = this.cartItems.find(
        (item) => item.code === product.code
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.cartItems.push({ ...product, quantity });
      }
    });
  },
  mounted() {
    window.onscroll = () => {
      this.scrollFunction();
      if (window.scrollY > 36) {
        this.isScrolling = true;
      } else {
        this.isScrolling = false;
      }
    };
  },
  beforeDestroy() {
    EventBus.$off("quantity-updated");
    EventBus.$off("item-added-to-cart");
  },
};
</script>

<style scoped>
* {
  font-family: "Urbanist", sans-serif;
}

.navbar {
  backdrop-filter: blur(1.5px);
  transition: all 500ms ease;
  padding: 30px 20px;
  position: fixed;
  width: 100%;
  z-index: 100;
  top: 0;
  background-color: white;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.navbar.scrolling {
  backdrop-filter: blur(10px);
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  padding: 1rem 20px;
}

.container-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
}

.logo {
  width: 3rem;
}

.menu {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.menu a {
  text-decoration: none;
  color: black;
  font-size: 1rem;
  font-size: 1.2rem;
  font-weight: 500;
}

.menu a:hover {
  text-decoration: underline;
  color: black;
}
.cart-wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-icon {
  font-weight: 600;
  font-size: 1.2rem;
}

.cart-icon:hover {
  cursor: pointer;
}

#myBtn {
  display: none;
  position: fixed;
  bottom: 20px;
  right: 30px;
  z-index: 99;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: black;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 500ms ease;
}

#myBtn:hover {
  background-color: #555;
}

.navbar-toggler {
  display: none;
}

@media (max-width: 1400px) {
  .navbar.scrolling {
    backdrop-filter: blur(10px);
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    padding: 1rem 20px; /* Ubah padding di sini */
  }
}

@media (max-width: 600px) {
  .navbar-toggler {
    display: block;
    cursor: pointer;
    background: none;
    border: none;
    font-size: 2rem;
    transition: all 500ms ease;
  }
  .menu {
    transition: all 500ms ease;
    display: none;
    flex-direction: column;
    gap: 1rem;
    position: absolute;
    top: 100%; /* Positioned below the logo */
    left: 0;
    width: 100%;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    z-index: 99;
  }

  .menu-active {
    display: flex;
  }

  .navbar.scrolling {
    backdrop-filter: blur(10px);
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    padding: 1rem 20px; /* Ubah padding di sini */
  }
}
</style>
