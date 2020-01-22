const bcrypt = require('bcrypt');
const random = require('random-string-generator');
const saltRounds = 12;

module.exports = ({ dbs: { mainDb: mainDb, Sequelize } }) => {
  const User = mainDb.define(
    'User',
    {
      login: Sequelize.STRING,
      password: Sequelize.STRING,
      salt: Sequelize.STRING,
    },
    {
      tableName: 'users',
      createdAt: 'created_at',
      updatedAt: false,
    },
  );

  User.generatePassword = async passwd => {
    const salt = random(5);
    const password = await bcrypt.hash(`${passwd}${salt}`, saltRounds);
    return { password, salt};
  };
  User.prototype.validatePassword = async function validatePassword(password) {
    let isValid;
    try {
      isValid = await bcrypt.compare(`${password}${this.salt}`, this.password);
    } catch (err) {
      return false;
    }
    return isValid;
  };
  return User;
};
