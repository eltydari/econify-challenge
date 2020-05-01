describe('Updating a location', () => {
    const queries = require('../../src/resolvers/queries');
    const mutators = require('../../src/resolvers/mutators');
    const DataStore = require('../../src/db');
    const apiRequests = require('../../src/utils/apiRequests');
    const sleep = require('../../src/utils/sleep');

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
    };

    beforeEach(() => {
        const db = new DataStore();
        db.reset();
        spyOn(apiRequests, "getLocationFromGoogle").and.returnValue(fakeLocDetails);
        mutators.addLocation(undefined, originalArgs);
    });    

    it('with no particular updates should change updated time', () => {
        let args = { name: 'location1' };
        sleep(1);

        let response = mutators.updateLocation(undefined, args);
        expect(response.updatedAt).not.toBe(response.createdAt);

        let childResponse = queries.getOrganization(response);
        expect(childResponse.updatedAt).toBe(childResponse.createdAt);
    });

    it('with new location should pass', () => {
        let args = { 
            name: 'location1',
            address: 'new' 
        };
        const newFakeLocDetails = {
            formatted_address: '456 Main Street, New York, NY 11920, USA',
            geometry: {
                location: {
                    lat: 111.11,
                    lng: 222.22
                }
            }
        };
        apiRequests.getLocationFromGoogle.and.returnValue(newFakeLocDetails);
        
        let response = mutators.updateLocation(undefined, args);
        expect(response.name).toBe(originalArgs.name);
        expect(response.address).not.toBe(fakeLocDetails.formatted_address);
        expect(response.latitude).not.toBe(fakeLocDetails.geometry.location.lat);
        expect(response.longitude).not.toBe(fakeLocDetails.geometry.location.lng);
        expect(response.organization).toBe(originalArgs.organization)
    });

    it('with new organization should pass', () => {
        let args = {
            name: 'location1',
            organization: 'DEF'
        };
        let response = mutators.updateLocation(undefined, args);
        expect(response.name).toBe(originalArgs.name);
        expect(response.address).toBe(fakeLocDetails.formatted_address);
        expect(response.latitude).toBe(fakeLocDetails.geometry.location.lat);
        expect(response.longitude).toBe(fakeLocDetails.geometry.location.lng);
        expect(response.organization).not.toBe(originalArgs.organization)
        expect(queries.getOrganization(originalArgs)).toBeUndefined();
        expect(queries.getOrganization(response)).toBeDefined();
    });

    it('that does not exist should fail', () => {
        let args = {
            name: 'location2',
        };
        expect( () => { mutators.updateLocation(undefined, args); } ).toThrow(
            `Cannot update location "${args.name}" because it doesn't exist.`
        );
    });
});