describe('Adding a location', () => {
    const EasyGraphQLTester = require('easygraphql-tester');
    const schema = require('../../src/schema');

    let tester;

    const addTemplate = `
        mutation AddLocation($name: String!, $addr:String!, $org:String!){
            addLocation(name:$name, address: $addr, organization:$org){
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
    `;

    beforeEach(function() {
        tester = new EasyGraphQLTester(schema);
    });

    it('with valid mutation should pass', () => {
        tester.test(true, addTemplate, {
            name: 'location1',
            addr: '123 Main St, New York, NY 11038',
            org: 'org1'
        });
    });

    it('with missing args should fail', () => {
        const missingAddTemplate = `
            mutation AddLocation($name: String!){
                addLocation(name:$name){
                    name
                }
            }
        `;
        tester.test(false, missingAddTemplate, {
            name: 'event1'
        });
    });

    it('with extra args should fail', () => {
        const extraAddTemplate = `
            mutation AddLocation($name: String!, $address:String!, $org:String!, $extra:String){
                addLocation(name:$name, address:$address, organization:$org, extra:$extra){
                    name
                }
            }
        `;
        tester.test(false, extraAddTemplate, {
            name: 'location1',
            addr: '123 Main St, New York, NY 11038',
            org: 'org1',
            extra: 'Iamextra!'
        });
    });
});