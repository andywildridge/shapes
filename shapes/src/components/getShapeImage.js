const getShapeImage = (definition) => {
    const width = definition[0].length;
    const height = definition.length;
    const paths = definition.flat().map((i, idx)=>
        i ? `<rect x="${idx%width}" y="${Math.floor(idx/width)}" width="1" height="1"/>` : ''
    ).join('');
    return `
        <svg width="${width*10}%" viewBox="0 0 ${width} ${height}">
            ${paths}
        </svg>
    `;
}

export default getShapeImage;