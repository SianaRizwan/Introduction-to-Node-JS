var crypto = require("crypto");

const generateId= (id) => {
  let newID=id.toString()
  let hash= crypto.createHash('md5').update(newID).digest('hex');
  return hash;
};

module.exports = generateId;