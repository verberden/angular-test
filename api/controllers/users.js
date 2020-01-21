
const fs = require('fs');

module.exports = ({ models }) => {
  const User = models.user;

  return {
    create: async (req, res, next) => {
      try {
        if (req.body) {
          const { login, password } = req.body;
          const existedUser = await User.findOne({
            where: {
              login
            }
          })

          if (!existedUser) {
            // TODO hash password
            const user = await User.create({
                login,
                password,
                salt: 'salt'
            })
    
            res.status(200).json(user);
          } else {
            res.status(200).json({});
          }
        }
      } catch (err) {
        next(err);
      }
    },
    changePassword: async (req, res, next) => {
      try {
        if (req.body) {
          // TODO hash password
          const user = await User.update({
            password,
          }, { 
            where:{
              id: req.user.sub
            }
          })

          res.status(200).json(user);
        }
      } catch (err) {
        console.log(err);
        next(err);
      }
    },
  };
};
