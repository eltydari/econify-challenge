import DataStore from '../db';
import { getGeometryFromGoogle } from '../utils/apiRequests';

export const addEvent = (parent, args) => {
    let db = new DataStore();
    let name = args.name;
    let date = args.date;
    let time = args.time;
    let am = args.am;
    let org = args.organization;
    let desc = "description" in args ? args.description : "";

    if (!(db.addEvent(name, org, date, time, am, desc)))
        throw `Cannot add event "${name}" because it already exists.`;

    let response = db.events[name];
    response.name = name;
    return response;
}

export const updateEvent = (parent, args) => {
    let db = new DataStore();
    let name = args.name;
    let date = args.date;
    let time = args.time;
    let am = args.am;
    let org = args.organization;
    let desc = "description" in args ? args.description : "";

    if (!(db.updateEvent(name, org, date, time, am, desc)))
        throw `Cannot update event "${name}" because it doesn't exist.`;

    let response = db.events[name];
    response.name = name;
    return response;
}

export const deleteEvent = (parent, args) => {
    let db = new DataStore();
    let name = args.name;

    if (!(name in db.events))
        throw `Cannot delete event "${name}" because it doesn't exist.`;

    let response = db.events[eventName];
    response.name = name;
    db.deleteEvent(name);
    return response;
}
