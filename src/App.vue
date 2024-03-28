<script setup lang="ts">
import PageControlsComponent from "./components/controls/PageControlsComponent.vue";
import LandingPageComponent from "./components/LandingPageComponent.vue";

import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})
</script>

<template>
  <LandingPageComponent class="p-2"/>
  <PageControlsComponent/>
</template>