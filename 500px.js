const fetch = require('node-fetch');
const querystring = require('querystring');
const { consumerKey } = require('./config.json');
const imageSizes = require('./sizes.json');

const baseUrl = 'https://api.500px.com/v1/';
const THUMBNAIL_TYPE = 30;

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
      const { id, name, user, images, width, height } = photo;
      const { fullname } = user;
      const getImageUrl = (size) => images.filter(image => image.size === size)[0].https_url;
      const thumbnailUrl = getImageUrl(THUMBNAIL_TYPE);
      const photoUrl = getImageUrl(1080);
      const thumbDimensions = JSON.parse(JSON.stringify(imageSizes[THUMBNAIL_TYPE])); // clone the object so we can set properties on it
      if (typeof thumbDimensions === "undefined") {
        return reject('Invalid thumbnail type given');
      }

      if (thumbDimensions.longest) {
        // Set the longest dimension of the photo to the size value from the 500px api.
        thumbDimensions[width > height ? 'width' : 'height'] = thumbDimensions.longest;
      }

      // To calculate the width / height of the thumbnails, preserve aspect ratio:
      // thumbnailWidth / thumbnailHeight = photoWidth / photoHeight
      // Therefore, knowing the length of one edge of the thumbnail
      // and knowing the width and height of the original photo,
      // we can calculate the second dimension of the thumbnail given one of them.
      const thumbWidth = thumbDimensions.width || Math.round(width / height * thumbDimensions.height);
      const thumbHeight = thumbDimensions.height || Math.round(height / width * thumbDimensions.width);

      return {
        id,
        fullname,
        thumbnailUrl,
        photoUrl,
        thumbWidth,
        thumbHeight,
        title: name
      };
    });
    return resolve({ page: current_page, photos: shortPhotos });
  });
}

// Gets popular photos, returns a promise
function popular (page) {
  const params = {
    feature: 'popular',
    image_size: `${THUMBNAIL_TYPE}, 1080`, // get both a thumbnail and full size image
    page: page || 0 // Begin loading at the first page if a page parameter isn't passed
  };
  return queryAPI('photos', params).then(parsePhotos);
}

module.exports = {
  popular
};
