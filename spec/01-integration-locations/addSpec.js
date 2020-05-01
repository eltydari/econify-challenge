describe('Adding a location', () => {
    const mutators = require('../../src/resolvers/mutators');
    const DataStore = require('../../src/db');
    const apiRequests = require('../../src/utils/apiRequests');

    const fakeLocDetails = {
        formatted_address: '123 Main Street, New York, NY 11920, USA',
        geometry: {
            location: {
                lat: 100.01,
                lng: 200.02
            }
        }
    };
    const args = {
        name: 'location1',
        address: '123 Main Street, New York, NY',
        organization: 'ABC'
    }

    beforeEach(() => {
        const db = new DataStore();
        db.reset();
    });

    it('with valid mutation should pass', () => {
        spyOn(apiRequests, "getLocationFromGoogle").and.returnValue(fakeLocDetails);
        let response = mutators.addLocation(undefined, args);
        expect(response.name).toBe(args.name);
        expect(response.address).toBe(fakeLocDetails.formatted_address);
        expect(response.latitude).toBe(fakeLocDetails.geometry.location.lat);
        expect(response.longitude).toBe(fakeLocDetails.geometry.location.lng);
        expect(response.createdAt).toBeDefined();
        expect(response.createdAt).toBe(response.updatedAt);
    });

    it('with invalid location (address) should fail', () => {
        spyOn(apiRequests, "getLocationFromGoogle").and.returnValue(undefined);
        expect( () => mutators.addLocation(undefined, args) ).toThrow(
            `Cannot add location "${args.name}" because address is invalid.`
        );
    });

    it('twice should fail', () => {
        spyOn(apiRequests, "getLocationFromGoogle").and.returnValue(fakeLocDetails);
        mutators.addLocation(undefined, args);
        expect( () => mutators.addLocation(undefined, args) ).toThrow(
            `Cannot add location "${args.name}" because it already exists.`
        );
    });
});