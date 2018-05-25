var jp = require('jsonpath');


function textTransform(record, target) {
    var data = new Buffer(record.kinesis.data, 'base64');
    var size = data.length;
    try {
        data = JSON.parse(data.toString());
        size = JSON.stringify(data).length;
    } catch (e) {
        console.error("Unable to deserialize record, leaving it as raw data");
        data = data;
        size = data.length;
    }
    return { data: data, size: size };
}


function jsonPathTest(record, target, errors) {
    try {
        const eventData = textTransform(record, target);
        // makes JsonPath filters easier to comprehend
        // Exampe:  $..event[?(@.topic=="hello.world")]
        const eventWrapper = {
            "event": [eventData.data]
        };
        return jp.query(eventWrapper, target.jsonpath).length !== 0;
    } catch (e) {
        errors.push(new Error("Record does not contain JSON serializable data: \n\n" + record.data));
        return false;
    }
}

exports.jsonPathTest = jsonPathTest;