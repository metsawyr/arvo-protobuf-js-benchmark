const protocols = require('./protocols');
const generate = require('./generate');

const CYCLES = 20;

(async () => {
    const results = {};

    for (let i = 0; i < CYCLES; i++) {
        const originalData = generate(random(10000, 250000));
        const originalSize = JSON.stringify(originalData).length;

        for (const protocol of protocols) {
            if (!results.hasOwnProperty(protocol.name)) {
                results[protocol.name] = {
                    duration: [],
                    size: [],
                };
            }
            const {duration, size} = results[protocol.name];

            await protocol.init();
            duration[i] = Date.now();
            const serializedData = await protocol.serialize(originalData);
            duration[i] = Date.now() - duration[i];
            size[i] = originalSize - serializedData.length;
        }
    }

    for (const [protocolName, benchmarks] of Object.entries(results)) {
        console.log(
            `\n\n${protocolName}:`
            + `\nDuration: ${
                Math.pow(
                    benchmarks.duration.reduce((result, item) => result * item, 1),
                    1 / CYCLES
                )
            } miliseconds`
            + `\nSaved: ${
                Math.pow(
                    benchmarks.size.reduce((result, item) => result * item, 1),
                    1 / CYCLES
                )
            } bytes`
        );
    }
})();

function random(min, max){
    return Math.floor(Math.random() * ( max - min + 1) + min);
}