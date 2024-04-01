<script setup lang="ts">
import PageControlsComponent from "@cmp/controls/PageControlsComponent.vue";
import BuildingEventComponentVue from '@cmp/landingPage/BuildingEventComponent.vue';
import ClassScheduleComponentVue from '@cmp/landingPage/ClassScheduleComponent.vue';
import SocialMediaComponentVue from '@cmp/landingPage/SocialMediaComponent.vue';
import HeaderComponent from '@cmp/landingPage/HeaderComponent.vue';

import { onMounted } from 'vue'
import { initFlowbite } from 'flowbite'
// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite();
})

</script>

<template>
  <PageControlsComponent />
  <HeaderComponent />
  <main>
    <ClassScheduleComponentVue />
    <BuildingEventComponentVue />
  </main>
  <footer>
    <SocialMediaComponentVue />
  </footer>
</template>