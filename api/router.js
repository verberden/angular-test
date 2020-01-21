module.exports = (router, models, userService) => {

  router.get('/authenticate', (req, res, next) => {
    next({ name : 'NotFound' });
  });
  router.post('/authenticate', (req, res, next) => {
    userService.authenticate(req.body)
      .then(user => user ? res.json(user) : res.status(400).json({ message: 'Имя пользователя или пароль некорректы.' }))
      .catch(err => next(err));
  });
  // router.get('/', getAll);

  return router;
}
