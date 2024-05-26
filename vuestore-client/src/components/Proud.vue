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
      return Number(this.proud.price).toFixed(2);
    },
  },
};
</script>

<style></style>
