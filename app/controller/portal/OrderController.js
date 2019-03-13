'use strict';
/* eslint valid-jsdoc: "off" */

const Controller = require('egg').Controller;

class OrderController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.request = ctx.request;
    this.OrderService = ctx.service.orderService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async queryOrderPayStatus() {
    const { orderNum } = this.request.query;
    const response = await this.OrderService.queryOrderPayStatus(orderNum);
    this.ctx.body = response;
  }

  async create() {
    const { shippingId } = this.request.body;
    const response = await this.OrderService.createOrder(shippingId);
    this.ctx.body = response;
  }

  async cancel() {
    const { orderNum } = this.request.body;
    const response = await this.OrderService.cancel(orderNum);
    this.ctx.body = response;
  }

  async getOrderCartProduct() {
    // 获取购物车中已经选中的商品详情
    const response = await this.OrderService.getOrderCartProduct();
    this.ctx.body = response;
  }

  async list() {
    const response = await this.OrderService.getList(this.request.query);
    this.ctx.body = response;
  }

  async detail() {
    const { orderNum } = this.request.query;
    const response = await this.OrderService.getDetail(orderNum);
    this.ctx.body = response;
  }
}

module.exports = OrderController;
