import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Register.vue"),
  },
  //==GET ALL CARTS==
  {
    path: "/carts",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  },
  //==CRETE NEW CART===
  {
    path: "/carts",
    name: "AddCart",
  },
  {
    path: "/history",
    name: "TransactionDetails",
    component: () => import("../views/TransactionDetails.vue"),
  },
  {
    path: "/editCart/:id",
    name: "EditCart",
    component: () => import("../views/EditCart.vue"),
  },
  {
    path: "/details/:id",
    name: "Details",
    component: () => import("../views/Details.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const userRoutes = ["Cart", "AddCart"];
  if (userRoutes.includes(to.name) && !localStorage.getItem("access_token")) {
    next("/signin");
  } else if (to.name === "Signin" && localStorage.getItem("access_token")) {
    next("/");
  } else {
    next();
  }
});
export default router;
