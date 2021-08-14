<template>
  <v-container>
    <tr>
      <td>
        <v-img :src="cart.Product.image[0]" max-height="130" max-width="130">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
      </td>

      <td class="p-price">Rp. {{ cart.Product.price }}</td>
      <td class="qua-col">
        <div class="quantity">
          {{ cart.quantity }}
        </div>
      </td>
      <!-- <td>
        <v-btn color="#ffca52" type="submit" class="my-2">
          Checkout
        </v-btn>
        <v-btn color="#ffca52" type="submit" class="my-2">
          Checkout
        </v-btn>
      </td> -->
    </tr>
  </v-container>
</template>

<script>
export default {
  name: "BodyTable",
  props: ["cart"],
  data() {
    return {
      CartId: 0,
    };
  },
  methods: {
    updStatus() {
      this.$store.dispatch("patchStatus", {
        CartId: this.CartId,
      });
    },
  },

  delCart(id) {
    console.log(id, "<<<");
    this.$store.dispatch("deleteCart", { id: id });
  },
};
</script>

<style>
/* tr td.p-price {
  width: 16%;
}

tr td.qua-col {
  width: 16%;
} */
</style>
