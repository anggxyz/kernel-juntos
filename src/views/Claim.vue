<template>
  <div>
    <Slideover v-bind:class="[$store.getters.panelOpen ? 'z-40' : '']" />
    <Gift :hash="hash" />
  </div>
</template>

<script>
import Slideover from "@/components/Slideover";
import Gift from "./Gift";
export default {
  components: {
    Slideover,
    Gift
  },
  props: {
    hash: String
  }
};
</script>
