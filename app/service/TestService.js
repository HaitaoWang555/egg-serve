'use strict';
/* eslint valid-jsdoc: "off" */
const { Service } = require('egg');
const uuid = require('uuid/v4');

class TestService extends Service {
/**
 * @param {Egg.Context} ctx - egg Context
 */
  constructor(ctx) {
    super(ctx);
    this.TestModel = ctx.model.Test;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }
  /**
    * 测试错误处理函数
    * @Param {String} param 参数
    * @returns {Object} 参数信息或无参提示
  */
  async error(param) {
    return param
      ? this.ServerResponse.createBySuccessMsgAndData('成功', param)
      : this.ServerResponse.createByErrorMsg('no param');
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
   * 添加商品
   * @param {String} name 商品名
   * @param {Integer} priceInCent 商品价格
   * @returns {Object} 成功或失败信息 添加的商品信息
   */
  async addOne(name, priceInCent) {
    if (!name) {
      const response = this.ServerResponse.createByErrorMsg('请输入商品名字');
      this.ctx.body = response;
      return null;
    } else if (!priceInCent) {
      const response = this.ServerResponse.createByErrorMsg('请输入商品价格');
      this.ctx.body = response;
      return null;
    }
    const toCreate = {
      name, priceInCent,
    };

    toCreate.id = uuid();
    const created = this.TestModel
      .create(toCreate)
      .catch(e => {
        this.app.logger.error(e.errors);
      });

    return created;
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
}

module.exports = TestService;
