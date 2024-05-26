<template>
  <div>
    <section style="margin-top: 12rem" class="container">
      <div class="product-div" v-if="product">
        <div class="product-left">
          <div
            class="big-img"
            @mousemove="handleMouseMove"
            @mouseleave="resetImage"
          >
            <img
              :src="`https://mevn-store.vercel.app${product.imageUrl}.png`"
              :alt="product.name"
              ref="zoomImage"
              :class="{ zoomed: isZoomed }"
            />
          </div>
        </div>
        <div class="product-right">
          <h3>{{ product.name }}</h3>
          <p class="product-desc">{{ product.description }}</p>
          <div class="product-quant">
            <p>Quantity</p>
            <div class="product-btns">
              <button @click="decreaseQuantity">-</button>
              <p>{{ quantity }}</p>
              <button @click="increaseQuantity">+</button>
            </div>
          </div>
          <div class="product-price">
            <p>Rp{{ totalPrice }}</p>
          </div>
          <div class="atc-buy">
            <button class="add-to-cart" @click="addToCart(product)">
              Add To Cart
            </button>
            <button class="buy" @click="buyNow">Buy Now</button>
          </div>
        </div>
      </div>
      <Notfound v-else />
    </section>
    <div class="container">
      <div class="title-btns">
        <h3>Best Products</h3>
        <div class="btns">
          <button @click="scrollBestSlider(-1)">
            <font-awesome-icon icon="arrow-left"></font-awesome-icon>
          </button>
          <button @click="scrollBestSlider(1)">
            <font-awesome-icon icon="arrow-right"></font-awesome-icon>
          </button>
        </div>
      </div>
      <div ref="bestSliderContainer" class="best-slider-container">
        <BestSlider
          v-for="product in bestProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <NewsLetter />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Notfound from "../error/404.vue";
import { EventBus } from "../../even-bus.js"; // Import event bus
import BestSlider from "../../components/BestSlider.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import NewsLetter from "../../components/Newsletter.vue";
import Footer from "../../components/Footer.vue";

export default {
  components: {
    Notfound,
    BestSlider,
    FontAwesomeIcon,
    NewsLetter,
    Footer,
  },
  data() {
    return {
      product: {},
      bestProducts: [],
      quantity: 1,
      isZoomed: false,
    };
  },
  computed: {
    totalPrice() {
      return (this.quantity * this.product.price).toFixed(2);
    },
  },
  methods: {
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
    async addToCart(product) {
      await axios.post(
        "https://mevn-store.vercel.app/api/orders/update/user/1",
        {
          product: product,
          quantity: this.quantity,
        }
      );
      EventBus.$emit("item-added-to-cart", {
        product,
        quantity: this.quantity,
      }); // Emit event
    },
    buyNow() {
      this.$store.commit("addToCart", {
        product: this.product,
        quantity: this.quantity,
      });
      this.$router.push({ name: "cart" });
    },
    handleMouseMove(event) {
      this.isZoomed = true;
      const img = this.$refs.zoomImage;
      const rect = img.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const xPercent = (x / rect.width) * 100;
      const yPercent = (y / rect.height) * 100;

      img.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    },
    resetImage() {
      this.isZoomed = false;
      const img = this.$refs.zoomImage;
      img.style.transformOrigin = "center center";
    },
    scrollBestSlider(direction) {
      const container = this.$refs.bestSliderContainer;
      const scrollAmount = 300; // Adjust the scroll amount as needed
      container.scrollBy({
        left: direction * scrollAmount,
        behavior: "smooth",
      });
    },
  },
  async created() {
    const code = this.$route.params.id;
    const result = await axios.get(
      `https://mevn-store.vercel.app/api/products/${code}`
    );

    this.product = result.data;

    const result_rating = await axios.get(
      "https://mevn-store.vercel.app/api/products/all/best"
    );
    this.bestProducts = result_rating.data;
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
  scroll-behavior: smooth;
  font-family: "Urbanist", sans-serif;
}

.container {
  width: 100%;
  max-width: 1400px;
  padding: 0 16px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 6rem;
}

.product-div {
  display: flex;
  position: relative;
  margin-bottom: 0rem;
  width: 100%;
}

.product-left {
  width: 50%;
  height: 100%;
}

.big-img {
  width: 100%;
  height: 70%;
  display: flex;
  justify-content: center;
  margin-left: 1rem;
  overflow: hidden;
}

.big-img img {
  width: 75%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.2s ease, transform-origin 0.2s ease;
  cursor: zoom-in;
}

.big-img img.zoomed {
  transform: scale(2);
  cursor: zoom-out;
}

.product-right {
  margin-left: 1rem;
  width: 50%;
  height: 100%;
  background-color: #e5e5e5;
  padding: 2rem;
}

.product-right h3 {
  text-align: left;
  font-size: 2.8rem;
  margin-bottom: 0px;
}

.product-desc {
  font-size: 1.4rem;
  margin-top: 0.8rem;
  margin-bottom: 0.8rem;
  line-height: 1.5;
}

.product-quant {
  display: flex;
  justify-content: space-between;
  font-size: 1.8rem;
  margin-bottom: 1.8rem;
  margin-top: 1.8rem;
  font-weight: 600;
  align-items: center;
}

.product-price {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 3rem;
}

.product-btns {
  display: flex;
  border: 1px solid black;
}
.product-btns p {
  text-align: center;
  font-size: 1.8rem;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
}

.product-btns button {
  font-size: 1.8rem;
  width: 2.5rem;
  height: 2.5rem;
  color: black;
  cursor: pointer;
  background-color: white;
  border: none;
  transition: all 0.2s;
}

.product-btns button:hover {
  background: #f0f0f0;
}

.product-btns p {
  margin: 0;
  width: 40px;
  text-align: center;
  line-height: 40px;
  border-left: 1px solid black;
  border-right: 1px solid black;
}

.atc-buy {
  display: flex;
  gap: 2rem;
}

.atc-buy button {
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  height: 4rem;
  text-transform: uppercase;
  transition: all 0.2s;
  width: 50%;
}

.atc-buy .add-to-cart {
  background: transparent;
  border: 2px solid black;
}

.add-to-cart:hover {
  background: black;
  color: white;
}

.atc-buy .buy {
  background: #354f55;
  color: white;
  border: 2px solid #354f55;
}

.buy:hover {
  background: transparent;
  color: #354f55;
}

.title-btns {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btns button {
  color: white;
  background-color: #354f55;
  font-size: 1.2rem;
  border: none;
  height: 2.4rem;
  width: 2.4rem;
  cursor: pointer;
  transition: all 0.1s ease-in;
}

.btns {
  display: flex;
  gap: 0.4rem;
}

.btns button:hover {
  background-color: black;
}

.best-slider-container {
  display: flex;
  gap: 2.2rem;
  overflow-x: auto;
  white-space: nowrap;
  scroll-behavior: smooth;
  margin-bottom: 0;
}

.best-slider-container::-webkit-scrollbar {
  display: none;
}

@media (min-width: 900px) {
  .product-right h3 {
    font-size: 2rem;
  }
  h3 {
    font-size: 1.6rem;
  }
}

@media (max-width: 850px) {
  .product-div {
    flex-direction: column;
    align-items: center;
    gap: 3rem;
    margin-bottom: 6rem;
  }
  .product-right {
    width: 100%;
    padding: 3rem 2rem 4rem 2rem;
    margin-left: 0;
  }
  .product-left {
    width: 100%;
  }
  h3 {
    font-size: 1.6rem;
  }
}

@media (max-width: 480px) {
  .product-quant {
    flex-direction: column;
    gap: 2rem;
  }

  .product-price {
    font-size: 1.8rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
    display: flex;
    justify-content: center;
  }

  .atc-buy {
    gap: 2rem;
    width: 100%;
    flex-direction: column;
  }
  .atc-buy button {
    width: 100%;
  }
  .product-right h3 {
    font-size: 1.8rem;
  }
  h3 {
    font-size: 1.4rem;
  }
}
</style>
