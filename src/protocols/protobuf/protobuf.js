const protobuf = require('protobufjs');
const path = require('path');

let type;

module.exports = {
    name: 'protobufjs',
    async init() {
        const root = await protobuf.load(path.resolve(__dirname + '/scheme.proto'));
        type = root.lookupType('scheme.ParentObject');
    },
    async serialize(data) {
        const message = type.create(data);
        return type.encode(message).finish();
    },
};
