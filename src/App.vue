<script setup lang="ts">
import DrawerComponent from "./components/DrawerComponent.vue";
import DarkModeButtonComponent from "./components/DarkModeButtonComponent.vue";

import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

<template>
  <DarkModeButtonComponent/>
  <DrawerComponent/>
</template>