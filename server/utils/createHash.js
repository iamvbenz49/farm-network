const bcrypt = require('bcrypt');
const saltRounds = 10;

const createHash = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return reject(err); 
      resolve(hash); 
    });
  });
};

module.exports = createHash;
