describe('Updating an event', () => {
    const queries = require('../../src/resolvers/queries');
    const mutators = require('../../src/resolvers/mutators');
    const DataStore = require('../../src/db');
    const sleep = require('../../src/utils/sleep');

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

    it('with no particular updates should change updated time', () => {
        let args = { name: 'event1' };
        sleep(1);

        let response = mutators.updateEvent(undefined, args);
        expect(response.updatedAt).not.toBe(response.createdAt);

        let childResponse = queries.getOrganization(response);
        expect(childResponse.updatedAt).toBe(childResponse.createdAt);
    });

    it('with new date should pass', () => {
        let args = {
            name: 'event1',
            date: '2020-02-11'
        };
        let response = mutators.updateEvent(undefined, args);
        expect(response.name).toBe(originalArgs.name);
        expect(response.date).not.toBe(originalArgs.date);
        expect(response.time).toBe(originalArgs.time);
        expect(response.am).toBe(originalArgs.am);
        expect(response.organization).toBe(originalArgs.organization);
        expect(response.description).toBe(originalArgs.description)
    });

    it('with invalid date should fail', () => {
        let args = {
            name: 'event1',
            date: '2020-32-11'
        };
        expect( () => { mutators.updateEvent(undefined, args); } ).toThrow(
            `Cannot update event "${args.name}": date ${args.date} does not have valid format YYYY-MM-DD`
        );
    });

    it('with new time should pass', () => {
        let args = {
            name: 'event1',
            time: '01:30'
        };
        let response = mutators.updateEvent(undefined, args);
        expect(response.name).toBe(originalArgs.name);
        expect(response.date).toBe(originalArgs.date);
        expect(response.time).not.toBe(originalArgs.time);
        expect(response.am).toBe(originalArgs.am);
        expect(response.organization).toBe(originalArgs.organization);
        expect(response.description).toBe(originalArgs.description)
    });

    it('with invalid time should fail', () => {
        let args = {
            name: 'event1',
            time: '24:01'
        };
        expect( () => { mutators.updateEvent(undefined, args); } ).toThrow(
            `Cannot update event "${args.name}": time ${args.time} does not have valid format hh:mm`
        );
    });

    it('with new am should pass', () => {
        let args = {
            name: 'event1',
            am: true
        };
        let response = mutators.updateEvent(undefined, args);
        expect(response.name).toBe(originalArgs.name);
        expect(response.date).toBe(originalArgs.date);
        expect(response.time).toBe(originalArgs.time);
        expect(response.am).not.toBe(originalArgs.am);
        expect(response.organization).toBe(originalArgs.organization);
        expect(response.description).toBe(originalArgs.description)
    });

    it('with new description should pass', () => {
        let args = {
            name: 'event1',
            description: ''
        };
        let response = mutators.updateEvent(undefined, args);
        expect(response.name).toBe(originalArgs.name);
        expect(response.date).toBe(originalArgs.date);
        expect(response.time).toBe(originalArgs.time);
        expect(response.am).toBe(originalArgs.am);
        expect(response.organization).toBe(originalArgs.organization);
        expect(response.description).not.toBe(originalArgs.description)
    });

    it('with new organization should pass', () => {
        let args = {
            name: 'event1',
            organization: 'DEF'
        };
        let response = mutators.updateEvent(undefined, args);
        expect(response.name).toBe(originalArgs.name);
        expect(response.date).toBe(originalArgs.date);
        expect(response.time).toBe(originalArgs.time);
        expect(response.am).toBe(originalArgs.am);
        expect(response.organization).not.toBe(originalArgs.organization);
        expect(response.description).toBe(originalArgs.description)
        expect(queries.getOrganization(originalArgs)).toBeUndefined();
        expect(queries.getOrganization(response)).toBeDefined();
    });

    it('that does not exist should fail', () => {
        let args = {
            name: 'event2',
        };
        expect( () => { mutators.updateEvent(undefined, args); } ).toThrow(
            `Cannot update event "${args.name}" because it doesn't exist.`
        );
    });
});