<script setup lang="ts">
import DarkModeButtonComponent from './DarkModeButtonComponent.vue';
import DrawerComponent from './DrawerComponent.vue';
import DrawerButtonComponent from './DrawerButtonComponent.vue';
</script>
<template>
    <DrawerComponent />
    <div class="absolute bottom-0 right-0 px-2 py-4">
        <DarkModeButtonComponent class="my-2 block"/>
        <DrawerButtonComponent class="block"/>
    </div>
</template>