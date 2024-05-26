<template>
  <div class="banner-container">
    <div class="text-side">
      <div class="text">
        <h2>Meets Comfort in Modern Furniture Marvels.</h2>
        <p>
          Experience the fusion of innovation and comfort in our modern
          furniture collection—tomorrow's design, today.
        </p>
        <router-link :to="{ name: 'product' }" id="products-link">
          <button>Explore Now</button>
        </router-link>
      </div>
    </div>
    <div class="img-side">
      <img src="../assets/img/banner.png" alt="banner" />
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.banner-container {
  display: flex;
  justify-content: space-between;
  height: 35rem;
  overflow: hidden;
}

.banner {
  padding-bottom: 10rem;
}

.text-side {
  width: 50%;
  text-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 4rem;

  background-color: #e9e9e9;
}

.text-side h2 {
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.text-side p {
  font-size: 1.6rem;
}

.img-side {
  width: 50%;
  text-align: end;
  background-color: #e9e9e9;
  background-color: rgba(0, 0, 0, 0.6);
}

.img-side img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.text button {
  background-color: #354f55;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  padding: 1rem;
  text-transform: uppercase;
  margin-top: 2rem;
  cursor: pointer;
  border: 2px solid #354f55;
  transition: all 0.15s;
}

.text button:hover {
  background-color: transparent;
  color: black;
}

@media (max-width: 750px) {
  .text-side {
    padding: 0 4rem;
  }
  .text-side h2 {
    font-size: 2.4rem;
  }

  .text-side p {
    font-size: 1.4rem;
  }

  .text button {
    font-size: 1.4rem;
  }
}

@media (max-width: 600px) {
  .text-side {
    width: 100%;
  }

  .img-side {
    display: none;
  }

  .text-side h2 {
    font-size: 2.2rem;
  }

  .text-side p {
    font-size: 1.2rem;
  }
  .text button {
    font-size: 1.2rem;
  }
}
</style>
