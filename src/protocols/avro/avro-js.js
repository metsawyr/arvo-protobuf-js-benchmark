const avro = require('avro-js');
const path = require('path');

const type = avro.parse(path.resolve(__dirname + '/scheme.avsc'));

module.exports = {
    name: 'avro-js',
    async init() {},
    async serialize(data) {
        return type.toBuffer(data);
    }
};