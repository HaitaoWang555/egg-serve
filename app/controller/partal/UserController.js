'use strict';
/* eslint valid-jsdoc: "off" */

const Controller = require('egg').Controller;

class UserController extends Controller {
  /**
   * @param {Egg.Context} ctx - egg Context
   */
  constructor(ctx) {
    super(ctx);
    this.session = ctx.session;
    this.UserService = ctx.service.userService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
    * 获取测试商品列表
   */
  async list() {
    const { ctx } = this;
    const list = await this.UserService.list();
    const response = this.ServerResponse.createBySuccessData(list);
    ctx.body = response;
  }
  /**
   * 根据id获取列表中某一个
   */
  async getOne() {
    const { ctx } = this;
    const { id } = ctx.query;
    const list = await this.UserService.getOneById(id);
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
    const response = await this.UserService.removeOneById(id);
    if (!response) return;
    ctx.body = response;
  }

  /**
   * 注册
   */
  async register() {
    const { ctx } = this;
    const { user } = ctx.request.body;
    const response = await this.UserService.register(user);

    this.ctx.body = response;
  }
  /**
   * 登录
   */
  async login() {
    const { username, password } = this.ctx.request.body;
    const response = await this.UserService.login(username, password);

    if (response.isSuccess()) {
      this.session.currentUser = response.getData();
    }

    this.ctx.body = response;
  }

}

module.exports = UserController;
