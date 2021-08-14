<template>
  <div class="col-12 col-md-3 col-sm-6 col-xs-6 text-center">
    <v-card class="mt-4">
      <v-carousel :show-arrows="false">
        <v-carousel-item
          v-for="(item, i) in product.image"
          :key="i"
          :src="item"
        ></v-carousel-item>
      </v-carousel>

      <v-card-text class="text--primary text-center">
        <div class="product-name">{{ product.name }}</div>
        <div class="red--text my-1 text-subtitle-2">
          Rp. {{ product.price }}
        </div>
      </v-card-text>

      <div class="text-center">
        <router-link :to="'/details/' + product.id">
          <v-btn class="white--text ma-12" depressed color="#304d8b">
            See Details
          </v-btn>
        </router-link>
      </div>
    </v-card>
  </div>
</template>

<script>
import priceFormatted from "../helper/priceFormatted";
export default {
  name: "Card",
  props: ["product"],
  methods: {
    priceFormatted(price) {
      return priceFormatted(price);
    },
  },
};
</script>

<style>
.product-name {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 20px;
  word-wrap: break-word;
}
</style>
