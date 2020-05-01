describe('Querying an event', () => {
    const EasyGraphQLTester = require('easygraphql-tester');
    const schema = require('../../src/schema');

    let tester;

    beforeEach(function() {
        tester = new EasyGraphQLTester(schema);
    });

    it('with valid query should pass', () => {
        tester.test(true, `
            {
                event (name: "event1"){
                    name,
                    date,
                    time,
                    am,
                    organization{
                        name
                    }
                    description
                }
            }
        `);
    });

    it('with no argument should fail', () => {
        tester.test(false, `
            {
                event {
                    name,
                    date,
                    time,
                    am,
                    organization{
                        name
                    }
                    description
                }
            }
        `);
    });

    it('with extra query values should fail', () => {
        tester.test(false, `
            {
                event (name: "event1"){
                    name,
                    date,
                    time,
                    am,
                    extra,
                    organization{
                        name
                    }
                    description
                }
            }
        `);
    });

    it('with wrong org query should fail', () => {
        tester.test(false, `
            {
                event (name: "event1"){
                    name,
                    date,
                    time,
                    am,
                    organization,
                    description
                }
            }
        `);
    });
});