import Classroom from "../../typings/classroom";


export function GetClassroomData(simulatedClassroomsN: number, simulatedLessonsN: number,  classRoomsByFloor: number = 8): Classroom[] {
    const simulatedClassrooms: Classroom[] = [];

    for (let i = 0; i < simulatedClassroomsN; i++) {

        const simulatedClassroomData: Classroom = {
            Id: `1${Math.floor(i/classRoomsByFloor) + 1}`+i,
            Name: `s 1${Math.floor(i) + 1}`+i,
            Lessons: []
        };
    
        for (let j = 0; j < simulatedLessonsN; j++) {
            const lastDuration = simulatedClassroomData.Lessons?.length 
            ? simulatedClassroomData.Lessons![j - 1].DurationUnits
            : 0;
            simulatedClassroomData.Lessons!.push({
                Name: `Lesson c${i} ${j}`,
                Teacher: `Teacher ${j}`,
                StartsAt: new Date(Date.now() + (30 * lastDuration * j * 60 * 1000)),
                DurationUnits: (j % 3) + 1
            });
        }

        simulatedClassrooms.push(simulatedClassroomData);
    }

    return simulatedClassrooms;
}