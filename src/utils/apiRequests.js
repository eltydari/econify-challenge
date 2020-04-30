import request from 'sync-request';

const PLACES_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json';

export const getGeometryFromGoogle = (address) => {
    let apiKey = process.env.KEY;
    let url = PLACES_URL + `?key=${apiKey}&input=${address}&inputtype=textquery&fields=geometry`;

    let resp = request('GET', url);

    if (resp.statusCode === 200){
        let retVal = JSON.parse(resp.getBody('utf8'));
        if (retVal.status === "OK")
            return retVal.candidates[0].geometry.location;
    }
}
