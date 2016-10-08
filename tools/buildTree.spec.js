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
        void (callBuildTree([par('Lorem ipsum')])).should.throw;
        void (callBuildTree([head(2, 'Lorem ispum')])).should.throw;
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
        void (callBuildTree([head(1, 'Lorem ispum'), par('dolor sit amet'), head(1, 'You shannot pass!')])).should.throw;
    });
    it('does not allow non-positive heading levels', () => {
        void (callBuildTree([head(1, 'Lorem ipsum'), head(0, 'This won\'t work.')])).should.throw;
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
});
