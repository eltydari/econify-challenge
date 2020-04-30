const DataStore = require('../db');
const { getGeometryFromGoogle } = require('../utils/apiRequests');

const mutators = {
    addEvent : (parent, args) => {
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
    },

    updateEvent : (parent, args) => {
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
    },

    deleteEvent : (parent, args) => {
        let db = new DataStore();
        let name = args.name;

        if (!(name in db.events))
            throw `Cannot delete event "${name}" because it doesn't exist.`;

        let response = db.events[name];
        response.name = name;
        db.deleteEvent(name);
        return response;
    },

    addLocation : (parent, args) => {
        let db = new DataStore();
        let name = args.name;
        let address = args.address;
        let org = args.organization;

        let locGeometry = getGeometryFromGoogle(address);
        if (!locGeometry)
            throw `Cannot add location "${name}" because address is invalid.`;
        let latitude = locGeometry.lat;
        let longitude = locGeometry.lng;

        if (!(db.addLocation(name, org, address, latitude, longitude)))
            throw `Cannot add location "${name}" because it already exists.`;

        let response = db.locations[name];
        response.name = name;
        return response;
    },

    updateLocation : (parent, args) => {
        let db = new DataStore();
        let name = args.name;
        let address = args.address;
        let org = args.organization;
        let latitude;
        let longitude;

        if (address){
            let locGeometry = getGeometryFromGoogle(address);
            if (!locGeometry)
                throw `Cannot update location "${name}" because address is invalid.`;
            latitude = locGeometry.lat;
            longitude = locGeometry.lng;
        }

        if (!(db.updateLocation(name, org, address, latitude, longitude)))
            throw `Cannot update location "${name}" because it doesn't exist.`;

        let response = db.locations[name];
        response.name = name;
        return response;
    },

    deleteLocation : (parent, args) => {
        let db = new DataStore();
        let name = args.name;

        if (!(name in db.locations))
            throw `Cannot delete location "${name}" because it doesn't exist.`;

        let response = db.locations[name];
        response.name = name;
        db.deleteLocation(name);
        return response;
    }
};

module.exports = mutators;
