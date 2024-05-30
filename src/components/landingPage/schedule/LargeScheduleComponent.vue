<script setup lang="ts">
import { computed, ref } from 'vue';
import { GetClassroomData } from '@svc/data/classrooms.ts';
import { numberOfRows } from '@/consts.ts'
import { SortClassroomPerFloor, DateStringPerTimeUnit } from './utils.ts';
import TimeUnitMaskState from './typings/TimeUnitMaskState.ts';

const floorSelector = ref(0);
const classroomsPerFloor = SortClassroomPerFloor(GetClassroomData(10, 10));

const currentFloorLessonsByTimeUnitMask = computed(() => {
    const floorClassrooms = [...classroomsPerFloor[floorSelector.value]]; // Floor copy
    const lessonsByTimeUnit: number[][] = [];

    for (const classroom of floorClassrooms) {
        const classRoomLessonByTimeUnit: number[] = [];

        let classroomLessonIndex = 0;
        let spanUnit = 0;
        const lessons = classroom.Lessons!;

        for (let scheduleTimeUnit = 0; scheduleTimeUnit < numberOfRows; scheduleTimeUnit++) {

            // No hay nada más que iterar
            if (classroomLessonIndex >= lessons.length) {
                classRoomLessonByTimeUnit.push(TimeUnitMaskState.Free);
                continue;
            }

            // Ocupado
            if (spanUnit > 0) {
                classRoomLessonByTimeUnit.push(TimeUnitMaskState.Busy);
                spanUnit--;
            }
            // Empieza una clase
            else if (lessons[classroomLessonIndex].StartsAtUnit === scheduleTimeUnit) {
                classRoomLessonByTimeUnit.push(classroomLessonIndex)
                spanUnit = lessons[classroomLessonIndex].DurationUnits - 1;
                classroomLessonIndex++;
            }
            // Hay un espacio libre
            else classRoomLessonByTimeUnit.push(TimeUnitMaskState.Free);
        }
        lessonsByTimeUnit.push(classRoomLessonByTimeUnit);
    }
    return lessonsByTimeUnit;
});
</script>
<template>
    <div class="w-fit">
        <!-- Selector -->
        <div class="inline-flex border-2 border-primary hover:border-primary_darker bg-primary hover:bg-primary_darker rounded-t-lg overflow-hidden"
            role="group">
            <button type="button" @click="floorSelector = floorIndex - 1"
                v-for="floorIndex in classroomsPerFloor.length" :key="floorIndex"
                :class="{ 'border-b-4 border-white': (floorIndex - 1) === floorSelector }"
                class="px-4 py-2 text-white hover:bg-primary_accent">
                <span> Piso {{ floorIndex }}</span>
            </button>
        </div>

        <!-- Tabla -->
        <div class="relative h-96 overflow-x-hidden overflow-y-scroll rounded-e-lg rounded-bl-lg shadow-lg">
            <table class="text-sm text-center">
                <!-- Headers -->
                <thead class="text-xs text-white uppercase bg-primary sticky top-0">
                    <tr>
                        <th class="py-3 w-20 border border-primary_lighter">
                            Hora
                        </th>
                        <th v-for="(header, index) in classroomsPerFloor[floorSelector].map(classroom => classroom.Name)"
                            :key="index" scope="col" class="py-3 w-auto border border-primary_lighter">
                            {{ header }}
                        </th>
                    </tr>
                </thead>
                <!-- Datos -->
                <tbody>
                    <tr v-for="rowIndex in numberOfRows" :key="rowIndex" class="bg-primary_light">

                        <td class="bg-primary text-white border border-primary_lighter">
                            {{ DateStringPerTimeUnit(rowIndex - 1) }}
                        </td>

                        <template v-for="(classroomMask, classroomIndex) in currentFloorLessonsByTimeUnitMask"
                            :key="classroomIndex">
                            <td 
                                class="text-black bg-primary_lighter hover:bg-primary hover:text-white"
                                v-if="classroomMask[rowIndex - 1] >= 0" 
                                :rowspan="classroomsPerFloor[floorSelector][classroomIndex].Lessons![classroomMask[rowIndex - 1]].DurationUnits"
                            >
                                {{ classroomsPerFloor[floorSelector][classroomIndex].Lessons![classroomMask[rowIndex - 1]].Name }}
                            </td>
                            <td 
                                class="border border-primary_lighter"
                                v-else-if="classroomMask[rowIndex - 1] === TimeUnitMaskState.Free"
                            ></td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>