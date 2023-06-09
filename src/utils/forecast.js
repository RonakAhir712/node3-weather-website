const request = require('request')
const forecast = (address, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=4ea4dfb48f49426995a74919231303&q='+ encodeURIComponent(address)+'&aqi=no'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect with weather service!',undefined)
        } else if (body.error) {
            callback('Unable to find location',undefined)
        } else {
            callback(undefined,"It is currently " + body.current.temp_c + " degrees out." + "There is a " + body.current.precip_in + "% chance of rain.")
        }
    })
}

module.exports = forecast

// const request = require('request')

// const forecast = (latitude, longitude, callback) => {
//     const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

//     request({ url, json: true }, (error, { body }) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
//         }
//     })
// }

// module.exports = forecast