<script setup lang="ts">
import BuildingEventComponentVue from './BuildingEventComponent.vue';
import ClassScheduleComponentVue from './ClassScheduleComponent.vue';
import SocialMediaComponentVue from './SocialMediaComponent.vue';

</script>
<template>
    <main>
        <header
            class="w-100 py-2 dark:bg-dark-banner bg-light-banner bg-cover bg-no-repeat bg-center grid place-content-center">
            <h2 class="py-2 text-3xl font-bold text-center text-white">Edificio {edificio}</h2>
        </header>
        <main>
            <img src="@assets/imgs/poster.jpg" class="w-100" />
            <BuildingEventComponentVue />
            <ClassScheduleComponentVue />
        </main>
        <footer>
            <SocialMediaComponentVue />
        </footer>

    </main>
</template>