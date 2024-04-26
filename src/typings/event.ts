import Building from "./building";

export default interface Event {
    ID: string,
    Name: string,
    StartTDateime: Date,
    EndDateTime: Date,
    BuildingID: string,
    BuildingData: Building | null
}