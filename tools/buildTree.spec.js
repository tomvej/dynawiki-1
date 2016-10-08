import buildTree from './buildTree';
import blockType from './blockType';
import page from '../src/page';

describe('Build Tree', () => {
    const callBuildTree = (...params) => () => {
        buildTree(...params);
    };
    const par = (text) => ({type: blockType.PARAGRAPH, text});
    const head = (level, text) => ({type: blockType.HEADING, level, text});

    it('fails if blocks don\'t start with a H1', () => {
        void callBuildTree([par('Lorem ipsum')]).should.throw;
        void callBuildTree([head(2, 'Lorem ispum')]).should.throw;
    });
    it('transforms first section to section with id 0', () => {
        const text = 'Lorem ipsum';
        const result = buildTree([head(1, text), par('dolor sit amet')]);
        result[0].should.contain.all.keys({
            id: 0,
            type: page.nodeType.SECTION,
            text,
        });
    });
    it('does not allow two H1s', () => {
        void callBuildTree([head(1, 'Lorem ispum'), par('dolor sit amet'), head(1, 'You shannot pass!')]).should.throw;
    });
    it('does not allow non-positive heading levels', () => {
        void callBuildTree([head(1, 'Lorem ipsum'), head(0, 'This won\'t work.')]).should.throw;
    });
    it('appends sections if they are one lever higher', () => {
        const h1 = 'Lorem ipsum';
        const h2 = 'Dolor sit amet';
        const result = buildTree([head(1, h1), head(2, h2)]);
        result[1].should.contain.all.keys({
            id: 1,
            parent: 0,
            type: page.nodeType.SECTION,
            text: h2,
        });
        result[0].children.should.deep.equal([1]);
    });
    it('does not allow going more than one section level higher', () => {
        void callBuildTree([head(1, 'Lorem ipsum'), head(3, 'Lorem ipsum')]).should.throw;
    });
    it('appends one-level higher sections recursively', () => {
        const h1 = 'Lorem ipsum';
        const h2 = 'Dolor sit amet';
        const h3 = 'I have no idea how this continues';
        const result = buildTree([head(1, h1), head(2, h2), head(3, h3)]);
        result[1].should.contain.all.keys({
            id: 1,
            parent: 0,
            type: page.nodeType.SECTION,
            text: h2,
            children: [2],
        });
        result[2].should.contain.all.keys({
            id: 2,
            parent: 1,
            type: page.nodeType.SECTION,
            text: h3,
        });
        result[0].children.should.deep.equal([1]);
    });
    it('appends same-level sections to a common parent', () => {
        const h1 = 'Title';
        const h2a = 'First section';
        const h2b = 'Second section';
        const result = buildTree([head(1, h1), head(2, h2a), head(2, h2b)]);
        result[1].should.contain.all.keys({
            id: 1,
            parent: 0,
            text: h2a,
        });
        result[2].should.contain.all.keys({
            id: 2,
            parent: 0,
            text: h2b,
        });
        result[0].children.should.deep.equal([1, 2]);
    });
    it('appends same-level sections to a common parent even if they are divided by a subsection', () => {
        const h1 = 'Title';
        const h2a = 'First section';
        const h3 = 'Subsection';
        const h2b = 'Second section';
        const result = buildTree([head(1, h1), head(2, h2a), head(3, h3), head(2, h2b)]);
        result[1].should.contain.all.keys({
            id: 1,
            parent: 0,
            text: h2a,
        });
        result[3].should.contain.all.keys({
            id: 3,
            parent: 0,
            text: h2b,
        });
        result[0].children.should.deep.equal([1, 3]);
    });
    it('appends paragraph to last section', () => {
        const h1 = 'Title';
        const h2 = 'Section';
        const text = 'Lorem ipsum';
        const result = buildTree([head(1, h1), head(2, h2), par(text)]);
        result[2].should.contain.all.keys({
            id: 2,
            parent: 1,
            type: page.nodeType.PARAGRAPH,
            text,
        });
        result[1].children.should.deep.equal([2]);
    });
    it('appends paragraphs and sections in their incoming order', () => {
        const text1 = 'Lorem ipsum';
        const text2 = 'Dolor sit amet';
        const h = 'I am a heading!';
        const result = buildTree([head(1, 'Title'), par(text1), par(text2), head(2, h)]);
        result[1].should.contain.all.keys({
            id: 1,
            parent: 0,
            type: page.nodeType.PARAGRAPH,
            text: text1,
        });
        result[2].should.contain.all.keys({
            id: 2,
            parent: 0,
            type: page.nodeType.PARAGRAPH,
            text: text2,
        });
        result[3].should.contain.all.keys({
            id: 3,
            parent: 0,
            type: page.nodeType.SECTION,
            text: h,
        });
        result[0].children.should.deep.equal([1, 2, 3]);
    });
});
