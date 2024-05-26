<template>
  <div class="news">
    <div class="news-text">
      <h2>Newsletter</h2>
    </div>
    <form>
      <input type="email" placeholder="Enter your email" />
      <button type="submit">Subscribe</button>
    </form>
  </div>
</template>

<script>
export default {};
</script>

<style>
.news {
  background-color: #354f55;
  height: 28rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.news h2 {
  color: white;
  font-size: 2.8rem;
  margin-bottom: 2rem;
}

.news-text {
  text-align: center;
}

.news input {
  font-size: 1.6rem;
  padding: 0.4rem;
  margin-right: 0.7rem;
  border: none;
  outline: none;
}

.news button {
  font-size: 1.6rem;
  padding: 0.4rem;
  cursor: pointer;
  background: white;
  border: none;
}
.news button:hover {
  background: black;
  color: white;
}

@media (max-width: 750px) {
  .news h2 {
    font-size: 2.6rem;
  }

  .news input {
    font-size: 1.4rem;
  }

  .news button {
    font-size: 1.4rem;
  }
}

@media (max-width: 400px) {
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .news input {
    margin-right: 0;
    text-align: center;
  }
  .news h2 {
    font-size: 2.4rem;
  }

  .news input {
    font-size: 1.2rem;
  }

  .news button {
    font-size: 1.2rem;
  }
}
</style>
