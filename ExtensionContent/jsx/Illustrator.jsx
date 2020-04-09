$._ext_ILST = {
    run: function (polygon, rows, columns, size, orientation) {

        var horizontal = (orientation === 'true');
        if (app.documents.length > 0 && app.activeDocument.layers.length > 0) {
            switch (polygon) {
            case 'triangle':
                triangleGrid()
                break;
            case 'square':
                squareGrid()
                break;
            case 'hexagon':
                hexagonGrid()
                break;
            case 'circle':
                circleGrid()
                break;
            }
        }

        function triangleGrid() {
            var x = 0;
            var y = 0;
            var radius = size / 2;
            var diameter = radius * 3 / 2;
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < columns; j++) {
                    if (horizontal) {
                        triangle = app.activeDocument.layers[0].pathItems.polygon(-x, -y, radius, 3, false);
                    } else {
                        triangle = app.activeDocument.layers[0].pathItems.polygon(y, x, radius, 3, false);
                        triangle.rotate(90);
                    }
                    if ((j + 1) % 2 == 0 ^ (i + 1) % 2 == 0) {
                        triangle.rotate(180);
                    }
                    x -= radius * Math.sqrt(3) / 2;
                }
                y += diameter;
                x = 0;
            }
        }
        function squareGrid() {
            var x = 0;
            var y = 0;
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < columns; j++) {
                    if (horizontal) {
                        app.activeDocument.layers[0].pathItems.rectangle(y, x, size, size);
                    } else {
                        app.activeDocument.layers[0].pathItems.rectangle(-x, -y, size, size);
                    }
                    x += size;
                }
                x = 0;
                y -= size;
            }
        }
        function hexagonGrid() {
            var x = 0;
            var y = 0;
            var radius = size / 2;
            var diameter = size * Math.sqrt(3) / 2;
            for (var i = 0; i < columns; i++) {
                for (var j = 0; j < rows; j++) {
                    if (horizontal) {
                        app.activeDocument.layers[0].pathItems.polygon(-y, -x, radius, 6, false);
                    } else {
                        hexagon = app.activeDocument.layers[0].pathItems.polygon(x, y, radius, 6, false);
                        hexagon.rotate(90);
                    }
                    x += diameter;
                }
                if ((i + 1) % 2 == 0) {
                    x = 0;
                } else {
                    x = diameter / 2;
                }
                y -= size * 3 / 4;
            }
        }
        function circleGrid() {
            var x = 0;
            var y = 0;
            for (var i = 0; i < columns; i++) {
                for (var j = 0; j < rows; j++) {
                    if (horizontal) {
                        app.activeDocument.layers[0].pathItems.ellipse(y, x, size, size);
                    } else {
                        app.activeDocument.layers[0].pathItems.ellipse(-x, -y, size, size);
                    }
                    x += size;
                }
                if ((i + 1) % 2 == 0) {
                    x = 0;
                } else {
                    x = size / 2;
                }
                var radius = size / 2;
                y -= Math.sqrt(-Math.pow(radius, 2) + Math.pow(size, 2));
            }
        }

        return;
    },
};
