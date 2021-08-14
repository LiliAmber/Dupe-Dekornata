<template>
  <v-container>
    <p class="title display-3 text-center pa-4">SHOPPING HISTORY</p>
    <!-- <pre>{{ listTrans }}</pre> -->
    <v-row class="mx-4">
      <v-col :cols="12" md="9" sm="12">
        <v-simple-table v-model="selected">
          <template v-slot:default>
            <thead class="table-head">
              <tr>
                <th class="text-left">INVOICE</th>
                <th class="text-left">STATUS</th>
                <th class="text-left">QUANTITY</th>
                <th class="text-left">TOTAL PRICE</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in listTrans" :key="item.id">
                <td>{{ item.invoice_number }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.total_amount }}</td>
                <td>Rp. {{ item.total_price }}</td>
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
  name: "TransactionDetails",
  created() {
    this.$store.dispatch("getTransaction");
  },
  computed: {
    listTrans() {
      return this.$store.state.transactions;
    },
  },
};
</script>

<style></style>
