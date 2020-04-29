import {
    organizations,
    events,
    locations
} from '../db-temp/dataStore';
import DataStore from '../db';

export const getOrganization = (parent, args) => {
    let db = new DataStore();
    let name = '';
    if (parent)
        name = parent.name;
    else
        name = args.name;

    if (name in db.organizations){
        let org = db.organizations[name];
        org.name = name;
        return org;
    }
}

export const getLocation = (parent, args) => {
    let db = new DataStore();
    let name = args.name;

    if (Object.keys(db.locations).length > 0){
        if (name in db.locations){
            let loc = db.locations[name];
            loc.name = name;
            return loc;
        }
    }
}

export const getLocations = (parent) => {
    let db = new DataStore();
    let locs = [];

    if (parent.locationIDs.size > 0){
        for (const name of parent.locationIDs){
            if (name in db.locations){
                let loc = db.locations[name];
                loc.name = name;
                locs.push(loc);
            }
        }
    }
    return locs;
}

export const getEvent = (parent, args) => {
    let db = new DataStore();
    let name = args.name;

    if (Object.keys(db.events).length > 0){
        if (name in db.events){
            let evt = db.events[name];
            evt.name = name;
            return evt;
        }
    }
}

export const getEvents = (parent) => {
    let db = new DataStore();
    let evts = [];

    if (parent.eventIDs.size > 0)
    {    
        for (const name of parent.eventIDs){
            if (name in db.events){
                let evt = db.events[name];
                evt.name = name;
                evts.push(evt);
            }
        }
    }
    return evts;
}
