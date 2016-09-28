import assert from 'assert';

const equal = (actual, expected, message = '') => assert.strictEqual(expected, actual, `${message} ${expected} !== ${actual}`);

export default {
    equal,
};
