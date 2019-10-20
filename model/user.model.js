let db = require("../util/db");

module.exports = {
  add: entity => {
    return db.add("user", entity);
  },
  singleByUsername: username => {
    return db.singleByUsername(username);
  },
  singleById: id => {
    return db.load(`select * from user where id=${id}`);
  },
  login: (email, password) => {
    return db.load(
      `select * from user where email='${email}' and password='${password}'`
    );
  },
  findByEmail: email => {
    return db.load(`select * from user where email='${email}'`);
  },
  verifyEmail: token => {
    //tìm record chứa token sau đó update cột token => null và cột isActivated => true, nếu k tìm thấy return null
  }
};
