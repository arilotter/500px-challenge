const express = require('express');
const api = require('./500px');

const app = express();

app.set('port', process.env.PORT || 8080);

app.get('/api/popular/:page/:thumbSize?', (req, res) => {
  api.popular(req.params.page, req.params.thumbSize)
    .then(json => {
      res.json(json);
    });
});

app.listen(app.get('port'), _ => {
  console.log(`API server available at: http://localhost:${app.get('port')}/`);
});
