<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { GetClassroomData } from '@svc/data/classrooms.ts';
import { slotTimeRange, numberOfRows } from '@/consts.ts'

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

console.log(classroomsPerFloor);


const classroomsHeaders = computed(() => {
    const headers = ["Hora"];
    headers.push(...classroomsPerFloor.value[floorSelector.value].map(classroom => classroom.Name));
    return headers;
});

const DateStringPerSlot = (slotIndex: number) => {
    const date = new Date(Date.now());
    date.setHours(7, 0, 0, 0);
    return new Date(date.getTime() + slotIndex * slotTimeRange).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
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
            <table class="w-full text-sm text-left overflow-x-auto">
                <thead class="text-xs text-white uppercase bg-primary">
                    <tr>
                        <th v-for="(header, index) in classroomsHeaders" :key="index" scope="col"
                            class="px-6 py-3 first:w-20 max-w-15">
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- TODO: Aquí hay que organizar la información-->
                    <tr v-for="rowIndex in numberOfRows" :key="rowIndex"
                        class="odd:bg-primary_light even:bg-primary_lighter border-b border-gray-300">

                        <th scope="row" class="text-center text-black whitespace-nowrap">
                                    {{ DateStringPerSlot(rowIndex - 1) }}
                        </th>

                        <th scope="row" 
                        v-for="(classrooms, classroomIndex) in classroomsPerFloor[floorSelector]"
                            :key="classroomIndex" 
                            v-if="rowIndex < classrooms.Lessons.length"
                            :rowspan="classrooms.Lessons[rowIndex].DurationUnits">
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>