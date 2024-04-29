<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { GetClassroomData } from '@svc/data/classrooms.ts';

const floorSelector = ref(0);
const classrooms = reactive(GetClassroomData(10, 10));

const classroomsPerFloor = computed(() => {
    const classroomPerFloorData = [];
    const notAbleToClassify = [];
    for (const classroom of classrooms) {
        try {
            const floor = parseInt(classroom.Id[1]);

            if (floor > classroomPerFloorData.length) {
                const diff = floor - classroomPerFloorData.length;
                for (let index = 0; index < diff; index++) {
                    classroomPerFloorData.push([]);
                }
            }
            classroomPerFloorData[floor - 1].push(classroom);

        } catch (error) {
            notAbleToClassify.push(classroom);
        }
    }

    const result = !notAbleToClassify.length
        ? [...classroomPerFloorData]
        : [...classroomPerFloorData, notAbleToClassify];

    console.log(result);
    return result;
});

const classroomsHeaders = computed(() => {
    const headers = ["Hora"];
    headers.push(...classroomsPerFloor.value[floorSelector.value].map(classroom => classroom.Name));
    return headers;
});

// TODO: Meter info de horas, falta procesarla

</script>
<template>
    <div>
        <!-- Selector -->
        <div class="inline-flex border-2 border-primary hover:border-primary_darker bg-primary hover:bg-primary_darker rounded-t-lg overflow-hidden"
            role="group">
            <button type="button" @click="floorSelector = index" v-for="(_, index) in classroomsPerFloor" :key="index"
                :class="{ 'border-b-4 border-white': index === floorSelector }"
                class="px-4 py-2 text-white hover:bg-primary_accent">
                <span> Piso {{ index + 1 }}</span>
            </button>
        </div>

        <!-- Tabla -->
        <div class="relative overflow-x-auto rounded-e-lg rounded-bl-lg shadow-lg">
            <table class="w-full text-sm text-left">
                <thead class="text-xs text-white uppercase bg-primary">
                    <tr>
                        <th
                            v-for="(header, index) in classroomsHeaders"
                            :key="index"
                            scope="col" class="px-6 py-3">
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- TODO: Aquí hay que organizar la información-->
                    <tr v-for="(classroom, index) in classroomsPerFloor[floorSelector]" :key="index"
                        class="odd:bg-primary_light even:bg-primary_lighter border-b border-gray-300">
                        <th scope="row" class="px-6 py-4 font-medium text-black whitespace-nowrap">
                            {{ classroom.Name }}
                        </th>
                        <td class="px-6 py-4">
                            Silver
                        </td>

                        <td class="px-6 py-4">
                            Laptop
                        </td>
                        <td class="px-6 py-4">
                            $2999
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>