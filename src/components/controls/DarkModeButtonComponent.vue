<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { SunIcon, MoonIcon } from "@heroicons/vue/24/solid";
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
    <button type="button"
        class="round-button"
        @click="toggleDark()">
        <SunIcon class="w-8" v-if="isDark" />
        <MoonIcon class="w-8" v-else />

    </button>
</template>