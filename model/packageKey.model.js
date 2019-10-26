let db = require("../util/db");

module.exports = {
    add: entity => {
        return db.add("key", entity);
    },
    getAll: () => {
        return db.load(`select * from KeyPackages`);
    },
    createEntity: () => ({
        user: "",
        key: ""
    })
};