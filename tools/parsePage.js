import blockType from './blockType';

const paragraph = (buffer) => ({
    type: blockType.PARAGRAPH,
    text: buffer.join('\n'),
});

const newResult = (result, buffer) => ({
    result,
    buffer: buffer || [],
});

export default (text) => text.split('\n').reduce(({result, buffer}, line) => {
    if (!line) {
        if (!buffer.length) {
            return newResult(result, buffer);
        } else {
            return newResult(result.concat([paragraph(buffer)]));
        }
    } else if (line.match(/^#/)) {
        const level = line.match(/^#+/)[0].length;
        const section = {
            type: blockType.HEADING,
            level,
            text: line.substring(level).trim(),
        };
        if (!buffer.length) {
            return newResult(result.concat([section]));
        } else {
            return newResult(result.concat([section, paragraph(buffer)]));
        }
    } else {
        return newResult(result, buffer.concat([line]));
    }
}, newResult([])).result;
