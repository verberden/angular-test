
const fs = require('fs');

module.exports = ({ models }) => {
  const File = models.file;

  return {
    showAll: async (req, res, next) => {
      try {
        const files = await File.findAll({
          where: {
            user_id: req.user.sub
          },
          order: [
            ['created_at', 'DESC']
          ]
        })

        res.status(200).json(files.length ? files: []);
      } catch (err) {
        next(err);
      }
    },
    download: async (req, res, next) => {
      try {
        const file = await File.findOne({
          where: {
            user_id: req.user.sub,
            id: req.params.id
          }
        });

        if (file) {
          res.contentType(file.mime_type);
          res.set("Content-Disposition", file.name);
          res.set("Content-Transfer-Encoding", "binary");
          console.log(file.data);
          res.status(200);
          res.send(file.data);
        }
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
            promises.push(new Promise(async (resolve, reject) => {
              await fs.readFile(file.path, async (err, data) => {
                if (err) reject(err);
                const hash = File.makeHash(data);
                const existedFile = await File.findOne({
                  where: {
                    hash
                  }
                });
                if (!existedFile) {
                  File.create({
                    name: file.name,
                    user_id: req.user.sub,
                    mime_type: file.type,
                    data,
                    hash
                  }).then((data)=> {
                    resolve(data);
                  })
                } else {
                  resolve(false);
                }

              });
              
            }))
          }
        }

        const promiseFiles = await Promise.all(promises);
        const files = promiseFiles.filter(el => el);

        res.status(200).json(files.length ? files: []);
      } catch (err) {
        console.log(err);
        next(err);
      }
    },
  };
};
