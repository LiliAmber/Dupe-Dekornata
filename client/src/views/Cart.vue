<template>
  <v-container>
    <p class="title display-3 text-center pa-4">SHOPPING CART</p>
    <!-- <pre>{{ carts }}</pre> -->
    <v-row class="mx-4">
      <v-col :cols="12" md="9" sm="12">
        <v-simple-table v-model="selected">
          <template v-slot:default>
            <thead class="table-head">
              <tr>
                <th class="text-left">ITEM</th>
                <th class="text-left">PRICE</th>
                <th class="text-left">QUANTITY</th>
                <th class="text-center">ACTIONS</th>
              </tr>
            </thead>
            <!-- <v-row> -->
            <tbody>
              <tr v-for="item in carts" :key="item.id">
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
                <td>{{ item.quantity }}</td>
                <td>
                  <v-btn
                    color="#ffca52"
                    @click.prevent="patchStatus(item.id)"
                    class="mt-4 mx-2"
                    small
                  >
                    Checkout
                  </v-btn>
                  <!-- </div> -->
                  <v-btn
                    color="#304d8b"
                    type="submit"
                    @click.prevent="toEdit(item.id)"
                    class="white--text mt-4 mx-2"
                    depressed
                    small
                  >
                    Edit
                  </v-btn>
                  <v-btn
                    color="red"
                    @click.prevent="delCart(item.id)"
                    class="white--text mt-4 mx-2"
                    small
                  >
                    Delete
                  </v-btn>
                </td>
              </tr>
            </tbody>
            <!-- <BodyTable
              v-for="item in carts"
              :key="item.id"
              :cart="item"
            ></BodyTable> -->
            <!-- </v-row> -->
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import BodyTable from "../components/BodyTable.vue";
export default {
  name: "Cart",
  // components: {
  //   BodyTable,
  // },
  created() {
    this.$store.dispatch("fetchAllCart");
  },

  computed: {
    carts() {
      return this.$store.state.carts;
    },
  },
  methods: {
    delCart(id) {
      console.log(id, "<<<");
      this.$store.dispatch("deleteCart", { id: id });
    },
    toEdit(id) {
      this.$router.push(`/editCart/${id}`);
    },
    patchStatus(id) {
      this.$store.dispatch("patchStatus", { id: id });
    },
  },
};
</script>

<style></style>
