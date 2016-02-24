var colourize = require('./'),
    Canvas = require('canvas-browserify');

var image = new Canvas.Image();

image.onload = function () {
    var coloured = colourize(image, '#af0000', 2);

    if (process.browser) {
        document.body.appendChild(coloured);
    } else {
        coloured.pngStream().pipe(process.stdout);
    }
};

image.src = './brick.png';
