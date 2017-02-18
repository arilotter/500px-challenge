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
  return new Promise((resolve, reject) => {
    const { error, current_page } = json;
    if (error) {
      return reject(error);
    }
    const shortPhotos = json.photos.map(photo => {
      // Not every property needs to be sent to the client, so only keep what's needed.
      const { id, name, user, images } = photo;
      const { fullname } = user;
      const getImageUrl = (size) => images.filter(image => image.size === size)[0].https_url;
      const thumbnailUrl = getImageUrl(30);
      const photoUrl = getImageUrl(1080);
      return { id, title: name, fullname, thumbnailUrl, photoUrl };
    });
    return resolve({ page: current_page, photos: shortPhotos });
  });
}

// Gets popular photos, returns a promise
function popular (page) {
  const params = {
    feature: 'popular',
    image_size: '30, 1080', // get both a thumbnail and full size image
    page: page || 0 // Begin loading at the first page if a page parameter isn't passed
  };
  return queryAPI('photos', params).then(parsePhotos);
}

module.exports = {
  popular
};
