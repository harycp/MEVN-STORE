<template>
  <router-link
    :to="{ name: 'product-details', params: { id: product.code } }"
    class="product"
  >
    <img
      :src="`http://localhost:8000${product.imageUrl}.png`"
      :alt="product.name"
      class="product-image"
    />
    <div class="product-details">
      <p>{{ product.name }}</p>
      <p class="item-price">Rp{{ formattedPrice }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ["product"],
  computed: {
    formattedPrice() {
      return Number(this.product.price).toFixed(2);
    },
  },
};
</script>

<style scoped>
.product {
  width: 100%;
  cursor: pointer;
  outline: 2px solid rgba(0, 0, 0, 0.205);
  transition: all 0.15s ease-in;
}

.product:hover {
  outline: 2px solid rgba(0, 0, 0, 0.7);
}

.product-image {
  width: 100%;
}

.product-details {
  font-size: 1.6rem;
  padding: 1rem;
}

.item-price {
  font-weight: 600;
  font-size: 1.4rem;
  margin-top: 1.2rem;
}
</style>
