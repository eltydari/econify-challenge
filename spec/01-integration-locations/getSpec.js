describe('Querying a location', () => {
    const queries = require('../../src/resolvers/queries');
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
    const originalArgs = {
        name: 'location1',
        address: '123 Main Street, New York, NY',
        organization: 'ABC'
    }

    beforeEach(() => {
        const db = new DataStore();
        db.reset();
        spyOn(apiRequests, "getLocationFromGoogle").and.returnValue(fakeLocDetails);
        mutators.addLocation(undefined, originalArgs);
    });
    
    it('with valid query should pass', () => {
        let args = { name: 'location1' };

        let response = queries.getLocation(undefined, args);
        expect(response.name).toBe(originalArgs.name);
        expect(response.address).toBe(fakeLocDetails.formatted_address);
        expect(response.latitude).toBe(fakeLocDetails.geometry.location.lat);
        expect(response.longitude).toBe(fakeLocDetails.geometry.location.lng);
        expect(response.organization).toBe(originalArgs.organization)
    });

    it('should resolve its organization field properly', () => {
        let args = { name: 'location1' };

        let parent = queries.getLocation(undefined, args);
        let response = queries.getOrganization(parent);

        expect(response.name).toBe(parent.organization);
        expect(response.createdAt).toBe(parent.createdAt);
    });

    it('that does not exist should return nothing', () => {
        let args = { name: 'location2' };

        let response = queries.getLocation(undefined, args);
        expect(response).toBeUndefined();
    });
});