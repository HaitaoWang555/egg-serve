'use strict';
/* eslint valid-jsdoc: "off" */

const Controller = require('egg').Controller;
const path = require('path');
const fs = require('fs');
const sendToWormhole = require('stream-wormhole');

class UserController extends Controller {
  /**
   * @param {Egg.Context} ctx - egg Context
   */
  constructor(ctx) {
    super(ctx);
    this.resquest = ctx.request;
    this.ProductManageService = ctx.service.productManageService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  // 添加产品
  async saveOrUpdateProduct() {
    const product = this.resquest.body;
    const response = await this.ProductManageService.saveOrUpdateProduct(product);
    this.ctx.body = response;
  }

  // 产品上下架
  async setSaleStatus() {
    const { id, status } = this.resquest.body;
    const response = await this.ProductManageService.setSaleStatus(id, status);
    this.ctx.body = response;
  }

  // 获取产品详情
  async getDetail() {
    const { id } = this.ctx.params;
    const response = await this.ProductManageService.getDetail(id);
    this.ctx.body = response;
  }
  // 获取产品列表
  async getProductList() {
    const response = await this.ProductManageService.getProductList(this.resquest.query);
    this.ctx.body = response;
  }

  // 后台产品搜索
  async productSearch() {
    const response = await this.ProductManageService.productSearch(this.resquest.query);
    this.ctx.body = response;
  }

  // 上传图片
  async upload() {
    let response;
    const stream = await this.ctx.getFileStream();
    const extname = path.extname(stream.filename);
    const name = path.basename(stream.filename, extname);
    const filename = name + Date.now() + extname;
    let result;
    try {
      // 本地上传
      const ws = fs.createWriteStream(path.resolve('app/public/' + filename));
      stream.pipe(ws);
      // oss 服务
      // result = await this.ctx.oss.put(name + now, stream)
    } catch (e) {
      await sendToWormhole(stream);
      response = this.ServerResponse.createByError('上传图片失败');
      throw new Error(e);
    } finally { await sendToWormhole(stream); }
    response = this.ServerResponse.createBySuccessMsgAndData('上传图片成功', {
      filename,
      url: result ? result.url : 'localhost:7001/public/' + filename,
      fields: stream.fields,
    });
    this.ctx.body = response;
  }


}

module.exports = UserController;
