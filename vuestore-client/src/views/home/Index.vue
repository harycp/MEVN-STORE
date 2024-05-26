<template>
  <div>
    <!-- Image Slider -->
    <div class="slideshow-container">
      <router-link
        v-for="(slide, index) in slides"
        :key="index"
        :to="`/products/${slide.category.toLowerCase()}`"
        class="mySlides fade"
        @click="stopAutoShowSlides"
      >
        <div class="overlay"></div>
        <img class="image" :src="slide.imageUrl" />
        <div class="text">
          <p>{{ slide.caption }}</p>
        </div>
      </router-link>

      <!-- Next and previous buttons -->
      <a class="prev" @click="plusSlides(-1)">&#10094;</a>
      <a class="next" @click="plusSlides(1)">&#10095;</a>
    </div>
    <div class="container">
      <h3>Products we recommend</h3>
      <div class="product-container">
        <ProductItem
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </div>
    <div class="container">
      <Banner />
    </div>
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
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { background } from "../../data-seed";
import ProductItem from "../../components/ProductItem.vue";
import BestSlider from "../../components/BestSlider.vue";
import NewsLetter from "../../components/Newsletter.vue";
import Banner from "../../components/Banner.vue";
import Footer from "../../components/Footer.vue";

export default {
  components: {
    ProductItem,
    BestSlider,
    FontAwesomeIcon,
    NewsLetter,
    Banner,
    Footer,
  },
  data() {
    return {
      products: [],
      bestProducts: [],
      slides: background,
      slideIndex: 0,
      autoSlideInterval: null,
      autoSlideEnabled: true,
    };
  },
  methods: {
    plusSlides(n) {
      this.showSlides((this.slideIndex += n));
    },
    showSlides(n) {
      let i;
      const slides = document.getElementsByClassName("mySlides");
      if (n >= slides.length) {
        this.slideIndex = 0;
      }
      if (n < 0) {
        this.slideIndex = slides.length - 1;
      }
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      slides[this.slideIndex].style.display = "block";
    },
    autoShowSlides() {
      if (this.autoSlideEnabled) {
        let i;
        const slides = document.getElementsByClassName("mySlides");
        for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
        }
        this.slideIndex++;
        if (this.slideIndex > slides.length) {
          this.slideIndex = 1;
        }
        slides[this.slideIndex - 1].style.display = "block";
        this.autoSlideInterval = setTimeout(() => this.autoShowSlides(), 6000);
      }
    },
    stopAutoShowSlides() {
      clearTimeout(this.autoSlideInterval);
      this.autoSlideEnabled = false;
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
  mounted() {
    this.showSlides(this.slideIndex);
    this.autoShowSlides();
  },
  destroyed() {
    clearTimeout(this.autoSlideInterval);
  },
  async created() {
    const result = await axios.get(
      "https://mevn-store.vercel.app/api/products/all/proud"
    );
    this.products = result.data;
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

a {
  text-decoration: none;
  color: black;
}

.slideshow-container {
  width: 100%;
  position: relative;
  margin: auto;
  margin-bottom: 2rem;
  margin-top: 5rem;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6); /* Ubah opacity sesuai keinginan */
}
.overlay:hover {
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.4s;
}

.mySlides {
  display: none;
}

.image {
  width: 100%;
  height: 80vh;
  object-fit: cover;
}

.prev,
.next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  transition: 0.6s ease;
  border-radius: 0 3px 3px 0;
  user-select: none;
}
.prev {
  margin-left: 16px;
}

.next {
  right: 0;
  border-radius: 3px 0 0 3px;
  margin-right: 16px;
}

.prev:hover,
.next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.text {
  position: absolute;
  bottom: 2rem;
  width: 100%;
  text-align: center;
}

.text p {
  color: white;
  font-size: 2.8rem;
  font-weight: 600;
  padding: 0px 16px;
}

.fade {
  animation-name: fade;
  animation-duration: 1.5s;
}

@keyframes fade {
  from {
    opacity: 0.4;
  }
  to {
    opacity: 1;
  }
}

.container {
  width: 100%;
  max-width: 1400px;
  padding: 0 16px;
  margin: 6rem auto;
}
h3 {
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  text-align: left;
}
.product-container {
  display: grid;
  grid-gap: 2rem;
  gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
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

/* Styles for responsive design */
@media (max-width: 960px) {
  .slideshow-container {
    margin-bottom: 1.5rem;
  }
  .prev,
  .next {
    font-size: 14px;
    padding: 12px;
  }
  .text p {
    font-size: 2rem;
  }
  .product-container {
    grid-template-columns: 1fr 1fr 1fr;
  }
  h3 {
    font-size: 1.6rem;
  }
}

@media (max-width: 740px) {
  .prev,
  .next {
    font-size: 12px;
    padding: 10px;
  }

  .text p {
    font-size: 1.8rem;
  }
  .product-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .prev,
  .next {
    font-size: 10px;
    padding: 8px;
  }
  .image {
    width: 100%;
    height: 70vh;
    object-fit: cover;
  }

  .product-container {
    grid-template-columns: 1fr;
  }
  h3 {
    text-align: center;
    font-size: 1.4rem;
  }
}
</style>
