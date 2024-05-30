import Classroom from "../../typings/classroom";


export function GetClassroomData(simulatedClassroomsN: number, simulatedLessonsN: number,  classRoomsByFloor: number = 8): Classroom[] {
    const simulatedClassrooms: Classroom[] = [];

    for (let i = 0; i < simulatedClassroomsN; i++) {

        const simulatedClassroomData: Classroom = {
            Id: `1${Math.floor(i/classRoomsByFloor) + 1}`+i,
            Name: `s 1${Math.floor(i) + 1}`+i,
            Lessons: []
        };
        
        let startLessonAtUnit = 0;
        for (let j = 0; j < simulatedLessonsN; j++) {
            simulatedClassroomData.Lessons!.push({
                Name: `Lesson c${i} ${j}`,
                Teacher: `Teacher ${j}`,
                StartsAtUnit: startLessonAtUnit,
                DurationUnits: (j % 3) + 1
            });
            startLessonAtUnit += (j % 3) + 2;
        }

        simulatedClassrooms.push(simulatedClassroomData);
    }

    return simulatedClassrooms;
}