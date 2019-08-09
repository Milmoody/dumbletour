const mbxClient = require('@mapbox/mapbox-sdk');
const mbxStyles = require('@mapbox/mapbox-sdk/services/styles');
const mbxTilesets = require('@mapbox/mapbox-sdk/services/tilesets');
const accessToken = require("../oauth-config/auth-keys.js");

const baseClient = mbxClient({accessToken});
const stylesService = mbxStyles(baseClient);
const tilesetsService = mbxTilesets(baseClient);

const mapboxController = {};
// Create a style.

  stylesService.createStyle({})
    .send()
    .then(response => {
      const style = response.body;
      // console.log(style);
    }, error => {
      if (error) return console.error('error when creating map styles: ', error);
    });
  
  // List tilesets.
  tilesetsService.listTilesets()
    .send()
    .then(response => {
      if (response.hasNextPage()) {
        const nextPageReq =response.nextPage();
        // console.log(nextPageReq);
      }
    }, error => {})

module.exports = mapboxController;