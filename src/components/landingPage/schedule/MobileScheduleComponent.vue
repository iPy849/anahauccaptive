<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { GetClassroomData } from '@svc/data/classrooms.ts';

const classroomsToShowQty = 5;

const selectedClassroom = ref(0);
const classrooms = reactive(GetClassroomData(10, 10));
const currentClassroomData = ref(classrooms[0]);


let selectionOffset = ref(0);

// NOTE: Estos controles están hechos con las patas
const decreaseSelector = (decreaseBy: number) => {
    if (selectionOffset.value === 0) return;
    selectionOffset.value -= decreaseBy;
    assignActionValue(selectedClassroom.value);
}

const increaseSelector = (increaseBy: number) => {
    if (selectionOffset.value + classroomsToShowQty >= classrooms.length) return;
    selectionOffset.value += increaseBy;
    assignActionValue(selectedClassroom.value);
}

const classroomSelector = (classroomIndex: number) => {
    if (classroomIndex === selectedClassroom.value) return;
    assignActionValue(classroomIndex);
    selectedClassroom.value = classroomIndex;
}

// TODO: No se asigna bien el valor cuando se cambia de salón con las flechas
const assignActionValue = (classroomIndex:number ) => {
    console.log("Hola");
    currentClassroomData.value = classroomsToShow.value[classroomIndex];
}

const classroomsToShow = computed(() => {
    return classrooms.slice(selectionOffset.value, selectionOffset.value + classroomsToShowQty)
});

</script>
<template>
    <!-- Navegación de salones -->
    <nav class="m-auto w-fit">
        <ul class="flex items-center -space-x-px h-10 text-base">
            <li @click="decreaseSelector(1)">
                <button
                    class="flex bg-primary items-center justify-center px-2 h-10 ms-0 leading-tight text-white rounded-s-lg hover:bg-primary_darker  ">
                    <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5 1 1 5l4 4" />
                    </svg>
                </button>
            </li>

            <li v-for="(classroom, index) in classroomsToShow" :key="index" @click="classroomSelector(index)">
                <button
                    :class="{ 'bg-primary text-white border-0': selectedClassroom === index, 'bg-white dark:bg-gray-900 text-primary border': selectedClassroom !== index }"
                    class="flex items-center justify-center px-2 h-10 leading-tight  border-gray-300 dark:border-gray-700">
                    {{ classroom.Name }}
                </button>
            </li>
            <li @click="increaseSelector(1)">
                <button
                    class="flex bg-primary items-center justify-center px-2 h-10 ms-0 leading-tight text-white rounded-e-lg hover:bg-primary_darker  ">
                    <svg class="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                        fill="none" viewBox="0 0 6 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="m1 9 4-4-4-4" />
                    </svg>
                </button>
            </li>
        </ul>
    </nav>

    <!-- Timeline -->
    <ol class="py-4 flex flex-shrink-0 overflow-x-scroll snap-x">

        <li v-for="(lesson, index) in classrooms[selectedClassroom].Lessons" :key="index"
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