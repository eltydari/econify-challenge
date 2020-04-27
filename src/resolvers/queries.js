import {
    organizations,
    events,
    locations
} from '../db-temp/dataStore';
import DataStore from '../db';
import { copyDict } from '../utils/copy';

export const getOrganization = (parent, args) => {
    let db = new DataStore();
    let name = '';
    if (parent)
        name = parent.name;
    else
        name = args.name;

    if (name in db.organizations){
        let org = copyDict(db.organizations[name]);
        org.name = name;
        return org;
    }
}

export const getLocation = (parent, args) => {
    let name = args.name;

    if (Object.keys(locations).length > 0){
        if (name in locations){
            let loc = copyDict(locations[name]);
            loc.name = name;
            return loc;
        }
    }
}

export const getLocations = (parent) => {
    let locs = [];

    if (parent.locationIDs.size > 0){
        parent.locationIDs.forEach(name => {
            if (name in locations){
                let loc = copyDict(locations[name]);
                loc.name = name;
                locs.push(loc);
            }
        });
    }
    return locs;
}

export const getEvent = (parent, args) => {
    let db = new DataStore();
    let name = args.name;

    if (Object.keys(db.events).length > 0){
        if (name in db.events){
            let evt = copyDict(db.events[name]);
            evt.name = name;
            return evt;
        }
    }
}

export const getEvents = (parent) => {
    let evts = [];

    if (parent.eventIDs.size > 0)
    {    
        parent.eventIDs.forEach(name => {
            if (name in events){
                let evt = copyDict(events[name]);
                evt.name = name;
                evts.push(evt);
            }
        });
    }
    return evts;
}
