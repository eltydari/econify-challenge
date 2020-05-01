describe('Querying a location', () => {
    const EasyGraphQLTester = require('easygraphql-tester');
    const schema = require('../../src/schema');

    let tester;

    beforeEach(function() {
        tester = new EasyGraphQLTester(schema);
    });
    

    it('with valid query should pass', () => {
        tester.test(true, `
            {
                location (name: "location1"){
                    name,
                    address,
                    latitude,
                    longitude,
                    organization{
                        name
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
                location {
                    name,
                    address,
                    latitude,
                    longitude,
                    organization{
                        name
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
                location (name: "location1"){
                    name,
                    address,
                    latitude,
                    longitude,
                    organization{
                        name
                    },
                    extra,
                    createdAt,
                    updatedAt
                }
            }
        `);
    });

    it('with wrong org query should fail', () => {
        tester.test(false, `
            {
                location (name: "location1"){
                    name,
                    address,
                    latitude,
                    longitude,
                    organization,
                    createdAt,
                    updatedAt
                }
            }
        `);
    });
});