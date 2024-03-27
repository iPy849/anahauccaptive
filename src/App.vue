<script setup lang="ts">
import PageControlsComponent from "./components/controls/PageControlsComponent.vue";

import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})
</script>

<template>
  <PageControlsComponent />
</template>