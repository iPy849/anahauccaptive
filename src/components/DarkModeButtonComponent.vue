<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon } from "@heroicons/vue/24/solid";
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
<template>
    <button type="button"
    :class="{isDark: 'bg-white text-black'}"
        class="text-white bg-black hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="toggleDark()">
        <SunIcon class="w8 h-8" v-if="isDark" />
        <MoonIcon class="w8 h-8" v-else />

    </button>
</template>