'use strict';
const Controller = require('egg').Controller;

class OrderManageController extends Controller {
  /**
  * @param {Egg.Context} ctx - egg Context
  */
  constructor(ctx) {
    super(ctx);
    this.resquest = ctx.request;
    this.OrderService = ctx.service.orderService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async list() {
    const response = await this.OrderService.getList(this.request.query);
    this.ctx.body = response;
  }

  async search() {
    const response = await this.OrderService.search(this.request.query);
    this.ctx.body = response;
  }

  async detail() {
    const { orderNum } = this.request.query;
    const response = await this.OrderService.getDetail(orderNum);
    this.ctx.body = response;
  }

  async sendGood() {
    const { orderNum } = this.request.body;
    const response = await this.OrderService.manageSendGood(orderNum);
    this.ctx.body = response;
  }

}


module.exports = OrderManageController;
