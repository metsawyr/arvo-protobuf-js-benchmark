const faker = require('faker');

module.exports = function (children) {
    children = children;

    return {
        id: faker.random.uuid(),
        name: faker.lorem.word(),
        children: Array(children).fill(null).map(
            () => ({
                id: faker.random.uuid(),
                name: faker.lorem.word(),
            })
        )
    };
};
