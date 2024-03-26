<script setup lang="ts">
import DrawerComponent from "./components/DrawerComponent.vue";
import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
// initialize components based on data attribute selectors
onMounted(() => {
    initFlowbite();
})
</script>

<template>
  <DrawerComponent/>
</template>