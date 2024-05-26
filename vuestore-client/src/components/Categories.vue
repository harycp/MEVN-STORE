<template>
  <div>
    <h3>Categories</h3>
    <div class="category-buttons">
      <router-link
        v-for="category in categories"
        :key="category"
        :to="'/products/' + category.toLowerCase()"
        :class="{ active: selectedCategory === category }"
        class="category-button"
        @click.native="filterProducts(category)"
      >
        <p>{{ category }}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["categories", "selectedCategory"],
  methods: {
    filterProducts(category) {
      this.$emit("category-selected", category);
    },
  },
};
</script>

<style>
a {
  text-decoration: none;
  color: black;
}
h3 {
  text-align: center;
  font-size: 2.4rem;
  margin: 2rem auto;
  text-transform: uppercase;
}

.category-buttons {
  justify-content: center;
  display: flex;
  gap: 1rem;
  width: 100%;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 2.8rem;
}

.category-button {
  padding: 0.6rem 1.6rem;
  cursor: pointer;
  background-color: transparent;
  border: 2px solid rgba(0, 0, 0, 0.3);
  transition: all 0.2s;
}

.category-button p {
  font-size: 1.1rem;
}

.category-button.active,
.category-button:hover {
  background-color: black;
  color: white;
}
</style>
