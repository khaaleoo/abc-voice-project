const uuidv1 = require('uuid/v1');

 
export function genKey() {
    const v1options = {
    node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
    clockseq: 0x1234,
    msecs: new Date().getTime(),
    nsecs: 567}
    return  uuidv1(v1options);
};
