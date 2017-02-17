const express = require('express');

const app = express();

app.set('port', process.env.PORT || 8080);

app.get('/api/popular', (req, res) => {
  res.json({
    error: 'Not implemented'
  });
});

app.listen(app.get('port'), _ => {
  console.log(`API server available at: http://localhost:${app.get('port')}/`)
});
