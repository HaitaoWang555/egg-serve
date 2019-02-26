'use strict';

const Controller = require('egg').Controller;
const InvalidParam = require('../error/invalid_param');
const Response = require('../utils/variable').response;

class ErrorController extends Controller {
/**
 * @apiVersion 0.1.0
 * @api {get} /test_error 测试错误处理函数
 * @apiParam {String} param 参数
 *
 * @apiGroup test
 *
 * @apiError {Integer} code 响应码
 * @apiError {Object} param 参数
 * @apiErrorExample Error-Response:
 * {"code":40003,"msg":"没有参数param"}
 *
 * @apiSuccess {Integer} code 响应码
 * @apiSuccess {Object} param 参数
 * @apiSuccessExample Success-Response:
 * {"code":0,"msg":"成功","data":{"param": "111111"}}
 */
  async index() {
    const { ctx } = this;
    const { param } = ctx.query;
    if (!param) {
      throw new InvalidParam('param', 'param is STRING', '没有参数param');
    } else {
      const res = Response;
      res.data.param = param;
      ctx.body = res;
    }
  }
}

module.exports = ErrorController;
