'use strict';
/* eslint valid-jsdoc: "off" */

const Controller = require('egg').Controller;
// const InvalidParam = require('../error/invalid_param');
// const Response = require('../utils/variable').response;

class TestController extends Controller {
  /**
   * @param {Egg.Context} ctx - egg Context
   */
  constructor(ctx) {
    super(ctx);
    this.TestService = ctx.service.testService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
    * 测试错误处理函数
    * @Param {String} param 参数
  */
  async error() {
    const { ctx } = this;
    const { param } = ctx.query;
    const response = await this.TestService.error(param);
    ctx.body = response;
  }
  /**
    * 获取测试商品列表
   */
  async list() {
    const { ctx } = this;
    const list = await this.TestService.list();
    const response = this.ServerResponse.createBySuccessData(list);
    ctx.body = response;
  }
  /**
   * 新增商品
   */
  async addOne() {
    const { ctx } = this;
    const { name, priceInCent } = ctx.request.body;
    const created = await this.TestService.addOne(name, priceInCent);
    if (!created) return;
    const response = this.ServerResponse.createBySuccessMsgAndData('添加成功', created);
    ctx.body = response;
  }
  /**
   * 根据id获取列表中某一个
   */
  async getOne() {
    const { ctx } = this;
    const { id } = ctx.query;
    const list = await this.TestService.getOneById(id);
    const response = list
      ? this.ServerResponse.createBySuccessData(list)
      : this.ServerResponse.createByErrorMsg('已删除或不存在');
    ctx.body = response;
  }
  /**
   * 根据id删除列表中某一个
   */
  async removeOne() {
    const { ctx } = this;
    const { id } = ctx.query;
    const response = await this.TestService.removeOneById(id);
    if (!response) return;
    ctx.body = response;
  }
}

module.exports = TestController;
