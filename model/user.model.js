let db = require("../util/db");

module.exports ={
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
    return db.load(`select * from user where email='${email}'`).then(res=>{
      console.log(res)
      if(res.length>0){
        return {
          error:null,
          data: res[0]
        }
      }
      return {
        error:'not found'
      }
    }).catch(e=>{
      return {
        error:e
      }
    })
  },
  verifyEmail: token => {
    return [];
    //tìm record chứa token sau đó update cột token => null và cột isActivated => true, nếu k tìm thấy return null
    
  },
  verifyRecoverToken: token =>db.load(`select * from user where token='${token}'`),
  addRecoverToken:  (entity) => db.update('user', 'email', entity),
  changePassword:(email,info) => {
    //tìm record với email tương ứng, sau đó sửa info cần thiết
    
  }
};

