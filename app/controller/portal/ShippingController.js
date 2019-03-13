'use strict';
/* eslint valid-jsdoc: "off" */

const Controller = require('egg').Controller;

class ShippingController extends Controller {
  /**
  * @param {Egg.Context} ctx - egg Context
  */
  constructor(ctx) {
    super(ctx);
    this.request = ctx.request;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ShippingService = ctx.service.shippingService;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  async add() {
    const response = await this.ShippingService.add(this.request.body);
    this.ctx.body = response;
  }

  async update() {
    const { id } = this.ctx.params;
    const response = await this.ShippingService.update(this.request.body, id);
    this.ctx.body = response;
  }

  async delete() {
    const { id } = this.ctx.params;
    const response = await this.ShippingService.delete(id);
    this.ctx.body = response;
  }

  async getAllShipping() {
    const response = await this.ShippingService.getAllShipping();
    this.ctx.body = response;
  }

}

module.exports = ShippingController;

