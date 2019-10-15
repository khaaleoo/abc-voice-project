let db = require("../util/db");

module.exports = {
  add: entity => {
    return db.add("key", entity);
  },
  singleById: id => {
    return db.load(`select * from api_key where id='${id}'`);
  },
  createEntity:()=>({
    user: "",
    key:""
  })
};