<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import {GetClassroomData} from '@svc/data/classrooms.ts';
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()

const classroomOffset = ref(0);
const selectedClassroom = ref(-1);
const classrooms = reactive(GetClassroomData(10, 10));
const currentClassroomData = ref(classrooms[0]);

// NOTE: Estos controles están hechos con las patas
const classroomsToShow = () => Math.round(width.value / 100);
const isAllClassroomsInRange = () => classroomsToShow() >= classrooms.length;

const decreaseSelectorOffset = () => {
    if (isAllClassroomsInRange()) return;
    classroomOffset.value === 0 ? 0 : classroomOffset.value--;
    selectedClassroom.value = -1;
}

const increaseSelectorOffset = () => {
    if (isAllClassroomsInRange()) return;
    classroomOffset.value = ++classroomOffset.value % classrooms.length
    selectedClassroom.value = -1;
}

const selectSelectorClassroom = (i: number) => {
    selectedClassroom.value = i; // Puro UI

    const selectedIndex = (i + classroomOffset.value) % classrooms.length;
    currentClassroomData.value = classrooms[selectedIndex];
};

const showClassrooms = computed(() => {
    const maxQty = classroomsToShow();
    if (isAllClassroomsInRange()) {
        classroomOffset.value = 0;
        return classrooms;
    }

    let leftElemDiff = maxQty + classroomOffset.value - classrooms.length;

    if (leftElemDiff > 0) {
        leftElemDiff = Math.abs(leftElemDiff);
        return [...classrooms.slice(classroomOffset.value), ...classrooms.slice(0, leftElemDiff)];
    } else return [...classrooms.slice(classroomOffset.value, maxQty + classroomOffset.value)];
});
</script>
<template>
    <!-- Navegación de salones -->
    <nav class="pb-4 sticky top-0 bg-white dark:bg-black">
            <ul class="flex justify-center gap-2">
                <li @click="decreaseSelectorOffset">
                    <span class="selector-arrows rounded-s-lg">
                        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 1 1 5l4 4" />
                        </svg>
                    </span>
                </li>
                <li class="text-sm border border-primary rounded-full text-black dark:text-white"
                    v-for="(classroom, index) in showClassrooms" :key="index" @click="selectSelectorClassroom(index)"
                    :class="{ 'bg-primary text-white': selectedClassroom === index }">
                    <span href="#" class="flex items-center justify-center px-3 h-8">{{
                        classroom.Name }}</span>
                </li>
                <li @click="increaseSelectorOffset">
                    <span class="selector-arrows rounded-e-lg">
                        <svg class="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m1 9 4-4-4-4" />
                        </svg>
                    </span>
                </li>
            </ul>
        </nav>

        <!-- Timeline -->
        <ol class="py-4 flex flex-shrink-0 overflow-x-scroll snap-x">

            <li v-for="(lesson, index) in currentClassroomData.Lessons" :key="index"
                class="relative px-8 max-w-48 w-1/3 md:w-1/4 lg:w-1/5 grid place-content-center snap-center">
                <span class="absolute w-full h-1 top-1/2 -translate-y-1/2 bg-primary" />
                <div
                    class="z-10 p-2 m-2 rounded-lg bg-primary text-white border-4 border-white dark:border-black text-sm relative inline-block">
                    {{ lesson.Name }}
                    <small :class="{ '-top-5': index % 2 !== 0, '-bottom-5': index % 2 === 0 }"
                        class="absolute p-1 rounded-full -left-8 bg-white dark:bg-black border border-primary text-xs text-color">
                        {{ lesson.StartsAt.toTimeString().slice(0, 8) }}</small>
                </div>
                <svg class="w-8 absolute text-primary -right-4 top-1/2 -translate-y-1/2" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m9 5 7 7-7 7" />
                </svg>
            </li>
        </ol>
</template>