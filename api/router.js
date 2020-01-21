module.exports = (router, models, userService, controllers) => {

  router.get('/authenticate', (req, res, next) => {
    next({ name : 'NotFound' });
  });
  router.post('/authenticate', (req, res, next) => {
    console.log('===', req.body, userService);
    userService.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Имя пользователя или пароль некорректы.' }))
      .catch(err => next(err));
  });
  router.get('/files', controllers.files.showAll);
  router.post('/files', controllers.files.uploadAll);

  return router;
}
