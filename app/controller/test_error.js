'use strict';

const Controller = require('egg').Controller;

class ErrorController extends Controller {
  /**
   * @param {STRING} param 测试错误处理函数，无参数会有错误提示
   */
  async index() {
    const { ctx } = this;
    const { param } = this.ctx.query;
    if (!param) {
      throw new this.app.error.InvalidParam('param', 'param is STRING', '没有参数param');
    } else {
      ctx.body = `<h3>hello ${param}</h3>`;
    }
  }
}

module.exports = ErrorController;
