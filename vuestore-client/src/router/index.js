import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Index.vue";
import Product from "../views/products/Index.vue";
import ProductDetail from "../views/products/Detail.vue";
import Notfound from "../views/error/404.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/product",
    name: "product",
    component: Product,
  },
  {
    path: "/product-details/:id",
    name: "product-details",
    component: ProductDetail,
  },
  {
    path: "/products/:category",
    name: "product-category",
    component: Product,
  },
  {
    path: "*",
    component: Notfound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
