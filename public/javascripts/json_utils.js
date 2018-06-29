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

function decodeJSON (obj) {
    obj = decodeURI(obj);
    return tryParseJSON(obj);
};