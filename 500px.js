const fetch = require('node-fetch');
const querystring = require('querystring');
const { consumerKey } = require('./config.json');

const baseUrl = 'https://api.500px.com/v1/';

// All API documentation is available at https://github.com/500px/api-documentation/

// Queries the given API endpoint, returns a promise
function queryAPI (method, params) {
  params = params || {};
  params.consumer_key = consumerKey; // All requests require a consumer key
  return fetch(baseUrl + method + '?' + querystring.stringify(params))
    .then(res => res.json());
}

function parsePhotos (json) {
  return new Promise((resolve) => {
    const { current_page } = json;
    const shortPhotos = json.photos.map(photo => {
      // Not every property needs to be sent to the client, so only keep what's needed.
      const { id, name, user } = photo;
      const { fullname } = user;
      return { id, title: name, fullname };
    });
    resolve({ page: current_page, photos: shortPhotos });
  });
}

// Gets popular photos, returns a promise
function popular (page) {
  const params = {
    feature: 'popular',
    page: page || 0 // Begin loading at the first page if a page parameter isn't passed
  };
  return queryAPI('photos', params).then(parsePhotos);
}

module.exports = {
  popular
};
