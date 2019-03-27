const fs = require('fs').promises;
const path = require('path');
const protocols = require('./protocols');

(async () => {
    const originalPath = path.resolve(__dirname + '/data/original.json');
    const originalData = JSON.parse(
        await fs.readFile(originalPath)
    );
    const originalStats = await fs.stat(originalPath);

    console.log(`Original data size: ${originalStats.size} bytes`);

    for (const protocol of protocols) {
        await protocol.init();
        const start = Date.now();
        const serializedData = await protocol.serialize(originalData);
        const duration = Date.now() - start;
        const serializedPath = path.resolve(__dirname + `/data/${protocol.name}.bin`);
        await fs.writeFile(serializedPath, serializedData);
        const stats = await fs.stat(serializedPath);

        console.log(
            `\n\nSerialization using ${protocol.name}`
            + `\nDuration: ${duration} miliseconds`
            + `\nSaved: ${originalStats.size - stats.size} bytes`
        );
    }
})();