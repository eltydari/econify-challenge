describe('Querying an event', () => {
    const queries = require('../../src/resolvers/queries');
    const mutators = require('../../src/resolvers/mutators');
    const DataStore = require('../../src/db');

    const originalArgs = {
        name: 'event1',
        date: '2020-02-10',
        time: '12:30',
        am: false,
        organization: 'ABC',
        description: 'event1 should be fun'
    };

    beforeEach(() => {
        const db = new DataStore();
        db.reset();
        mutators.addEvent(undefined, originalArgs);
    });
    
    it('with valid query should pass', () => {
        let args = { name: 'event1' };

        let response = queries.getEvent(undefined, args);
        expect(response.name).toBe(originalArgs.name);
        expect(response.date).toBe(originalArgs.date);
        expect(response.time).toBe(originalArgs.time);
        expect(response.am).toBe(originalArgs.am);
        expect(response.organization).toBe(originalArgs.organization);
        expect(response.description).toBe(originalArgs.description)
    });

    it('should resolve its organization field properly', () => {
        let args = { name: 'event1' };

        let parent = queries.getEvent(undefined, args);
        let response = queries.getOrganization(parent);

        expect(response.name).toBe(parent.organization);
        expect(response.createdAt).toBe(parent.createdAt);
    });

    it('that does not exist should return nothing', () => {
        let args = { name: 'event2' };

        let response = queries.getEvent(undefined, args);
        expect(response).toBeUndefined();
    });
});