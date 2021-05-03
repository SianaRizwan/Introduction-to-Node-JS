const os = require('os');
console.log(os.userInfo());

//uptime() = returns runtime of the machine
const upTime=os.uptime();
console.log(upTime);

//For some server side information
const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem()
}
console.log(currentOS);