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
    return [];
    //tìm record chứa token sau đó update cột token => null và cột isActivated => true, nếu k tìm thấy return null
    
  },
  verifyRecoverToken: recoverToken => {
    return [];
     //tìm record chứa token sau đó update cột recoveryToken => null rồi return email của user để thay đổi pass nếu k tìm thấy return null
    //return db.load(`select * from user where token='${recoverToken}'`);
  },
  addRecoverToken: (email,token) => {
    //tìm record với email tương ứng, sau đó sửa cột token với giá trị token truyền vào
  },
  changePassword:(email,info) => {
    //tìm record với email tương ứng, sau đó sửa info cần thiết
    
  }
};
