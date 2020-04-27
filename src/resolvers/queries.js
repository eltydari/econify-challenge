import {
    organizations,
    events,
    locations
} from '../db-temp/dataStore.js';

export const getOrganization = (parent, args) => {
    let name = '';
    if (parent)
        name = parent.name;
    else
        name = args.name;

    if (name in organizations){
        let org = organizations[name];
        org.name = name;
        return org;
    }
}

export const getLocation = (parent, args) => {
    let name = args.name;

    if (locations.keys.length > 0){
        if (name in locations){
            let loc = locations[name];
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
                let loc = locations[name]
                loc.name = name;
                locs.push(loc);
            }
        });
    }
    return locs;
}

export const getEvent = (parent, args) => {
    let name = args.name;

    if (events.keys.length > 0){
        if (name in events){
            let evt = events[name];
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
                let evt = events[name]
                evt.name = name;
                evts.push(evt);
            }
        });
    }
    return evts;
}
