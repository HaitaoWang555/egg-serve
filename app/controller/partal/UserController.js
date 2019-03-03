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

  /**
   * 登出
   */
  async logout() {
    this.ctx.session = null;
    this.ctx.body = this.ServerResponse.createBySuccessMsg('已成功退出');
  }

  /**
   * 获取用户信息
   */
  async getUserSession() {
    let response;
    const user = this.session.currentUser;
    if (!user) response = this.ServerResponse.createByErrorMsg('用户未登录，无法获取用户信息');
    else response = this.ServerResponse.createBySuccessMsgAndData('用户已登录', user);
    this.ctx.body = response;
  }

  /**
   * 获取用户详细信息
   */
  async getUserInfo() {
    let response;
    const user = this.session.currentUser;
    if (!user) response = this.ServerResponse.createByErrorCodeMsg(this.ResponseCode.NEED_LOGIN, '需要强制登录status=10');
    else response = await this.UserService.getUserInfo(user.id);
    this.ctx.body = response;
  }

  /**
   * 修改用户信息
   */
  async updateUserInfo() {
    const userInfo = this.ctx.request.body;
    const user = this.session.currentUser;
    const response = await this.UserService.updateUserInfo(userInfo, user);

    this.session.currentUser = response.getData();
    this.ctx.body = response;
  }

  /**
   * 登录状态的重置密码
   */
  async resetPassword() {
    let response;
    const { passwordOld, passwordNew } = this.ctx.request.body;
    const user = this.session.currentUser;
    if (!user) response = this.ServerResponse.createByErrorMsg('用户未登录');
    else response = await this.UserService.resetPassword(passwordOld, passwordNew, user);
    this.ctx.body = response;
  }

  /**
   * 获取密码提示问题
   */
  async forgetGetQuestion() {
    const { username } = this.ctx.query;
    const response = await this.UserService.selectQuestion(username);
    this.ctx.body = response;
  }

  /**
   * 校验找回密码返回token
   */
  async forgetCheckAnswer() {
    const { username, question, answer } = this.ctx.request.body;
    const response = await this.UserService.checkAnswer(username, question, answer);
    this.ctx.body = response;
  }

  /**
   * 忘记密码用token 重置密码
   */
  async forgetRestPassword() {
    const { username, paswordNew, forgetToken } = this.ctx.request.body;
    const response = await this.UserService.forgetRestPassword(username, paswordNew, forgetToken);
    this.ctx.body = response;
  }
}

module.exports = UserController;
