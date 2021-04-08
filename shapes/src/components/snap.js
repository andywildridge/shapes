export default function snapPosition({
    shapePosition,
    shapeDimensions,
    stageDimensions,
    snapUnits = 10,
}) {
    const unitPixels = stageDimensions.width / snapUnits;
    const x = Math.round(shapePosition.x / unitPixels) * unitPixels;
    const y = Math.round(shapePosition.y / unitPixels) * unitPixels;
    return { x, y }
}
