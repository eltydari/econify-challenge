describe('Adding an event', () => {
    const mutators = require('../../src/resolvers/mutators');
    const DataStore = require('../../src/db');

    beforeEach(() => {
        const db = new DataStore();
        db.reset();
    });

    it('with valid mutation should pass', () => {
        let args = {
            name: 'event1',
            date: '2020-02-10',
            time: '12:30',
            am: false,
            organization: 'ABC',
            description: 'event1 should be fun'
        }
        let response = mutators.addEvent(undefined, args);
        expect(response.name).toBe(args.name);
        expect(response.date).toBe(args.date);
        expect(response.time).toBe(args.time);
        expect(response.am).toBe(args.am);
        expect(response.organization).toBe(args.organization);
        expect(response.description).toBe(args.description);
        expect(response.createdAt).toBeDefined();
        expect(response.createdAt).toBe(response.updatedAt);
    });
    it('with missing description should pass', () => {
        let args = {
            name: 'event1',
            date: '2020-02-10',
            time: '12:30',
            am: false,
            organization: 'ABC'
        }
        let response = mutators.addEvent(undefined, args);
        expect(response.name).toBe(args.name);
        expect(response.date).toBe(args.date);
        expect(response.time).toBe(args.time);
        expect(response.am).toBe(args.am);
        expect(response.organization).toBe(args.organization);
        expect(response.description).toBeUndefined();
        expect(response.createdAt).toBeDefined();
        expect(response.createdAt).toBe(response.updatedAt);
    });

    it('with invalid date should fail', () => {
        let args = {
            name: 'event1',
            date: '2020-32-10',
            time: '12:30',
            am: false,
            organization: 'ABC',
            description: 'event1 should be fun'
        }
        expect( () => { mutators.addEvent(undefined, args); } ).toThrow(
            `Cannot add event "${args.name}": date ${args.date} does not have valid format YYYY-MM-DD`
        );
    });

    it('with invalid time should fail', () => {
        let args = {
            name: 'event1',
            date: '2020-02-10',
            time: '24:30',
            am: false,
            organization: 'ABC',
            description: 'event1 should be fun'
        }
        expect( () => { mutators.addEvent(undefined, args); } ).toThrow(
            `Cannot add event "${args.name}": time ${args.time} does not have valid format hh:mm`
        );
    });

    it('twice should fail', () => {
        let args = {
            name: 'event1',
            date: '2020-02-10',
            time: '12:30',
            am: false,
            organization: 'ABC',
            description: 'event1 should be fun'
        }
        mutators.addEvent(undefined, args);
        expect( () => { mutators.addEvent(undefined, args); } ).toThrow(
            `Cannot add event "${args.name}" because it already exists.`
        );
    });
});