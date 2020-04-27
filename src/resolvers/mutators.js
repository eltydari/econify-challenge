import DataStore from '../db';
import { copyDict } from '../utils/copy';

export const addEvent = (parent, args) => {
    let isoNow = new Date().toISOString();
    let db = new DataStore();

    let eventName = args.name;
    let eventDate = args.date;
    let eventTime = args.time;
    let eventAM = args.am;
    let eventOrg = args.organization;
    let eventDesc = "description" in args ? args.description : "";

    if (!(eventOrg in db.organizations)){
        db.organizations[eventOrg] = {
            "locationIDs": new Set(),
            "eventIDs": new Set(),
            "createdAt": isoNow,
            "updatedAt": isoNow
        };
    }

    if (db.organizations[eventOrg].eventIDs.has(eventName) ||
            eventName in db.events)
        throw `Cannot add event "${eventName}" because it already exists.`;
    
    db.events[eventName] = {
        "organization": eventOrg,
        "date": eventDate,
        "time": eventTime,
        "am": eventAM,
        "createdAt": isoNow,
        "updatedAt": isoNow
    };
    db.organizations[eventOrg].eventIDs.add(eventName);

    let response = copyDict(db.events[eventName]);
    response.name = eventName;
    return response;
}