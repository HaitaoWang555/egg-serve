'use strict';

const Controller = require('egg').Controller;
const InvalidParam = require('../error/invalid_param');
const Response = require('../utils/variable').response;

class TestController extends Controller {
  /**
    * 测试错误处理函数
    * @Param {String} param 参数
    *
    * @Error {Integer} code 响应码
    * @Error {String} msg 提示信息
    * @Error {Object} data 响应数据
    *
    * @Success {Integer} code 响应码
    * @Success {String} msg 提示信息
    * @Success {Object} data 响应数据
  */
  async error() {
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

module.exports = TestController;
