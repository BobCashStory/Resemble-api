const express = require('express');
const getScreenshot = require('./controller/getDiff');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function(_, res) {
  res.status(200).send('Ressemble service OK');
});

/**
 * Compare two images and send the diff image
 */
app.get('/diff', async function(req, res) {
  try {
    const params = req.query;
    const result = await getDiff(params);
    res.attachment(`diff.${params.format}`).status(200).send(result);
  } catch (e) {
    res.status(400).send(`Error while rendering the screenshot: ${e.message}`)
  }
});

module.exports = app;
