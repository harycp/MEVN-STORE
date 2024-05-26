<template>
  <footer>
    <div class="footer-links">
      <a href="#">About</a>
      <a href="#">Store location</a>
      <a href="#">FAQs</a>
      <a href="#">News</a>

      <a href="#">Contact Us</a>
    </div>
    <p class="copyright">
      <a
        target="_blank"
        rel="noreferrer"
        style="color: white"
        href="https://github.com/harycp"
        >&copy; Designed by Haryc
      </a>
    </p>
  </footer>
</template>

<script>
export default {};
</script>

<style scoped>
footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 14rem;
  background-color: black;
}

.footer-links {
  display: flex;
  gap: 3rem;
  text-align: center;
  flex-wrap: wrap;
  justify-content: center;
}

a {
  color: white;
  text-decoration: none;
  font-size: 1.6rem;
}

a:hover {
  text-decoration: underline;
}

.copyright {
  color: white;
  font-size: 1.6rem;
  margin-top: 2rem;
}

@media (max-width: 700px) {
  a {
    font-size: 1.4rem;
  }
}

@media (max-width: 480px) {
  a {
    font-size: 1.2rem;
  }
}
</style>
