import parsePage from './parsePage';
import blockType from './blockType';

describe('Parse Page', () => {
    it('parses single-line text as a paragraph', () => {
        const text = 'Lorem ipsum, dolor ...';
        parsePage(`${text}\n`).should.deep.equal([{
            type: blockType.PARAGRAPH,
            text,
        }]);
    });
    it('parses multi-line text as a paragraph', () => {
        const text = 'Lorem ipsum,\ndolor\nsit amet...';
        parsePage(`${text}\n`).should.deep.equal([{
            type: blockType.PARAGRAPH,
            text,
        }]);
    });
    it('takes empty line as a paragraph separator', () => {
        const text1 = 'Lorem ipsum ...';
        const text2 = '... dolor sit amet ...';
        parsePage(`${text1}\n\n${text2}\n`).should.deep.equal([
            {
                type: blockType.PARAGRAPH,
                text: text1,
            },
            {
                type: blockType.PARAGRAPH,
                text: text2,
            },
        ]);
    });
    it('ignores multiple empty lines', () => {
        const text = 'Lorem ipsum';
        parsePage(`${text}\n\n\n\n\n${text}\n`).should.have.lengthOf(2);
    });
    it('parses line starting with # as heading', () => {
        const text = 'Lorem ipsum';
        const result = parsePage(`#${text}`);
        result.length.should.equal(1);
        result[0].should.contain.all.keys({
            type: blockType.HEADING,
            text,
        });
    });
    it('parser heading level as number of # at the beginning', () => {
        const text = '### # ##';
        const result = parsePage(text);
        result.should.have.lengthOf(1);
        result[0].level.should.equal(3);
    });
    it('trims heading text', () => {
        const text = 'Lorem ipsum';
        const result = parsePage(`##   ${text}   `);
        result.should.have.lengthOf(1);
        result[0].text.should.equal(text);
    });
    it('allows no empty line between a heading and a paragraph', () => {
        const par1 = 'Lorem ipsum ...';
        const par2 = ' ... dolor sit amet ...';
        const heading = 'AAA';
        const result = parsePage(`${par1}\n#${heading}\n${par2}\n`);
        result.should.have.lengthOf(3);
        result[0].should.deep.equal({
            type: blockType.PARAGRAPH,
            text: par1,
        });
        result[1].should.contain.all.keys({
            type: blockType.HEADING,
            text: heading,
        });
        result[2].should.deep.equal({
            type: blockType.PARAGRAPH,
            text: par2,
        });
    });
});
