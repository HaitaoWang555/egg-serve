'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/product/detail/:id', controller.portal.productController.getDetail);

  router.get('/product/name/search', controller.portal.productController.productSearch);

  router.get('/product/categoryId/search', controller.portal.productController.getProductListByCategoryId);
};
