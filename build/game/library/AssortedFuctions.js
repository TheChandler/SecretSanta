// Assorted functions
import { Circle, Polygon, Vector2 } from "./GameMath.js";
export function drawMenu(ctx, menu) {
    if (!menu) {
        return;
    }
    try {
        for (let item of menu.options) {
            item.draw(ctx);
        }
    }
    catch (e) {
        console.error(e, menu);
    }
}
export function drawGrid(ctx) {
    ctx.strokeStyle = "#000";
    const boxSize = 100;
    //snapping grid is off by 5 and 10 for some reason. idk
    const xOffset = (ctx.position.x % boxSize) + 5;
    const yOffset = (ctx.position.y % boxSize) + 10;
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            ctx.strokeRect((i * boxSize) - xOffset, (j * boxSize) - yOffset, boxSize, boxSize);
        }
    }
    // console.log((5 * boxSize) - xOffset, (5 * boxSize) - yOffset)
}
export function findLevelBounds(shapes) {
    let maxX = 0;
    let minX = 100000;
    let maxY = 0;
    let minY = 10000;
    for (let shape of shapes) {
        for (let point of shape.points) {
            if (point.x > maxX) {
                maxX = point.x;
            }
            if (point.x < minX) {
                minX = point.x;
            }
            if (point.y > maxY) {
                maxY = point.y;
            }
            if (point.y < minY) {
                minY = point.y;
            }
        }
    }
    return {
        maxX,
        maxY,
        minX,
        minY
    };
}
export function printCanvas(shapes, exit) {
    let canv = document.createElement('canvas');
    let { maxX, maxY, minX, minY } = findLevelBounds(shapes);
    console.log(maxX, maxY, minX, minY);
    canv.height = maxY - minY;
    canv.width = maxX - minX;
    let ctx = canv.getContext('2d');
    if (!ctx) {
        return;
    }
    document.body.append(canv);
    let offset = new Vector2(ctx, -minX, -minY);
    console.log(offset);
    for (let shape of shapes) {
        let newShape = new Polygon(ctx, shape.baseArray.map(([x, y]) => [x + offset.x, y + offset.y]));
        newShape.draw();
    }
    let exitShape = new Polygon(ctx, exit.baseArray.map(([x, y]) => [x + offset.x, y + offset.y]));
    exitShape.draw("green");
    new Circle(ctx, 500, 500, 165).draw('red', offset);
    // var dataURL = canv.toDataURL("image/png");
    var dataBlob = canv.toBlob((blob) => {
        if (blob) {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = "levelBGbase.png";
            a.click();
        }
        console.log(blob);
        var newTab = window.open('about:blank', 'image from canvas');
        if (newTab) {
            newTab.document.write("<img src='" + blob + "' alt='from canvas'/>");
        }
    });
}
export function testCollisionsWithWorld(testShapes, worldShapes) {
    for (let shape of worldShapes) {
        for (let test of testShapes) {
            if (shape.collides(test, true)) {
                return [shape, test];
            }
        }
    }
    return false;
}
export function getClosestVertex(shapes, cords, cutoff) {
    console.log(shapes, cords, cutoff);
    let nearestVertex = null;
    let shortestDistance = cutoff;
    for (let shape of shapes) {
        //loop throught vertices find one closest to cords
        for (let vertex of shape.points) {
            let d = (vertex.distanceTo(cords));
            if (d < shortestDistance) {
                nearestVertex = vertex;
                shortestDistance = d;
            }
        }
    }
    return nearestVertex;
}
export function getClosestLine(shapes, cords, cutoff) {
    let nearestLine = null;
    let shortestDistance = cutoff;
    for (let shape of shapes) {
        //loop throught vertices find one closest to mouse. Move that one with mouse cords until released
        for (let line of shape.lines) {
            let d = (line.distanceTo(cords));
            if (d < shortestDistance) {
                nearestLine = line;
                shortestDistance = d;
            }
        }
    }
    return nearestLine;
}
export function getClosestPolygon(shapes, cords, shapeFactory) {
    let thing;
    shapes.forEach((shape, index) => {
        if (shape.collides(shapeFactory.createVector2(cords[0], cords[1]))) {
            thing = index;
        }
    });
    return thing;
}
/**
 *
 * @param max Maximum number this can be (non-inclusive)
 * @returns
 */
export function randomInt(max) {
    return Math.floor(Math.random() * max);
}
export function lerp(a, b, alpha) {
    // return ((b - a) * alpha) + a
    return lerpEaseOut(a, b, alpha);
}
export function lerpEaseOut(a, b, alpha) {
    alpha = Math.sin(Math.PI * .5 * alpha);
    return ((b - a) * alpha) + a;
}
export function arrayShuffle(array) {
    let currentIndex = array.length;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]
        ];
    }
}
