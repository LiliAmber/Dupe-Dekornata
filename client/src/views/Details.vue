<template>
  <v-container>
    <div class="row">
      <div class="col-md-5 col-sm-5 col-xs-12">
        <v-carousel>
          <v-carousel-item
            v-for="(item, i) in itemDetails.image"
            :key="i"
            :src="item"
            height="200px"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-carousel-item>
        </v-carousel>
      </div>

      <div class="col-md-7 col-sm-7 col-xs-12">
        <div class="pl-6">
          <p class="display-1 mb-0">{{ itemDetails.name }}</p>
          <p class="red--text headline font-weight-light pt-3">
            Rp. {{ itemDetails.price }}
          </p>
          <v-divider class="my-3"></v-divider>
        </div>
        <v-card-actions>
          <v-btn
            class="white--text"
            color="#304d8b"
            coutlined
            tile
            dense
            @click="toCreateCart(itemDetails.id)"
            ><v-icon>mdi-cart</v-icon> ADD TO CART</v-btn
          >
        </v-card-actions>
      </div>
    </div>
    <template>
      <div class="row">
        <div class="col-sm-12 col-xs-12 col-md-12">
          <v-tabs>
            <v-tab>Description</v-tab>
            <v-tab>Information</v-tab>
            <v-tab-item>
              <p class="mt-6">{{ itemDetails.description }}</p>
              <!-- <div class="justify-sm-center justify-start">
                <span class="float-left">Material</span>
                <span class="float-right">{{ itemDetails.material }}</span>
              </div> -->
            </v-tab-item>
            <v-tab-item>
              <div class="justify-sm-center justify-start mb-8">
                <span class="float-left">Dimension</span>
                <span class="float-right">{{ itemDetails.dimension }}</span>
              </div>
              <div class="justify-sm-center justify-start mb-8">
                <span class="float-left">Weight</span>
                <span class="float-right">{{ itemDetails.weight }} kg</span>
              </div>
              <!-- <div class="justify-sm-center justify-start mb-8">
                <span class="float-left">Finishing</span>
                <span class="float-right">{{ itemDetails.finishing }}</span>
              </div> -->
            </v-tab-item>
          </v-tabs>
        </div>
      </div>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "Details",
  methods: {
    productDetails() {
      let id = this.$route.params.id;
      return this.$store.dispatch("fetchDetails", id);
    },

    toCreateCart(id) {
      this.$store.dispatch("createCart", { id: id });
    },
  },

  created() {
    this.productDetails();
  },

  computed: {
    itemDetails() {
      return this.$store.state.details;
    },
  },
};
</script>
