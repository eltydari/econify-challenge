describe('Adding an event', () => {
    const EasyGraphQLTester = require('easygraphql-tester');
    const schema = require('../../src/schema');

    let tester;

    const addTemplate = `
        mutation AddEvent($name: String!, $date:String!, $time:String!, $am:Boolean!, $org:String!, $desc:String){
            addEvent(name:$name, date:$date, time:$time, am:$am, organization:$org, description:$desc){
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
    `;

    beforeEach(function() {
        tester = new EasyGraphQLTester(schema);
    });

    it('with valid mutation should pass', () => {
        tester.test(true, addTemplate, {
            name: 'event1',
            date: '2020-08-12',
            time: '12:30',
            am: true,
            org: 'org1',
            desc: 'description'
        });
    });

    it('with missing description arg should pass', () => {
        tester.test(true, addTemplate, {
            name: 'event1',
            date: '2020-08-12',
            time: '12:30',
            am: true,
            org: 'org1'
        });
    });

    it('with missing args should fail', () => {
        const missingAddTemplate = `
            mutation AddEvent($name: String!){
                addEvent(name:$name){
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
            mutation AddEvent($name: String!, $date:String!, $time:String!, $am:Boolean!, $org:String!, $extra:String!, $desc:String){
                addEvent(name:$name, date:$date, time:$time, am:$am, organization:$org, extra: $extra, description:$desc){
                    name
                }
            }
        `;
        tester.test(false, extraAddTemplate, {
            name: 'event1',
            date: '2020-08-12',
            time: '12:30',
            am: true,
            org: 'org1',
            extra: 'Iamextra!'
        });
    });
});