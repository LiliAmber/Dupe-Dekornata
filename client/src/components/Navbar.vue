<template>
  <v-container>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      app
      color="#ffca52"
      dark
    >
      <v-toolbar-title style="width: 350px">
        <a href="/" class="black-text" style="text-decoration: none"
          ><v-icon>mdi-home</v-icon>&nbsp;Test-Dekornata</a
        >
      </v-toolbar-title>

      <v-btn href="/carts" icon class="mx-2">
        <v-badge content="2" value="2" color="#304d8b" overlap>
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
      <v-btn class="mx-6" icon href="/history">
        <v-icon>mdi-email</v-icon>History
      </v-btn>
      <v-btn class="mx-4" icon href="/signin" v-if="$route.name !== 'Signin'">
        <v-icon>mdi-login</v-icon>Login
      </v-btn>
      <v-btn class="mx-4" icon @click.prevent="signout">
        <v-icon>mdi-logout</v-icon>Logout
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script>
import Swal from "sweetalert2";
export default {
  name: "Navbar",

  methods: {
    signout() {
      localStorage.clear();
      this.$router.push({ name: "Signin" });
      Swal.fire({
        position: "top-start",
        icon: "success",
        title: "Your already signed out",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>
