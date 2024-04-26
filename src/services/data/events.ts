import Event from "@type/event";


export function GetNextEvents(): Event[] {
    const testId = "<fake_id>";
    const testDate = new Date(Date.now());

    const events: Event[] = [];
    for (let index = 0; index < 3; index++) {
        events.push(        {
            ID: testId,
            Name: "Event " + index.toString(),
            StartTDateime: testDate,
            EndDateTime: new Date(testDate.getTime() + (1*60*60*1000)),
            BuildingID: testId,
            BuildingData: null
        },)
    }
    return events;
}