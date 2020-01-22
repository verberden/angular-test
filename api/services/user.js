const jwt = require('jsonwebtoken');
const util = require('util')

module.exports = ({models, config}) => {
  const User = models.user;
  return {
    authenticate: async ({ login, password }) => {
      const user = await User.findOne({
        where: {
          login
        }
      });

      if (await user.validatePassword(password)) {
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