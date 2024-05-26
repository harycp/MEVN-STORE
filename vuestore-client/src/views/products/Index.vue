<template>
  <div>
    <section class="container">
      <Categories
        :categories="categories"
        :selectedCategory="selectedCategory"
        @category-selected="setCategory"
      />
      <div class="product-container">
        <ProductItem
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
    </section>
    <NewsLetter />
    <Footer />
  </div>
</template>

<script>
import axios from "axios";
import Categories from "../../components/Categories.vue";
import ProductItem from "../../components/ProductItem.vue";
import NewsLetter from "../../components/Newsletter.vue";
import Footer from "../../components/Footer.vue";
export default {
  components: {
    Categories,
    ProductItem,
    NewsLetter,
    Footer,
  },
  data() {
    return {
      products: [],
      categories: [
        "All",
        "Accessories",
        "Electronics",
        "Beverages",
        "Skincare",
        "Footwear",
        "Furniture",
      ],
      selectedCategory: "All",
    };
  },
  computed: {
    filteredProducts() {
      if (this.selectedCategory === "All") {
        return this.products;
      } else {
        return this.products.filter(
          (product) => product.category === this.selectedCategory
        );
      }
    },
  },
  methods: {
    setCategory(category) {
      this.selectedCategory = category;
    },
  },
  async created() {
    const result = await axios.get(
      "https://mevn-store.vercel.app/api/products"
    );
    this.products = result.data;

    const category = this.$route.params.category || "All";
    this.selectedCategory =
      category.charAt(0).toUpperCase() + category.slice(1);
  },
  watch: {
    "$route.params.category"(newCategory) {
      if (newCategory) {
        this.selectedCategory =
          newCategory.charAt(0).toUpperCase() + newCategory.slice(1);
      } else {
        this.selectedCategory = "All";
      }
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  scroll-behavior: smooth;
  font-family: "Urbanist", sans-serif;
}

a {
  text-decoration: none;
  color: black;
}

.container {
  width: 100%;
  max-width: 1400px;
  padding: 0 16px;
  margin: 0 auto;
  margin-top: 8rem;
  margin-bottom: 6rem;
}

.product-container {
  display: grid;
  grid-gap: 2rem;
  gap: 2rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

/* Media Queries for Responsiveness */
@media (max-width: 960px) {
  .product-container {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

@media (max-width: 740px) {
  .product-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  .product-container {
    grid-template-columns: 1fr;
  }
}
</style>
