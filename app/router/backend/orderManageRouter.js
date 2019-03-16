'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const checkLogin = middleware.checkLogin({ checkAdmin: true });

  router.get('/manage/order/detail', checkLogin, controller.backend.orderManageController.detail);

  router.get('/manage/order/list', checkLogin, controller.backend.orderManageController.list);

  router.get('/manage/order/search', checkLogin, controller.backend.orderManageController.search);

  router.put('/manage/order/sendGood', checkLogin, controller.backend.orderManageController.sendGood);
};
