import Lesson from "./lesson";

export default interface Classroom {
    Id: string,
    Name: string,
    Lessons: Lesson[] | null
}