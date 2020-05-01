describe('Getting an organization', () => {
    const queries = require('../../src/resolvers/queries');
    const mutators = require('../../src/resolvers/mutators');
    const DataStore = require('../../src/db');
    const apiRequests = require('../../src/utils/apiRequests');
    const { copy } = require('../../src/utils/copy');

    const locationArgs = {
        name: 'location1',
        address: '123 Main Street, New York, NY',
        organization: 'ABC'
    };
    const eventArgs = {
        name: 'event1',
        date: '2020-02-10',
        time: '12:30',
        am: false,
        organization: 'ABC',
        description: 'event1 should be fun'
    };
    const fakeLocDetails = {
        formatted_address: '123 Main Street, New York, NY 11920, USA',
        geometry: {
            location: {
                lat: 100.01,
                lng: 200.02
            }
        }
    };

    beforeEach(() => {
        const db = new DataStore();
        db.reset();
        spyOn(apiRequests, "getLocationFromGoogle").and.returnValue(fakeLocDetails);
    });

    it('after inserting an event should only resolve event', () => {
        mutators.addEvent(undefined, eventArgs);
        let args = { name: 'ABC' };
        let parent = queries.getOrganization(undefined, args);
        let eventResponse = queries.getEvents(parent);
        let locationResponse = queries.getLocations(parent);
        expect(eventResponse.length).toBe(1);
        expect(locationResponse.length).toBe(0);
    });

    it('after inserting multiple events should resolve multiple event entries', () => {
        let argCopy = copy(eventArgs);
        mutators.addEvent(undefined, eventArgs);
        argCopy.name = 'event2';
        mutators.addEvent(undefined, argCopy);
        argCopy.name = 'event3';
        mutators.addEvent(undefined, argCopy);

        let args = { name: 'ABC' };
        let parent = queries.getOrganization(undefined, args);
        let eventResponse = queries.getEvents(parent);
        let locationResponse = queries.getLocations(parent);
        expect(eventResponse.length).toBe(3);
        expect(locationResponse.length).toBe(0);
    });

    it('after inserting a location should only resolve event', () => {
        mutators.addLocation(undefined, locationArgs);
        let parent = queries.getOrganization(undefined, { name: 'ABC' } );
        let eventResponse = queries.getEvents(parent);
        let locationResponse = queries.getLocations(parent);
        expect(eventResponse.length).toBe(0);
        expect(locationResponse.length).toBe(1);
    });

    it('after inserting multiple locations should resolve multiple location entries', () => {
        let argCopy = copy(locationArgs);
        mutators.addLocation(undefined, eventArgs);
        argCopy.name = 'location2';
        mutators.addLocation(undefined, argCopy);
        argCopy.name = 'location3';
        mutators.addLocation(undefined, argCopy);

        let args = { name: 'ABC' };
        let parent = queries.getOrganization(undefined, args);
        let eventResponse = queries.getEvents(parent);
        let locationResponse = queries.getLocations(parent);
        expect(eventResponse.length).toBe(0);
        expect(locationResponse.length).toBe(3);
    });

    it('after inserting both locations and events should resolve both', () => {
        mutators.addLocation(undefined, locationArgs);
        mutators.addEvent(undefined, eventArgs);
        let parent = queries.getOrganization(undefined, { name: 'ABC' } );
        let eventResponse = queries.getEvents(parent);
        let locationResponse = queries.getLocations(parent);
        expect(eventResponse.length).toBe(1);
        expect(locationResponse.length).toBe(1);
    });

    it('after inserting and deleting a location should result in nothing', () => {
        mutators.addLocation(undefined, locationArgs);
        mutators.deleteLocation(undefined, { name: 'location1' } );
        let response = queries.getOrganization(undefined, { name: 'ABC' } );
        expect(response).toBeUndefined();
    });

    it('after inserting and deleting an event should result in nothing', () => {
        mutators.addEvent(undefined, eventArgs);
        mutators.deleteEvent(undefined, { name: 'event1' } );
        let response = queries.getOrganization(undefined, { name: 'ABC' } );
        expect(response).toBeUndefined();
    });

    it('after inserting and deleting an both should result in nothing', () => {
        mutators.addEvent(undefined, eventArgs);
        mutators.addLocation(undefined, locationArgs);
        mutators.deleteEvent(undefined, { name: 'event1' } );
        mutators.deleteLocation(undefined, { name: 'location1' } );
        let response = queries.getOrganization(undefined, { name: 'ABC' } );
        expect(response).toBeUndefined();
    });
});