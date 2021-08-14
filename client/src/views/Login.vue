<template>
  <v-container>
    <v-form ref="form" v-model="valid" @submit.prevent="signin" lazy-validation>
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

      <v-btn color="#ffca52" class="mr-4 mb-4" type="submit">
        Sign In
      </v-btn>
      <h6><a href="/signup">or Register here</a></h6>
    </v-form>
  </v-container>
</template>

<script>
export default {
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
    };
  },

  methods: {
    signin() {
      this.$store.dispatch("signin", {
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style></style>
