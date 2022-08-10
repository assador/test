<template>
  <router-view/>
</template>

<style lang="scss">
@import '@/assets/styles/style.scss';
@import '@/assets/styles/layout.scss';
</style>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  mounted() {
    this.$store.dispatch('setUsers');
  },
});
</script>
