const faker = require('faker');
const fs = require('fs');
const path = require('path');

const obj = {
    id: faker.random.uuid(),
    name: faker.lorem.word(),
    children: Array(250000).fill(null).map(
        () => ({
            id: faker.random.uuid(),
            name: faker.lorem.word(),
        })
    )
};

const data = JSON.stringify(obj);
fs.writeFileSync(path.resolve(__dirname + '/data/original.json'), data);