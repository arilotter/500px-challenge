## 500px Coding Challenge
This app pulls popular photos from the 500px api and provides a way to browse them.
It's built in node.js & React.

## Setup
Run `$ yarn` to install all dependancies

## Running
To start the development server, run `$ yarn start`. This will open a browser window to the client, and spawn the server in the background.

## Backend API
All API calls should be made to the ```/api``` endpoint.

Popular posts can be fetched with a GET request to ```/api/popular/<page>```.
This will return an object of the form
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