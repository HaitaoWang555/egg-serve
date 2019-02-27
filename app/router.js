'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  /**
    * @apiVersion 0.1.0
    * @api {get} /test/error 测试错误处理函数
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
  /**
    * @apiVersion 0.1.0
    * @api {get} /test/list 获取列表数据
    * @apiGroup test
    *
    * @apiSuccess {Integer} code 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    * {"code":0,
    * "msg":"成功",
    * "data":{"list": [
    * {"id": "24e24c31-12f2-4e17-883d-7b9f18b79cf5",
    * "name": "78788",
    * "priceInCent": 2450,
    * "created_at": "2019-02-27T03:56:19.105Z",
    * "updated_at": "2019-02-27T03:56:19.105Z"
    * }]}}
    */
  router.get('/test/list', controller.test.list);
  /**
    * @apiVersion 0.1.0
    * @api {post} /test/addone 添加商品
    * @apiParam {String} name 商品名
    * @apiParam {Integer} priceInCent 商品价格
    *
    * @apiGroup test
    *
    * @apiSuccess {Integer} code 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccess {Object} data.list 添加的商品
    * @apiSuccessExample Success-Response:
    * {"code":0,
    * "msg":"添加成功",
    * "data":{"list":
    * {"id": "24e24c31-12f2-4e17-883d-7b9f18b79cf5",
    * "name": "78788",
    * "priceInCent": 2450,
    * "created_at": "2019-02-27T03:56:19.105Z",
    * "updated_at": "2019-02-27T03:56:19.105Z"
    * }}}
  */
  router.post('/test/addone', controller.test.addOne);
  /**
    * @apiVersion 0.1.0
    * @api {get} /test/getOne 根据id获取列表中某一个
    * @apiParam {Integer} id 商品id
    * @apiGroup test
    *
    * @apiSuccess {Integer} code 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    * {"code":0,
    * "msg":"成功",
    * "data":{"list":
    * {"id": "24e24c31-12f2-4e17-883d-7b9f18b79cf5",
    * "name": "78788",
    * "priceInCent": 2450,
    * "created_at": "2019-02-27T03:56:19.105Z",
    * "updated_at": "2019-02-27T03:56:19.105Z"
    * }}}
    */
  router.get('/test/getOne', controller.test.getOne);
  /**
    * @apiVersion 0.1.0
    * @api {get} /test/removeOne 根据id删除列表中某一个
    * @apiParam {Integer} id 商品id
    * @apiGroup test
    *
    * @apiSuccess {Integer} code 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    * {"code":0,
    * "msg":"成功",
    * "data":{}
    */
  router.put('/test/removeOne', controller.test.removeOne);
};
