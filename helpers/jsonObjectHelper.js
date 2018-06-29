function tryParseJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }
    return null;
}


function encodeJSON (obj) {
    obj = JSON.stringify(obj);
    return encodeURI(obj);
};

function decodeJSON (obj) {
    obj = decodeURI(obj);
    return tryParseJSON(obj);
};

module.exports = {
    safeJSONParse: tryParseJSON,
    encodeJSON: encodeJSON,
    decodeJSON: decodeJSON
}

