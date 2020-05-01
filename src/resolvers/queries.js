const DataStore = require('../db.js');

const queries = {
    getOrganization : (parent, args) => {
        let db = new DataStore();
        let name;
        if (parent)
            name = parent.organization;
        else
            name = args.name;

        if (name in db.organizations){
            let org = db.organizations[name];
            org.name = name;
            return org;
        }
    },

    getLocation : (parent, args) => {
        let db = new DataStore();
        let name = args.name;

        if (Object.keys(db.locations).length > 0){
            if (name in db.locations){
                let loc = db.locations[name];
                loc.name = name;
                return loc;
            }
        }
    },

    getLocations : (parent) => {
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
    },

    getEvent : (parent, args) => {
        let db = new DataStore();
        let name = args.name;

        if (Object.keys(db.events).length > 0){
            if (name in db.events){
                let evt = db.events[name];
                evt.name = name;
                return evt;
            }
        }
    },

    getEvents : (parent) => {
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
};

module.exports = queries;
