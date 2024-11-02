const bcrypt = require('bcrypt');
const saltRounds = 10;


const checkPassword = async (plainPassword, passwordHash) => {
  try {
    const match = await bcrypt.compare(plainPassword, passwordHash);
    if (match) {
      console.log("Passwords match!");
      return true;
    } else {
      console.log("Passwords do not match.");
      return false;
    }
  } catch (err) {
    console.error("Error comparing passwords:", err);
    throw err; // You can handle this error as needed
  }
};

module.exports = checkPassword;
