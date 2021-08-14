import Vue from "vue";
// import VueRouter from "vue-router";
import router from "../router";
import Vuex from "vuex";
import axios from "../api/axios";
import Swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    details: {},
    carts: [],
    transactions: [],
  },
  mutations: {
    SET_PRODUCTS(state, payload) {
      state.products = payload;
    },
    SET_DETAILS(state, payload) {
      state.details = payload;
    },
    SET_CARTS(state, payload) {
      state.carts = payload;
    },
    SET_TRANSACTIONS(state, payload) {
      state.transactions = payload;
    },
  },
  actions: {
    fetchProduct(context, payload) {
      axios({
        method: "GET",
        url: "/products",
      })
        .then(({ data }) => {
          context.commit("SET_PRODUCTS", data);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },

    signin(context, payload) {
      axios({
        method: "POST",
        url: "/users/signin",
        data: payload,
      })
        .then(({ data }) => {
          //==simpan access_token di local storage==
          localStorage.setItem("access_token", data.access_token);
          router.push("/");
          //==alert==
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Signed in successfully",
          });
        })
        .catch((err) => {
          Swal.fire("Error", err.response.data.message, "error");
        });
    },

    signup(context, payload) {
      axios({
        method: "POST",
        url: "/users/signup",
        data: payload,
      })
        .then(() => {
          //===redirect ke sign in
          router.push("/signin");

          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Signed up successfully",
          });
        })
        .catch((err) => {
          Swal.fire("Error", err.response.data.message, "error");
        });
    },

    fetchDetails(context, payload) {
      // console.log(payload, "<<id store");
      axios({
        method: "GET",
        url: `/products/${payload}`,
      })
        .then(({ data }) => {
          context.commit("SET_DETAILS", data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    fetchAllCart(context, payload) {
      axios({
        method: "GET",
        url: "/carts",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          context.commit("SET_CARTS", data);
        })
        .catch((err) => {
          Swal.fire("Error", err.response.data.message, "error");
        });
    },

    createCart(context, payload) {
      axios({
        method: "POST",
        url: "/carts",
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          ProductId: payload.id,
        },
      })
        .then(({ data }) => {
          context.dispatch("fetchAllCart");
          router.push({ name: "Cart" });
        })
        .catch((err) => {
          if (err.response.data.message === "authentication failed !") {
            router.push("/signin");
          }
          Swal.fire("Error", err.response.data.message, "error");
        });
    },

    getTransaction(context, payload) {
      axios({
        method: "GET",
        url: "/transactions",
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          console.log(data, "<<di store");
          context.commit("SET_TRANSACTIONS", data);
        })
        .catch((err) => {
          Swal.fire("Error", err.response.data.message, "error");
        });
    },
    patchStatus(context, payload) {
      console.log(payload, "<<<<store status");
      //==api create transaction==
      axios({
        method: "POST",
        url: "/transactions",
        data: payload,
        headers: {
          access_token: localStorage.access_token,
        },
      })
        .then(({ data }) => {
          console.log(data);
          context.dispatch("getTransaction");
          router.push({ name: "TransactionDetails" });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    deleteCart(context, payload) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: "DELETE",
            url: `/carts/${payload.id}/delete`,
            headers: {
              access_token: localStorage.access_token,
            },
          })
            .then(() => {
              context.dispatch("fetchAllCart");

              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "this cart has been deleted",
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              Swal.fire({
                position: "top-end",
                icon: "error",
                title: "OOPS...",
                text: err.response.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
            });
        }
      });
    },

    patchQty(context, payload) {
      console.log(payload, "<<id qty");

      let quantity = +payload.quantity;
      console.log(quantity, "<<<qty");
      let id = +payload.id;
      axios({
        method: "PATCH",
        url: `carts/${id}/editQty`,
        headers: {
          access_token: localStorage.access_token,
        },
        data: {
          quantity,
        },
      })
        .then(() => {
          context.dispatch("fetchAllCart");
          router.push("/carts");

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "your cart has been updated",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  modules: {},
});
