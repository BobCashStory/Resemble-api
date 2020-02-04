const compareImages = require("resemblejs/compareImages");

const defaultOptions = {
        output: {
            errorColor: {
                red: 255,
                green: 0,
                blue: 255
            },
            errorType: "movement",
            transparency: 0.3,
            largeImageThreshold: 1200,
            useCrossOrigin: false,
            outputDiff: true
        },
        scaleToSameSize: true,
        ignore: "antialiasing"
    };
    
async function getDiff(image_1, image_2, options = defaultOptions) {
    // The parameters can be Node Buffers
    // data is the same as usual with an additional getBuffer() function
    const data = await compareImages(
        image_1,
        image_2,
        options
    );
    return {
    diff: data.getBuffer(), 
    score: {
        misMatchPercentage: data.misMatchPercentage, 
        isSameDimensions: data.isSameDimensions,
        dimensionDifference: data.dimensionDifference
      }
    };
}

module.exports = getDiff;
