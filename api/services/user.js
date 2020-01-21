const jwt = require('jsonwebtoken');

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

module.exports = ({models, config}) => {
  async function authenticate({ login, password }) {
    const user = models.user.findOne({
      where: {
        login,
        password
      }
    });
    if (user) {
        const token = jwt.sign({ sub: user.id }, config.common.secret);
        const { password, ...userWithoutPassword } = user;
        return {
            ...userWithoutPassword,
            token
        };
    }
  }
};


async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}