import Classroom from "../../typings/classroom";

function GetClassroomData(simulatedClassroomsN: number, simulatedLessonsN: number): Classroom[] {
    const simulatedClassrooms: Classroom[] = [];

    for (let i = 0; i < simulatedClassroomsN; i++) {

        const simulatedClassroomData: Classroom = {
            Id: `[Classroom Id ${i}]`,
            Name: `11`+i,
            Lessons: []
        };
    
        for (let j = 0; j < simulatedLessonsN; j++) {
            simulatedClassroomData.Lessons.push({
                Name: `Lesson c${i} ${j}`,
                Teacher: `Teacher ${j}`,
                StartsAt: new Date(Date.now() + (90 * j * 60 * 1000)),
                IsFree: j % 4 == 0
            });
        }

        simulatedClassrooms.push(simulatedClassroomData);
    }

    return simulatedClassrooms;
}

export default { GetClassroomData };