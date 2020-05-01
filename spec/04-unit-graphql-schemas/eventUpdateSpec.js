describe('Expressing update of an event', () => {
    const EasyGraphQLTester = require('easygraphql-tester');
    const schema = require('../../src/schema');

    let tester;

    beforeEach(function() {
        tester = new EasyGraphQLTester(schema);
    });

    const updateTemplate = `
        mutation UpdateEvent($name: String!, $date: String, $time: String, $am: Boolean, $org: String, $desc: String){
            updateEvent(name: $name, date: $date, time: $time, am: $am, organization: $org, description: $desc){
                name,
                date,
                time,
                am,
                organization{
                    name
                },
                description,
                createdAt,
                updatedAt
            }
        }
    `;
    
    it('with valid mutation should pass', () => {
        tester.test(true, updateTemplate, {
            name: 'event1',
            date: '2020-12-08',
            time: '01:09',
            am: true,
            organization: 'org2',
            description: 'newDesc'
        });
    });
    
    it('with only name arg should pass', () => {
        tester.test(true, updateTemplate, {
            name: 'event1',
        });
    });
    
    it('with name and date arg should pass', () => {
        tester.test(true, updateTemplate, {
            name: 'event1',
            date: '2020-12-08'
        });
    });
    
    it('with name and time arg should pass', () => {
        tester.test(true, updateTemplate, {
            name: 'event1',
            time: '01:09',
        });
    });
    
    it('with name and am arg should pass', () => {
        tester.test(true, updateTemplate, {
            name: 'event1',
            am: true,
        });
    });

    it('with name and organization arg should pass', () => {
        tester.test(true, updateTemplate, {
            name: 'event1',
            organization: 'org2',
        });
    });

    it('with name and description arg should pass', () => {
        tester.test(true, updateTemplate, {
            name: 'event1',
            description: 'newDesc'
        });
    });

    it('with all other args should fail', () => {

        const updateTemplateExtraField = `
            mutation UpdateEvent($name: String!, $date:String, $time:String, $am:Boolean, $org:String, $extra:String, $desc:String){
                updateEvent(name:$name, date:$date, time:$time, am:$am, organization:$org, extra: $extra, description:$desc){
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