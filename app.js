const express = require('express');
const fileUpload = require('express-fileupload');
const getDiff = require('./controller/getDiff');

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
    let options = null;
    if (params.options) {
      try {
        options = JSON.parse(params.options);
      } catch (err) {
        console.error(`Error parsing options`, err);
        return res.status(400).send(`Error parsing options`);
      }
    }
    if (!req.files.image_1 || !req.files.image_2) {
      return res.status(400).send(`Error missing file image_1 or image_2`);
    }
    if (!params) {
      return res.status(400).send(`Error missing req.body or params`);
    }
    const result = await getDiff(req.files.image_1.data, req.files.image_2.data, options);
    res.status(200).send(result);
  } catch (e) {
    res.status(400).send(`Error while rendering the diff: ${e.message}`)
  }
});

module.exports = app;
