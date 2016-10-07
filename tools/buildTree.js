import blockType from './blockType';
import page from '../src/page';

export default (blocks) => {
    const result = {};
    let nextId = 1;
    let currentSection = 0;
    let currentLevel = 1;
    const pushNode = (type, text) => {
        result[nextId] = {
            id: nextId,
            parent: currentSection,
            type,
            text,
            children: [],
        };
        result[currentSection].children.push(nextId);
        nextId += 1;
    };
    const pushSection = (level, text) => {
        if (level <= 0) {
            throw new Error(`Expected positive number for a section level. Got ${level} instead.`);
        } else if (level === 0) {
            throw new Error('There can be only one H1.');
        } else if (level > currentLevel + 1) {
            throw new Error(`Cannot jump from section level ${currentLevel} directly to ${level}.`);
        } else {
            while (level <= currentLevel) {
                currentSection = result[currentSection].parent;
                currentLevel -= 1;
            }
            pushNode(currentSection, page.nodeType.SECTION, text);
            currentSection = nextId - 1;
            currentLevel += 1;
        }
    };

    if (blocks[0].type !== blockType.HEADING) {
        throw new Error(`Expected document would begin with a heading. Got a ${blocks[0].type} instead.`);
    }
    if (blocks[0].level !== 1) {
        throw new Error(`Expected document would begin with a H1. Got a H${blocks[0].level} instead.`);
    }
    result[0] = {
        id: 0,
        type: page.nodeType.SECTION,
        text: blocks[0].text,
        children: [],
    };
    pushNode(null, page.nodeType.SECTION, blocks[0].text);
    blocks.slice(1).forEach((block) => {
        switch (block.type) {
            case blockType.HEADING:
                pushSection(block.level, block.text);
                break;
            case blockType.PARAGRAPH:
                pushNode(page.nodeType.PARAGRAPH, block.text);
                break;
            default:
                throw new Error(`Unknown block type: ${block.type}`);
        }
    });

    return result;
};
