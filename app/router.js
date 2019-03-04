'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);

  require('./router/test')(app);
  require('./router/portal/UserRouter')(app);
  require('./router/portal/ProductRouter')(app);
  require('./router/backend/productManageRouter')(app);
};
