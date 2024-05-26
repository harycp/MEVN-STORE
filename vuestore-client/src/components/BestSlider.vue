<template>
  <div class="bestProduct">
    <div class="container">
      <div class="row-container">
        <div class="row-item" @click="navigateToProduct">
          <div class="item-header">
            <img
              :src="`https://mevn-store.vercel.app${product.imageUrl}.png`"
              :alt="product.name"
            />
          </div>
          <div class="item-description">
            <p>{{ product.name }}</p>
            <p class="item-price">Rp{{ formattedPrice }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product"],
  computed: {
    formattedPrice() {
      return Number(this.product.price).toFixed(2);
    },
  },
  methods: {
    navigateToProduct() {
      window.location.href = `/product-details/${this.product.code}`;
    },
  },
};
</script>

<style scoped>
.row-item {
  outline: 2px solid rgba(0, 0, 0, 0.205);
  cursor: pointer;
  transition: all 0.15s ease-in;
}

.row-item:hover {
  outline: 2px solid rgba(0, 0, 0, 0.6);
}

.item-header img {
  width: 18rem;
}

.item-description {
  font-size: 1.6rem;
  padding: 1rem;
}
.item-description .item-price {
  font-weight: 600;
  font-size: 1.4rem;
  margin-top: 1.2rem;
}

.row-container {
  display: flex;
  gap: 2.2rem;
  overflow-x: scroll;
  white-space: nowrap;
  scroll-behavior: smooth;
  position: relative;
  padding: 1rem 0.6rem;
}

.row-container::-webkit-scrollbar {
  display: none;

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
