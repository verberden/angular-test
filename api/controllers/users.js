
const fs = require('fs');

module.exports = ({ models }) => {
  const User = models.user;

  return {
    create: async (req, res, next) => {
      try {
        if (req.body) {
          const { login } = req.body;
          const existedUser = await User.findOne({
            where: {
              login
            }
          })

          if (!existedUser) {
            const { password, salt } = await User.generatePassword(req.body.password);
            const user = await User.create({
                login,
                password,
                salt
            })
    
            res.status(200).json(user);
          } else {
            throw new Error('User with this login already exists.');
          }
        }
      } catch (err) {
        next(err);
      }
    },
    changePassword: async (req, res, next) => {
      try {
        if (req.body) {
          const user = await User.findOne({ where: {
            id:req.user.sub
          }});

          if (await user.validatePassword(req.body.oldPassword)) {
            const { password, salt } = await User.generatePassword(req.body.password);
            const user = await User.update({
              password,
              salt
            }, { 
              where:{
                id: req.user.sub
              }
            })
  
            res.status(200).json(user);
          } else {
            throw new Error('Wrong Old Password.');
          }
        }
      } catch (err) {
        next(err);
      }
    },
  };
};
