'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const checkLogin = app.middleware.checkLogin({ checkAdmin: true });

  router.post('/manage/product/saveOrUpdate', checkLogin, controller.backend.productManageController.saveOrUpdateProduct);

  router.post('/manage/product/setSaleStatus', checkLogin, controller.backend.productManageController.setSaleStatus);

  router.put('/manage/product/setSaleStatus', checkLogin, controller.backend.productManageController.setSaleStatus);

  router.get('/manage/product/detail/:id', checkLogin, controller.backend.productManageController.getDetail);

  router.get('/manage/product/list', checkLogin, controller.backend.productManageController.getProductList);

  router.get('/manage/product/search', checkLogin, controller.backend.productManageController.productSearch);

  router.put('/manage/upload', checkLogin, controller.backend.productManageController.upload);
};
