module.exports = (router) => {

  router.get('/', (req, res, next) => {
    res.render('pages/index', {
      title: 'SPA angular - Загрузка и хранение файлов',
    });
  });

  return router;
}
