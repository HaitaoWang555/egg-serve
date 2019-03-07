'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const checkLogin = middleware.checkLogin({ checkAdmin: true });

  router.post('/manage/category/addCategory',
    checkLogin, controller.backend.categoryManageController.addCategory);

  router.put('/manage/category/updateCategoryName',
    checkLogin, controller.backend.categoryManageController.updateCategoryName);

  router.get('/manage/category/parentId/:parentId',
    checkLogin, controller.backend.categoryManageController.getChildParallelCagtegory);

  router.get('/manage/category/deep/parentId/:parentId',
    checkLogin, controller.backend.categoryManageController.getCategoryAndDeepChildCategory);
};
