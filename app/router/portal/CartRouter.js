'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const checkLogin = app.middleware.checkLogin({});

  router.post('/cart/update', checkLogin, controller.portal.cartController.addOrUpdate);

  router.get('/cart/list', checkLogin, controller.portal.cartController.getCartList);

  router.delete('/cart/delete', checkLogin, controller.portal.cartController.deleteCart);

  router.put('/cart/selectAll', checkLogin, controller.portal.cartController.selectAll);

  router.put('/cart/unSelectAll', checkLogin, controller.portal.cartController.unSelectAll);

  router.put('/cart/select/:productId', checkLogin, controller.portal.cartController.select);

  router.put('/cart/unSelect/:productId', checkLogin, controller.portal.cartController.unSelect);

  router.get('/cart/count', checkLogin, controller.portal.cartController.getCartProductCount);
};
