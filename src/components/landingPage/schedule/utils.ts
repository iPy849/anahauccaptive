import { unitTimeDuration } from "@/consts";
import Classroom from "@/typings/classroom";

export function SortClassroomPerFloor(classrooms: Classroom[]) {
    const classroomPerFloorData: Classroom[][] = [];
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

    return result;
}

export function DateStringPerTimeUnit(unitIndex: number) {
    const date = new Date(Date.now());
    date.setHours(7, 0, 0, 0);
    return new Date(date.getTime() + unitIndex * unitTimeDuration).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}