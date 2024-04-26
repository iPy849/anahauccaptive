<script setup lang="ts">
import MobileScheduleComponent from "@cmp/landingPage/schedule/MobileScheduleComponent.vue";
import LargeScheduleComponent from "@cmp/landingPage/schedule/LargeScheduleComponent.vue";
</script>
<template>
    <section class="p-4">
        <h2 class="pb-2 text-2xl font-semibold text-color">Horario de salones</h2>
        <p class="pb-4 text-sm text-color">Selecciona una salón para ver su horario</p>

        <MobileScheduleComponent/>
        <LargeScheduleComponent />
    </section>
</template>
<style lang="scss">
.selector-arrows {
    @apply flex items-center justify-center px-3 h-8 text-black dark:text-white bg-white dark:bg-primary border border-primary dark:border-white active:bg-primary dark:active:bg-white;
}
</style>