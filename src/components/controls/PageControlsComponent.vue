<script setup lang="ts">
import DarkModeButtonComponent from './DarkModeButtonComponent.vue';
import DrawerComponent from './DrawerComponent.vue';
import DrawerButtonComponent from './DrawerButtonComponent.vue';
</script>
<template>
    <DrawerComponent />
    <div class="fixed bottom-0 right-0 p-2">
        <DarkModeButtonComponent class="my-2 block"/>
        <DrawerButtonComponent class="block"/>
    </div>
</template>