describe('Updating a location', () => {
    const EasyGraphQLTester = require('easygraphql-tester');
    const schema = require('../../src/schema');

    let tester;

    beforeEach(function() {
        tester = new EasyGraphQLTester(schema);
    });
    
    const updateTemplate = `
        mutation UpdateLocation($name: String!, $addr: String, $org: String){
            updateLocation(name: $name, address: $addr, organization: $org){
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

    it('with valid mutation should pass', () => {
        tester.test(true, updateTemplate, {
            name: 'location1',
            addr: '234 Wall St, New York, NY 11034',
            org: 'org2'
        });
    });
    
    it('with only name arg should pass', () => {
        tester.test(true, updateTemplate, {
            name: 'location1',
        });
    });
    
    it('with name and address arg should pass', () => {
        tester.test(true, updateTemplate, {
            name: 'event1',
            addr: '2020-12-08'
        });
    });

    it('with name and organization arg should pass', () => {
        tester.test(true, updateTemplate, {
            name: 'event1',
            organization: 'org2',
        });
    });

    it('with all other args should fail', () => {

        const updateTemplateExtraField = `
            mutation UpdateLocation($name: String!,  $addr: String, $org: String, $extra:String){
                updateLocation(name:$name, address: $addr, organization: $org, extra: $extra){
                    name,
                }
            }
        `
        tester.test(false, updateTemplateExtraField, {
            name: 'event1',
            extra: 'extra'
        });
    });
});