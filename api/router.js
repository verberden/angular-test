const formidable = require('express-formidable');
module.exports = (router, models, userService, controllers) => {

  router.get('/authenticate', (req, res, next) => {
    next({ name : 'NotFound' });
  });
  router.post('/authenticate', (req, res, next) => {
    userService.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Имя пользователя или пароль некорректы.' }))
      .catch(err => next(err));
  });
  router.get('/files', controllers.files.showAll);
  router.get('/files/:id', controllers.files.download);
  router.post('/files', formidable(), controllers.files.uploadAll);

  router.post('/user', controllers.users.create);
  router.post('/user/password', controllers.users.changePassword);

  return router;
}
