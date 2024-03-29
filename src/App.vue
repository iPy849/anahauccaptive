<script setup lang="ts">
import PageControlsComponent from "@cmp/controls/PageControlsComponent.vue";
import LandingPageComponent from "@cmp/landingPage/LandingPageComponent.vue";

import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})
</script>

<template>
  <LandingPageComponent/>
  <PageControlsComponent/>
</template>