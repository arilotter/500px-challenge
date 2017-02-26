# 500px Coding Challenge

This app pulls popular photos from the 500px api and provides a way to browse them.
The backend is built with node.js & express, and the frontend is built with React

## Setup
```
$ yarn
$ cd client
$ yarn
```

## Running
To start the development server, run `$ yarn start`. This will open a browser window to the client, and spawn the server in the background.

## Backend API
All API calls should be made to the ```/api``` endpoint.

Popular posts can be fetched with a GET request to ```/api/popular/<page>/<thumbSize>```.

`thumbSize` should be an integer representing one of the sizes from the [500px image URLs and sizes documentation](https://github.com/500px/api-documentation/blob/master/basics/formats_and_terms.md#image-urls-and-image-sizes).

A call to the `/api/popular` endpoint will return a JSON object of the form:
```
{
  page: 2,
  photos: [
    {
      id: 12345678,
      title: "A nice photo",
      fullname: "Anice Name",
      thumbnailUrl: "https://example.com/thumbnail.jpg",
      photoUrl: "https://example.com/large.jpg",
      thumbWidth: 640,
      thumbHeight: 480
    }
  ]
}
```

## Development challenges & decisions
Currently, the 500px API provides no way to request an image with a specific width.
This makes sense for the use case on 500px.com, where images are tiled with static heights.
However, in this application, I tile images with fixed widths, so some portrait images are much lower resolution than the equivalent landscape images.

