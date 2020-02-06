<h1 align="center"><img src="https://raw.github.com/rsmbl/Resemble.js/master/demoassets/resemble.png" alt="Resemble.js" width="256"/></h1>

<p align="center">
    <a href="https://travis-ci.org/rsmbl/Resemble.js"><img alt="Build Status" src="https://travis-ci.org/rsmbl/Resemble.js.svg?branch=master" /></a>
    <a href="https://www.codacy.com/app/jamescryer/Resemble.js?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=rsmbl/Resemble.js&amp;utm_campaign=Badge_Grade"><img alt="Code Health" src="https://api.codacy.com/project/badge/Grade/1e0972581406417e9914bc58f57704b3" /></a>
    <a href="https://www.codacy.com/app/jamescryer/Resemble.js?utm_source=github.com&utm_medium=referral&utm_content=rsmbl/Resemble.js&utm_campaign=Badge_Coverage"><img alt="Coverage" src="https://api.codacy.com/project/badge/Coverage/9223d8d37c99428c8c06b889470327a5" /></a>
    <a href="https://opensource.org/licenses/MIT"><img alt="Build Status" src="https://img.shields.io/badge/License-MIT-yellow.svg" /></a>
    <a href="https://www.npmjs.com/package/resemblejs"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/resemblejs.svg" /></a>
</p>

<p align="center">
  Analyse and compare images with Javascript and HTML5. <a href="https://github.com/rsmbl/Resemble.js">Read the doc here</a>. Compatible with Node.js >8.
</p>

<hr />

### Get it

Clone this repo or use our docker image : `cashstory/resemble-api`

### Docker 

Run the docker machine the service is serve on the port 3000 .

### Local

do `npm i` 
and then `npm start` make it serve on port 3000 .

### Test it

the API is pretty simple :

POST on `/diff` your two images named `image_1` and `image_2` in option in the body you can use all options of Rasemble.js

```
curl --location --request POST 'localhost:3000/diff' \
--form 'image_1=@/Users/martind/Downloads/accounting_101_Evolution_du_CA.png' \
--form 'image_2=@/Users/martind/Downloads/accounting_101_Evolution_du_CA_1.png'
```
or POST with specific options:
```
curl --location --request POST 'localhost:3000/diff' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--form 'image_1=@/Users/martind/Downloads/accounting_101_Evolution_du_CA.png' \
--form 'image_2=@/Users/martind/Downloads/accounting_101_Evolution_du_CA_1.png' \
--form 'options={
      "output": {
          "errorColor": {
              "red": 255,
              "green": 0,
              "blue": 255
          },
          "errorType": "movement",
          "transparency": 0.3,
          "largeImageThreshold": 1200,
          "useCrossOrigin": false,
          "outputDiff": true
      },
      "scaleToSameSize": true,
      "ignore": "antialiasing"
  }'
```

the api will return you a JSON object.

like this 

```
{
    "diffImage": "BASE64 STRING",
    "score": {
        "misMatchPercentage": "0.20",
        "isSameDimensions": true,
        "dimensionDifference": {
            "width": 0,
            "height": 0
        }
    }
}
```

