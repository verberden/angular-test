
const fs = require('fs');

module.exports = ({ models }) => {
  const File = models.file;

  return {
    showAll: async (req, res, next) => {
      try {
        const files = await File.findAll({
          where: {
            user_id: req.user.sub
          }
        })

        res.status(200).json(files.length ? files: []);
      } catch (err) {
        next(err);
      }
    },
    uploadAll: async (req, res, next) => {
      try {
        const promises = [];
        if (req.files) {
          for (let prop in req.files) {
            const file = req.files[prop];
            promises.push(new Promise((resolve, reject) => {
              fs.readFile(file.path, (err, data) => {
                if (err) reject(err);
                File.create({
                  name: file.name,
                  user_id: req.user.sub,
                  mime_type: file.type,
                  data
                }).then((data)=> {
                  resolve(data);
                })
              });
              
            }))
          }
        }

        const files = await Promise.all(promises);

        res.status(200).json(files.length ? files: []);
      } catch (err) {
        console.log(err);
        next(err);
      }
    },
  };
};
