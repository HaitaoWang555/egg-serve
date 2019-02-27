'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  /**
    * @apiVersion 0.1.0
    * @api {get} /error 测试错误处理函数
    * @apiParam {String} param 参数
    *
    * @apiGroup test
    *
    * @apiError {Integer} code 响应码
    * @apiError {String} msg 提示信息
    * @apiError {Object} data 响应数据
    * @apiErrorExample Error-Response:
    * {"code":40003,"msg":"没有参数param"}
    *
    * @apiSuccess {Integer} code 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    * {"code":0,"msg":"成功","data":{"param": "111111"}}
  */
  router.get('/test/error', controller.test.error);
};
