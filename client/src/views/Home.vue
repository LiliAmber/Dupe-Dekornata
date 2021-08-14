<template>
  <v-container>
    <!-- <h1 class="mb-4 text-center">ini home</h1> -->
    <v-carousel>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
    <template>
      <v-row no-gutters>
        <v-col :cols="12">
          <v-card-text title outlined>
            <v-card-title class="subheading ">Deals of the Day</v-card-title>
            <v-divider></v-divider>
            <div class="row">
              <Card
                v-for="item in products"
                :key="item.id"
                :product="item"
              ></Card>
            </div>
          </v-card-text>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import Card from "../components/Card.vue";
export default {
  name: "Home",
  components: {
    Card,
  },
  data() {
    return {
      items: [
        {
          src:
            "https://asset.dekornata.com/image/variant/original/sera-coffee-tray-food-grade-beeswax-1589022481570.jpeg",
        },
        {
          src:
            "https://asset.dekornata.com/image/variant/original/pekat-cup-cerulean-(blue)-1589021175885.jpeg",
        },
        {
          src:
            "https://asset.dekornata.com/image/variant/original/ciel-cutting-board-serving-board-tatakan-kayu-talenan-saji-kayu-ciel-cutting-board-1627381939964.jpeg",
        },
        {
          src:
            "https://asset.dekornata.com/image/variant/original/keranjang-rattan-1-set-keranjang-anyaman-rotan-toples-keranjang-rattan-1612166158211.jpeg",
        },
      ],
    };
  },

  created() {
    this.$store.dispatch("fetchProduct");
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>
