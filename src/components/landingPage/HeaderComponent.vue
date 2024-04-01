<script setup lang="ts">
import { reactive, ref } from 'vue';

const locations = reactive([
    "Edificio Rectoría",
    "Edificio Ingeniería",
    "Cafetería",
    "Edificio Le Cordon Blue",
    "Edificio Negocios",
    "Laboratorios",
    "Área deportiva"
]);
const currentLocationIndex = ref(0);
const isDropdownOpen = ref(true);
const toggleDropdownIcon = () => {
    isDropdownOpen.value = !isDropdownOpen.value
};
</script>
<template>
    <header
        class="w-100 py-2 dark:bg-dark-banner bg-light-banner bg-cover bg-no-repeat bg-center grid place-content-center">

        <button id="BuildingSelectorButton" data-dropdown-toggle="BuildingSelector"
            class="text-white bg-transparent font-bold text-xl px-5 py-2.5 text-center inline-flex items-center gap-2" type="button"
            @click="toggleDropdownIcon">Estás en {{ locations[currentLocationIndex] }}
            <svg v-if="isDropdownOpen" class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 9-7 7-7-7" />
            </svg>
            <svg v-else class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m5 15 7-7 7 7" />
            </svg>
        </button>

        <div id="BuildingSelector"
            class="z-50 hidden bg-white dark:bg-black border-[1px] border-primary dark:border-white rounded-lg shadow overflow-hidden w-52">
            <ul class="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="BuildingSelectorButton">
                <li v-for="(location, index) in locations" :key="index" :class="{'bg-primary': currentLocationIndex === index}">
                    <p @click="currentLocationIndex = index"
                        :class="{'text-white': currentLocationIndex === index}"
                        class="block px-4 py-2 text-black dark:text-white">{{ location
                        }}
                    </p>
                </li>
            </ul>
        </div>

</header></template>