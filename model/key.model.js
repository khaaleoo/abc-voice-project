let db = require("../util/db");

module.exports = {
  add: entity => {
    return db.add("key", entity);
  },
  createEntity:()=>({
    user: "",
    key:""
  })
};