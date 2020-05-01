describe('Expressing query of an organization', () => {
    const EasyGraphQLTester = require('easygraphql-tester');
    const schema = require('../../src/schema');

    let tester;

    beforeEach(function() {
        tester = new EasyGraphQLTester(schema);
    });
    

    it('with valid query should pass', () => {
        tester.test(true, `
            {
                organization (name: "organization1"){
                    name,
                    locations{
                        name,
                        address,
                        latitude,
                        longitude
                    },
                    events{
                        name,
                        date,
                        time,
                        am,
                        description
                    },
                    createdAt,
                    updatedAt
                }
            }
        `);
    });

    it('with no argument should fail', () => {
        tester.test(false, `
            {
                organization {
                    name,
                    locations{
                        name,
                        address,
                        latitude,
                        longitude
                    },
                    events{
                        name,
                        date,
                        time,
                        am,
                        description
                    },
                    createdAt,
                    updatedAt
                }
            }
        `);
    });

    it('with extra query values should fail', () => {
        tester.test(false, `
            {
                organization (name: "organization1"){
                    name,
                    locations{
                        name,
                        address,
                        latitude,
                        longitude
                    },
                    extra,
                    events{
                        name,
                        date,
                        time,
                        am,
                        description
                    },
                    createdAt,
                    updatedAt
                }
            }
        `);
    });

    it('with wrong locations query should fail', () => {
        tester.test(false, `
            {
                organization (name: "organization1"){
                    name,
                    locations,
                    events{
                        name,
                        date,
                        time,
                        am,
                        description
                    },
                    createdAt,
                    updatedAt
                }
            }
        `);
    });

    it('with wrong events query should fail', () => {
        tester.test(false, `
            {
                organization (name: "organization1"){
                    name,
                    locations{
                        name,
                        address,
                        latitude,
                        longitude
                    },
                    events,
                    createdAt,
                    updatedAt
                }
            }
        `);
    });
});