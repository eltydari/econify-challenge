const { copy } = require('./utils/copy');

class DataStore {

    constructor() {
        if (DataStore.instance) {
            return DataStore.instance;
        }

        this.reset();

        DataStore.instance = this;
    }

    get locations() {
        return copy(this._locations);
    }

    get events() {
        return copy(this._events);
    }

    get organizations() {
        return copy(this._organizations);
    }

    reset(){
        this._locations = {};
        this._events = {};
        this._organizations = {};
    }

    addEvent(name, orgName, date, time, am, desc){
        let isoNow = new Date().toISOString();

        if (!this._validateEventAdd(name, orgName))
            return false;
        this._registerEvent(name, orgName);
        this._events[name] = {
            "organization": orgName,
            "date": date,
            "time": time,
            "am": am,
            "description": desc,
            "createdAt": isoNow,
            "updatedAt": isoNow
        }

        return true;
    }

    updateEvent(name, orgName, date, time, am, desc){
        if (!(name in this._events))
            return false;

        let event = this._events[name];
        event.name = name || event.name;
        event.date = date || event.date;
        event.time = time || event.time;
        event.am = am || event.am;
        event.updatedAt = new Date().toISOString();

        if (desc === '')
            event.description = desc;
        else
            event.description = desc || event.description;

        if (orgName && orgName !== event.organization){
            this._deregisterEvent(name, event.organization);
            this._registerEvent(name, orgName);
            event.organization = orgName;
        }

        return true;
    }

    deleteEvent(name){
        if (!(name in this._events))
            return false;

        let orgName = this._events[name].organization;
        this._deregisterEvent(name, orgName);
        delete this._events[name];

        return true;
    }

    addLocation(name, orgName, address, latitude, longitude){
        let isoNow = new Date().toISOString();

        if (!this._validateLocationAdd(name, orgName))
            return false;
        this._registerLocation(name, orgName);
        this._locations[name] = {
            "organization": orgName,
            "address": address,
            "latitude": latitude,
            "longitude": longitude,
            "createdAt": isoNow,
            "updatedAt": isoNow
        }

        return true;
    }

    updateLocation(name, orgName, address, latitude, longitude){
        if (!(name in this._locations))
            return false;

        let location = this._locations[name];
        location.name = name || location.name;
        location.address = address || location.address;
        location.latitude = latitude || location.latitude;
        location.longitude = longitude || location.longitude;
        location.updatedAt = new Date().toISOString();

        if (orgName && orgName !== location.organization){
            this._deregisterLocation(name, location.organization);
            this._registerLocation(name, orgName);
            location.organization = orgName;
        }

        return true;
    }

    deleteLocation(name){
        if (!(name in this._locations))
            return false;

        let orgName = this._locations[name].organization;
        this._deregisterLocation(name, orgName);
        delete this._locations[name];

        return true;
    }

    _validateEventAdd(name, orgName){
        if (name in this._events)
            return false;
        if (!(orgName in this._organizations))
            return true;
        for (const org of Object.values(this._organizations)){
            const eventRegistrar = org.eventIDs;
            if (eventRegistrar.has(name))
                return false;
        }
        return true;
    }

    _validateLocationAdd(name, orgName){
        if (name in this._locations)
            return false;
        if (!(orgName in this._organizations))
            return true;
        for (const org of Object.values(this._organizations)){
            const locationRegistrar = org.locationIDs;
            if (locationRegistrar.has(name))
                return false;
        }
        return true;
    }

    _registerEvent(name, orgName){
        this._addOrgIfMissing(orgName);
        let org = this._organizations[orgName]

        org.eventIDs.add(name);
        org.updatedAt = new Date().toISOString();
    }

    _deregisterEvent(name, orgName){
        if (orgName in this._organizations){
            let isoNow = new Date().toISOString();
            let org = this._organizations[orgName]

            if (org.eventIDs.delete(name)){
                org.updatedAt = new Date().toISOString();
                this._checkOrgReferences(orgName);
            }
        }
    }

    _registerLocation(name, orgName){
        this._addOrgIfMissing(orgName);
        let org = this._organizations[orgName];

        org.locationIDs.add(name);
        org.updatedAt = new Date().toISOString();
    }

    _deregisterLocation(name, orgName){
        if (orgName in this._organizations){
            let isoNow = new Date().toISOString();
            let org = this._organizations[orgName];

            if (org.locationIDs.delete(name)){
                org.updatedAt = new Date().toISOString();
                this._checkOrgReferences(orgName);
            }
        }
    }

    _addOrgIfMissing(name){
        if (!(name in this._organizations)){
            let isoNow = new Date().toISOString();
            this._organizations[name] = {
                "locationIDs": new Set(),
                "eventIDs": new Set(),
                "createdAt": isoNow,
                "updatedAt": isoNow
            };
        }
    }

    _checkOrgReferences(name){
        if (name in this._organizations){
            let org = this._organizations[name];
            if (org.eventIDs.size <= 0 && org.locationIDs.size <= 0)
                delete this._organizations[name];
        }
    }
}

module.exports = DataStore;
