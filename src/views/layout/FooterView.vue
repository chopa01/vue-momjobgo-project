<template>
  <v-footer app v-if="visible.footer">
    <v-card flat tile class="text-center">
      <v-card-text class="black--text"></v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed : {
    ...mapGetters('page',['visible'])
  }
};
</script>
