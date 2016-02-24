var Canvas = require('canvas-browserify'),
    parseColor = require('parse-color');

function colourize(canvas, colour, shade, section) {
    var width, height, sprite, dest, destCtx, i, isGrey, isBlack,
        isTransparent;

    colour = parseColor(colour).rgb;
    // what degree to shade non-grey pixels
    shade = shade || 0;
    section = section || {};
    // origins of the source sprite as we may only want a section
    section.x = section.x || 0;
    section.y = section.y || 0;
    // width and height of the source sprite
    width = section.width || canvas.width;
    height = section.height || canvas.height;
    dest = new Canvas(width, height);
    destCtx = dest.getContext('2d');

    // generate a canvas if an image was passed. images have a src attribute
    if (typeof canvas.src === 'string') {
        sprite = new Canvas(width, height).getContext('2d');
        sprite.drawImage(canvas, 0, 0);
        sprite = sprite.getImageData(section.x, section.y, width, height);
    } else {
        sprite = canvas.getContext('2d').getImageData(section.x, section.y,
                                                      width, height);
    }

    for (i = 0; i < width * height * 4; i += 4) {
        isGrey = sprite.data[i] === sprite.data[i + 1] &&
                 sprite.data[i + 1] === sprite.data[i + 2] &&
                 sprite.data[i + 2] === sprite.data[i];
        isBlack = isGrey && sprite.data[i] === 0;
        isTransparent = sprite.data[i + 3] === 0;

        if (!isBlack && !isTransparent) {
            if (isGrey) {
                sprite.data[i] += colour[0];
                sprite.data[i + 1] += colour[1];
                sprite.data[i + 2] += colour[2];
            } else if (shade > 0 && !isGrey) {
                sprite.data[i] += colour[0] / shade;
                sprite.data[i + 1] += colour[1] / shade;
                sprite.data[i + 2] += colour[2] / shade;
            }

            sprite.data[i + 3] = 255;
        }
    }

    destCtx.putImageData(sprite, 0, 0);

    return dest;
}

module.exports = colourize;
