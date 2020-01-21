const jwt = require('jsonwebtoken');
const util = require('util')

module.exports = ({models, config}) => {
  return {
    authenticate: async ({ login, password }) => {
      const user = await models.user.findOne({
        where: {
          login,
          password
        }
      });
      if (user) {
          const token = jwt.sign({ sub: user.id }, config.common.secret);
          const { password, ...userWithoutPassword } = user.dataValues;
          return {
              ...userWithoutPassword,
              token
            };
      } else {
        throw new Error('No such user');
      }
    }
  }
};


async function getAll() {
    return users.map(u => {
        const { password, ...userWithoutPassword } = u;
        return userWithoutPassword;
    });
}