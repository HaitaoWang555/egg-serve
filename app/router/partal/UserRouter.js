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
    * @apiParam {Object} user
    * @apiParam {String} user.username 用户名
    * @apiParam {String} user.password 密码
    * @apiParam {String} user.email 邮箱 非必填
    * @apiParam {String} user.phone 手机号 非必填
    * @apiParam {String} user.question 密保问题 非必填
    * @apiParam {String} user.answer 密保答案 非必填
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
    * @apiParam {String} username 用户名 必填
    * @apiParam {String} password 密码 必填
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
  /**
    * @apiVersion 0.1.0
    * @api {post} /user/logout 退出登录
    *
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    {
      "statusCode": 0,
      "msg": "已成功退出",
      "data": null
    }
  */
  router.post('/user/logout', controller.partal.userController.logout);
  /**
    * @apiVersion 0.1.0
    * @api {get} /user/getUserSession 获取用户信息
    *
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    {
      "statusCode": 0,
      "msg": "用户已登录",
      "data": {
        "id": "ec01c6c5-86a2-4fa5-8267-d24324237de6",
        "username": "wanghaitao",
        "email": "123@123.com",
        "phone": "15124505701",
        "role": 0,
        "redirectTo": ""
      }
    }
  */
  router.get('/user/getUserSession', controller.partal.userController.getUserSession);
  /**
    * @apiVersion 0.1.0
    * @api {get} /user/getUserInfo 获取用户详细信息
    *
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    {
      "statusCode": 0,
      "msg": null,
      "data": {
        "id": "ec01c6c5-86a2-4fa5-8267-d24324237de6",
        "username": "wanghaitao",
        "email": "123@123.com",
        "phone": "15124505701",
        "question": "密保问题"
      }
    }
  */
  router.get('/user/getUserInfo', controller.partal.userController.getUserInfo);
  /**
    * @apiVersion 0.1.0
    * @api {post} /user/updateUserInfo 退出登录
    *
    * @apiParam {String} email 邮箱 选填
    * @apiParam {String} phone 手机 选填
    *
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    {
      "statusCode": 0,
      "msg": "更新个人信息成功",
      "data": {
        "id": "ec01c6c5-86a2-4fa5-8267-d24324237de6",
        "username": "wanghaitao",
        "email": "12325@123.com",
        "phone": "15124505701"
      }
    }
  */
  router.post('/user/updateUserInfo', controller.partal.userController.updateUserInfo);
  /**
    * @apiVersion 0.1.0
    * @api {post} /user/resetPassword 登录状态的重置密码
    *
    * @apiParam {String} passwordOld 原密码 必填
    * @apiParam {String} passwordNew 新密码 必填
    *
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    {
      "statusCode": 0,
      "msg": "修改密码成功",
      "data": null
    }
    */
  router.post('/user/resetPassword', controller.partal.userController.resetPassword);
  /**
    * @apiVersion 0.1.0
    * @api {get} /user/forgetGetQuestion 获取密保问题
    *
    * @apiParam {String} username 用户名 必填
    *
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    {
      "statusCode": 0,
      "msg": null,
      "data": {
        "question": "密保问题"
      }
    }
    */
  router.get('/user/forgetGetQuestion', controller.partal.userController.forgetGetQuestion);
  /**
    * @apiVersion 0.1.0
    * @api {post} /user/forgetCheckAnswer 校验密保问题返回token
    *
    * @apiParam {String} username 用户名 必填
    * @apiParam {String} question 密保问题 必填
    * @apiParam {String} answer 密保答案 必填
    *
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    {
      "statusCode": 0,
      "msg": "问题回答正确",
      "data": {
        "token": "640fbb84-f27e-49d7-b8ff-89dfb2bf2a3c"
      }
    }
    */
  router.post('/user/forgetCheckAnswer', controller.partal.userController.forgetCheckAnswer);
  /**
    * @apiVersion 0.1.0
    * @api {post} /user/forgetRestPassword 忘记密码用token 重置密码
    *
    * @apiParam {String} username 用户名 必填
    * @apiParam {String} paswordNew 新密码 必填
    * @apiParam {String} forgetToken 返回的token 必填
    *
    * @apiGroup user
    *
    * @apiSuccess {Integer} statusCode 响应码
    * @apiSuccess {String} msg 提示信息
    * @apiSuccess {Object} data 响应数据
    * @apiSuccessExample Success-Response:
    {
      "statusCode": 0,
      "msg": "修改密码成功",
      "data": null
    }
    */
  router.post('/user/forgetRestPassword', controller.partal.userController.forgetRestPassword);
};
