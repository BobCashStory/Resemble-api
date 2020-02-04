const express = require('express');
const fileUpload = require('express-fileupload');
const getScreenshot = require('./controller/getDiff');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.get('/', function(_, res) {
  res.status(200).send('Ressemble service OK');
});

/**
 * Compare two images and send the diff image
 */
app.post('/diff', async function(req, res) {
  try {
    const params = req.body;
    const result = await getDiff(params);
    res.attachment(result.diff).status(200).send(result.score);
  } catch (e) {
    res.status(400).send(`Error while rendering the screenshot: ${e.message}`)
  }
});

module.exports = app;
