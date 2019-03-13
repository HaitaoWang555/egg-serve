'use strict';

/**
 * @param {Egg.Application} app - egg application
 */

module.exports = app => {
  const { router, controller } = app;
  const checkLogin = app.middleware.checkLogin({});

  router.get('/order/queryOrderPayStatus', checkLogin, controller.portal.orderController.queryOrderPayStatus);

  router.post('/order/create', checkLogin, controller.portal.orderController.create);

  router.put('/order/cancel', checkLogin, controller.portal.orderController.cancel);

  router.get('/order/getOrderCartProduct', checkLogin, controller.portal.orderController.getOrderCartProduct);

  router.get('/order/list', checkLogin, controller.portal.orderController.list);

  router.get('/order/detail', checkLogin, controller.portal.orderController.detail);
};
