const DataStore = require('../db');
const apiRequests = require('../utils/apiRequests');
const { validateDate, validateTime } = require('../utils/validation');

const mutators = {
    addEvent : (parent, args) => {
        let db = new DataStore();
        let name = args.name;
        let date = args.date;
        if (!validateDate(date))
            throw `Cannot add event "${name}": date ${date} does not have valid format YYYY-MM-DD`;
        let time = args.time;
        if (!validateTime(time))
            throw `Cannot add event "${name}": time ${time} does not have valid format hh:mm`;
        let am = args.am;
        let org = args.organization;
        let desc = args.description;

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
        if (date && !validateDate(date))
            throw `Cannot update event "${name}": date ${date} does not have valid format YYYY-MM-DD`;
        let time = args.time;
        if (time && !validateTime(time))
            throw `Cannot update event "${name}": time ${time} does not have valid format hh:mm`;
        let am = args.am;
        let org = args.organization;
        let desc = args.description;

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

        let locDetails = apiRequests.getLocationFromGoogle(address);
        if (!locDetails)
            throw `Cannot add location "${name}" because address is invalid.`;
        address = locDetails.formatted_address;
        let latitude = locDetails.geometry.location.lat;
        let longitude = locDetails.geometry.location.lng;

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
            let locDetails = apiRequests.getLocationFromGoogle(address);
            if (!locDetails)
                throw `Cannot add location "${name}" because address is invalid.`;
            address = locDetails.formatted_address;
            latitude = locDetails.geometry.location.lat;
            longitude = locDetails.geometry.location.lng;
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
