<template>
  <v-container>
    <p class="title display-3 text-center pa-4">EDIT CART</p>
    <!-- <pre>{{ editCart }}</pre> -->
    <v-row class="mx-4">
      <v-col :cols="12" md="10" sm="12">
        <v-simple-table>
          <template v-slot:default>
            <thead class="table-head">
              <tr>
                <th class="text-left">ITEM</th>
                <th class="text-left">PRICE</th>
                <th class="text-left">QUANTITY</th>
                <th class="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in editCart" :key="item.id">
                <td class="py-4">
                  <v-checkbox
                    :value="item.id"
                    v-model="CartId"
                    :label="item.Product.name"
                    class="form-label"
                  ></v-checkbox>
                  <v-img
                    :src="item.Product.image[0]"
                    max-height="130"
                    max-width="130"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </td>
                <td>Rp. {{ item.Product.price }}</td>
                <td>
                  <v-text-field
                    :value="item.quantity"
                    type="number"
                    v-model="item.quantity"
                  >
                  </v-text-field>
                </td>

                <td>
                  <v-btn
                    color="#304d8b"
                    type="submit"
                    @click.prevent="editQty(item.id)"
                    class="white--text mt-4 mx-2"
                    depressed
                    small
                  >
                    Submit
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "EditCart",
  computed: {
    editCart() {
      let id = this.$route.params.id;

      return this.$store.state.carts.filter((item) => item.id == id);
    },
  },
  methods: {
    editQty() {
      return this.$store.dispatch("patchQty", this.editCart[0]);
    },
  },
};
</script>

<style></style>
