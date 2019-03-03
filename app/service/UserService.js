'use strict';

/* eslint valid-jsdoc: "off" */
const { Service } = require('egg');

const md5 = require('md5');
const _ = require('lodash');
const uuid = require('uuid/v4');
const { salt } = require('../common/property');
const { USERNAME, EMAIL } = require('../common/type');
const { ROLE_CUSTOMER, ROLE_ADMAIN } = require('../common/role');

class TestService extends Service {
  /**
   * @param {Egg.Context} ctx - egg Context
   */
  constructor(ctx) {
    super(ctx);
    this.UserModel = ctx.model.UserModel;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  /**
   * 获取列表数据
   * @param {Number} query.limit 默认10条
   * @param {Number} query.offset 默认第一页
   * @returns {Object} 商品列表
   */
  async list(query = { limit: 10, offset: 0 }) {
    const { limit, offset } = query;
    const products = await this.TestModel.findAll({
      limit,
      offset,
    });

    return products;
  }
  /**
   * 根据id获取列表中某一个
   * @param {uuid} id 商品ID
   * @returns {Object} 成功或失败信息 商品信息
   */
  async getOneById(id) {
    if (!id) {
      const response = this.ServerResponse.createByErrorMsg('无效ID');
      this.ctx.body = response;
      return null;
    }

    const testList = this.TestModel.findOne({
      where: {
        id,
      },
    });

    return testList;
  }
  /**
   * 根据id删除列表中某一个
   * @param {uuid} id 商品ID
   * @returns {Object} 成功或失败信息
   */
  async removeOneById(id) {
    const list = await this.getOneById(id);
    if (!list) {
      return null;
    }

    const isRemove = list.destroy();

    return isRemove
      ? this.ServerResponse.createBySuccessMsg('成功')
      : this.ServerResponse.createByErrorMsg('失败');
  }

  /**
   * @feature 校验 username email
   * @param value {String}
   * @param type {String}
   * @return ServerResponse.msg
   */
  async checkValid(type, value) {
    if (type.trim()) {
      if (USERNAME === type) {
        return await this._checkExistColByField(USERNAME, value)
          ? this.ServerResponse.createByErrorMsg('用户名已存在')
          : this.ServerResponse.createBySuccessMsg('用户名不存在');
      }
      if (EMAIL === type) {
        return await this._checkExistColByField(EMAIL, value)
          ? this.ServerResponse.createByErrorMsg('邮箱已存在')
          : this.ServerResponse.createBySuccessMsg('邮箱不存在');
      }
    }
    return this.ServerResponse.createByErrorMsg('参数错误');
  }

  /**
   *
   * @param field {String}
   * @param value {String}
   * @return {Promise.<boolean>}
   */
  async _checkExistColByField(field, value) {
    const data = await this.UserModel.findOne({
      attributes: [ field ],
      where: { [field]: value },
    });
    return !!data;
  }

  /**
   * @feature 注册, 只能注册为ROLE_CUSTOMER, ROLE_ADMAIN 需要管理员授权
   * @param user {Object} { username, password, ... }
   * @return {Promise.<void>}
   */
  async register(user) {
    // 用户名存在报错
    const validUsernameResponse = await this.checkValid(USERNAME, user.username);
    if (!validUsernameResponse.isSuccess()) return validUsernameResponse;
    // 邮箱存在报错
    const validEmailResponse = await this.checkValid(EMAIL, user.email);
    if (!validEmailResponse.isSuccess()) return validEmailResponse;

    try {
      user.role = ROLE_CUSTOMER;
      user.password = md5(user.password + salt);
      user = await this.UserModel.create(user, {
        attributes: { exclude: [ 'password', 'role', 'answer' ] },
      });
      if (!user) return this.ServerResponse.createByErrorMsg('注册失败');

      user = user.toJSON();
      _.unset(user, 'password');

      return this.ServerResponse.createBySuccessMsgAndData('注册成功', user);
    } catch (e) {
      console.log(e);
      return this.ServerResponse.createByErrorMsg('注册失败');
    }
  }
  /**
   * 登录
   * @param {String} username 用户名
   * @param {String} password 密码
   */
  async login(username, password) {
    // 用户名存在报错
    const validResponse = await this.checkValid(USERNAME, username);
    if (validResponse.isSuccess()) return validResponse;

    // 检查密码是否正确
    const user = await this.UserModel.findOne({
      attributes: [ 'id', 'username', 'email', 'phone', 'role' ],
      where: {
        username,
        password: md5(password + salt),
      },
    });

    if (!user) return this.ServerResponse.createByErrorMsg('密码错误');

    const userInfo = user.toJSON();
    let redirectTo;
    if (userInfo.role === ROLE_ADMAIN) redirectTo = '/';
    else redirectTo = '';

    return this.ServerResponse.createBySuccessMsgAndData('登录成功', { ...userInfo, redirectTo });
  }

}

module.exports = TestService;
