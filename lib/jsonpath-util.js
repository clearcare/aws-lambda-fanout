var jp = require('jsonpath');

function jsonPathTest(record, target, errors) {
    try {
        console.log(record.data)
        const eventData = JSON.parse(record.data.toString());
        // makes JsonPath filters easier to comprehend
        // Exampe:  $..event[?(@.topic=="hello.world")]
        const eventWrapper = {
            "event": [eventData]
        };
        return jp.query(eventWrapper, target.jsonpath).length !== 0;
    } catch (e) {
        errors.push(new Error("Record does not contain JSON serializable data: \n\n" + record.data));
        return false;
    }
}

exports.jsonPathTest = jsonPathTest;