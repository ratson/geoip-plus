# geoip-plus

Maxmind GeoIP2 database API for geolocating ip addresses.

Fast native implementation by wrapping libmaxminddb to read MaxMind's GeoIP2 mmdb databases.

For ease of use, this module includes the GeoLite2 database created by MaxMind, available from http://www.maxmind.com.  To get more accurate results, this module can also be used with the GeoIP2 database sold by MaxMind.

## Installation

`npm install --save geoip-plus`

Will compile libmaxminddb and node bindings on install.  Currently only tested on Linux (x64) and OS X (x64) running Nodejs 0.12.x or Nodejs 4.x.  To add support for more platforms, the config header files need to be generated on the platform from libmaxminddb.

## Usage

Lookup an ip address:
```js
var geoip = require('geoip-plus');
geoip.init();
geoip.lookupSimple("67.183.57.64", function(error, result) {
  if (error) {
    console.log("Error: %s", error);
  }
  else if (result) {
    console.log(result);
  }
});
```
Produces:
```js
{
  country: 'US',
  continent: 'NA',
  postal: '98275',
  city: 'Mukilteo',
  location: {
    latitude: 47.9445,
    longitude: -122.3046,
    metro_code: 819,
    time_zone: 'America/Los_Angeles'
  },
  subdivision: 'WA'
}
```

You can also lookup the full data record for the address using the `lookup()` method instead.

To initialize geoip2 with a different database, pass in the file path to the `init()` method:
```js
geoip.init('/path/to/GeoIp2-City.mmdb');
```

## API
**geoip.init(filePath)**  
Initializes the default database to the specified file.

**geoip.cleanup()**  
Cleans up the default database.  Shouldn't be called unless you are done looking up addresses.

**geoip.lookup(address, callback)**  
Looks up the full data record for an address *asynchronously*.
For documentation on the result object returned see: http://dev.maxmind.com/geoip/geoip2/web-services/.

**geoip.lookupSync(address)**  
Looks up the full data record for an address *synchronously*.

**geoip.lookupSimple(address, callback)**  
Looks up the simple data record for an address *asynchronously*.

**geoip.lookupSimpleSync(address)**  
Looks up the simple data record for an address *synchronously*.

**geoip.MMDB**  
Underlying class to create different instances of the DB.  Only needed for advanced usage.

*libmaxminddb* might be fast enough that the asynchronous API's are unneccessary.  Would be interested to know if anyone has stats for this at very high volume.
