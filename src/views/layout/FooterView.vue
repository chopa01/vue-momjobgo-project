<template>
 <div/> 
</template>

<script>
import {mapGetters} from "vuex";

export default {
  computed : {
    ...mapGetters('page',['visible'])
  }
};
</script>
