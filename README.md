# sprite-colour
Create a colourized canvas from an existing canvas or image.

## Install

    $ npm install sprite-colour

## Example
```javascript
var colourize = require('sprite-colour'),
    Canvas = require('canvas-browserify');

var image = new Canvas.Image();

image.onload = function () {
    var coloured = colourize(image, '#af0000', 2);

    if (process.browser) {
        document.body.appendChild(coloured);
    } else {
        process.stdout.write(coloured.pngStream());
    }
};

image.src = './brick.png';
```

    $ node example.js > test.png


![grey brick](./brick.png)
*brick.png*

![red brick](./test.png)
*test.png*

## API
### colourize(canvas, colour, [shade], [section])
Apply colour to grey (equal RGB) pixels. Returns a `Canvas` object.

`canvas` is the source image to apply the colour to, and can be a `Canvas` or
`Image` object.

`colour` is the colour to apply to each grey pixel.

`shade` is the divisor of applying `colour` to non-grey pixels. If `0`, ignore
non-grey pixels completely.  **Default** is `0`.

`section` is the rectangle describing the sprite in `canvas`. Properties:

```javascript
{
    x: Number, // 0
    y: Number, // 0
    width: Number, // canvas.width
    height: Number // canvas.height
}
```

## License
LGPLv3+
