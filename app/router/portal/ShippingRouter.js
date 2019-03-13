'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const checkLogin = app.middleware.checkLogin({});
  router.get('/shipping/list', checkLogin, controller.portal.shippingController.getAllShipping);

  router.post('/shipping/add', checkLogin, controller.portal.shippingController.add);

  router.put('/shipping/update/:id', checkLogin, controller.portal.shippingController.update);

  router.delete('/shipping/delete/:id', checkLogin, controller.portal.shippingController.delete);
};
