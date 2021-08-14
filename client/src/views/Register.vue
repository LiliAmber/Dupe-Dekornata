<template>
  <v-container>
    <v-form ref="form" v-model="valid" @submit.prevent="signup" lazy-validation>
      <v-text-field
        v-model="email"
        type="text"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        :rules="passwordRules"
        label="Password"
        required
        class="mb-2"
      ></v-text-field>
      <v-text-field
        v-model="username"
        type="text"
        :rules="usernameRules"
        label="Username"
        required
        class="mb-2"
      ></v-text-field>
      <v-text-field
        v-model="full_name"
        type="text"
        :rules="fullNameRules"
        label="full Name"
        required
        class="mb-2"
      ></v-text-field>

      <v-text-field
        v-model="address"
        type="text"
        :rules="addressRules"
        label="Address"
        required
        class="mb-2"
      ></v-text-field>

      <v-btn color="#ffca52" class="mr-4 mb-4" type="submit">
        Sign Up
      </v-btn>
      <h6><a href="/signin">or Signin here</a></h6>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      //==validasi==
      valid: true,
      password: "",
      passwordRules: [(v) => !!v || "Password is required"],
      email: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      username: "",
      usernameRules: [(v) => !!v || "Username is required"],
      full_name: "",
      fullNameRules: [(v) => !!v || "Full Name is required"],
      address: "",
      addressRules: [(v) => !!v || "Address is required"],
    };
  },
  methods: {
    signup() {
      this.$store.dispatch("signup", {
        email: this.email,
        password: this.password,
        full_name: this.full_name,
        username: this.username,
        address: this.address,
      });
    },
  },
};
</script>

<style></style>
