describe('Deleting a location', () => {
    const EasyGraphQLTester = require('easygraphql-tester');
    const schema = require('../../src/schema');

    let tester;

    beforeEach(function() {
        tester = new EasyGraphQLTester(schema);
    });
    
    it('with valid mutation should pass', () => {
        const deleteTemplate = `
            mutation DeleteLocation($name: String!){
                deleteLocation(name:$name){
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
        tester.test(true, deleteTemplate, {
            name: 'location1'
        });
    });
    
    it('with wrong arg should fail', () => {
        const deleteTemplate = `
            mutation DeleteLocation($wrong: String!){
                deleteLocation(wrong:$wrong){
                    name
                }
            }
        `
        tester.test(false, deleteTemplate, {
            wrong: 'wrong'
        });
    });
});