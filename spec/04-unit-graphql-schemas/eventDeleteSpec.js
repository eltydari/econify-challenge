describe('Deleting an event', () => {
    const EasyGraphQLTester = require('easygraphql-tester');
    const schema = require('../../src/schema');

    let tester;

    beforeEach(function() {
        tester = new EasyGraphQLTester(schema);
    });
    
    it('with valid mutation should pass', () => {
        const deleteTemplate = `
            mutation DeleteEvent($name: String!){
                deleteEvent(name:$name){
                    name,
                    date,
                    time,
                    am,
                    organization{
                        name
                    }
                    description,
                    createdAt,
                    updatedAt
                }
            }
        `
        tester.test(true, deleteTemplate, {
            name: 'event1'
        });
    });
    
    it('with wrong arg should fail', () => {
        const deleteTemplate = `
            mutation DeleteEvent($wrong: String!){
                deleteEvent(wrong:$wrong){
                    name
                }
            }
        `
        tester.test(false, deleteTemplate, {
            wrong: 'wrong'
        });
    });
});