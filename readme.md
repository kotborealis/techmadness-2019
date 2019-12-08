# Techmadness 2019

Live demo at [https://techmadness.awooo.ru/](https://techmadness.awooo.ru/)

## Development

* Install deps: `npm i`
* Check API url in `./mock-api/mock-api.js`
* Run webpack-dev-server: `npm run start`

## Production

* Check api url in `./frontend.conf`
* Run `docker-compose up`
    * If you don't have docker, 
    you can build frontend via `npm run build` and copy 
    contents of `./build` directory into your webserver root