'use strict';

const Controller = require('egg').Controller;

class ErrorController extends Controller {
  /**
   * @param {STRING} param 测试错误处理函数，无参数会有错误提示
   */
  async index() {
    const { ctx, app } = this;
    const { param } = ctx.query;
    if (!param) {
      throw new app.error.InvalidParam('param', 'param is STRING', '没有参数param');
    } else {
      ctx.body = `<h3>hello ${param}</h3>`;
    }
  }
}

module.exports = ErrorController;
