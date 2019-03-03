'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  /**
    * @apiVersion 0.1.0
    * @api {get} /user/list 获取列表数据
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    * {"statusCode":0,
    * "msg":"成功",
    * "data":{"list": [
    * {"id": "24e24c31-12f2-4e17-883d-7b9f18b79cf5",
    * "name": "78788",
    * "priceInCent": 2450,
    * "created_at": "2019-02-27T03:56:19.105Z",
    * "updated_at": "2019-02-27T03:56:19.105Z"
    * }]}}
    */
  router.get('/user/list', controller.partal.userController.list);
  /**
    * @apiVersion 0.1.0
    * @api {get} /user/getOne 根据id获取列表中某一个
    * @apiParam {Integer} id 商品id
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    * {"statusCode":0,
    * "msg":"成功",
    * "data":{"list":
    * {"id": "24e24c31-12f2-4e17-883d-7b9f18b79cf5",
    * "name": "78788",
    * "priceInCent": 2450,
    * "created_at": "2019-02-27T03:56:19.105Z",
    * "updated_at": "2019-02-27T03:56:19.105Z"
    * }}}
    */
  router.get('/user/getOne', controller.partal.userController.getOne);
  /**
    * @apiVersion 0.1.0
    * @api {get} /user/removeOne 根据id删除列表中某一个
    * @apiParam {Integer} id 商品id
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    * {"statusCode":0,
    * "msg":"成功",
    * "data":{}
    */
  router.put('/user/removeOne', controller.partal.userController.removeOne);
  /**
    * @apiVersion 0.1.0
    * @api {post} /user/register 注册
    * @apiParam {String} user.username 用户名
    * @apiParam {String} user.password 密码
    *
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    {
      "statusCode": 0,
      "msg": "注册成功",
      "data": {
        "id": "80d286d0-c1fe-4a8b-b146-cd4fc502da7a",
        "createTime": "2019-03-03T06:11:11.681Z",
        "updateTime": "2019-03-03T06:11:11.681Z",
        "username": "wanghaitao1",
        "role": 0,
        "email": null,
        "phone": null,
        "question": null,
        "answer": null
      }
    }
  */
  router.post('/user/register', controller.partal.userController.register);
  /**
    * @apiVersion 0.1.0
    * @api {post} /user/login 登录
    * @apiParam {String} username 用户名
    * @apiParam {String} password 密码
    *
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    {
      "statusCode": 0,
      "msg": "登录成功",
      "data": {
        "id": "80185dc5-1d87-4e48-9303-e3e9248be662",
        "username": "wanghaitao",
        "email": null,
        "phone": null,
        "role": 0,
        "redirectTo": ""
      }
    }
  */
  router.post('/user/login', controller.partal.userController.login);
};
