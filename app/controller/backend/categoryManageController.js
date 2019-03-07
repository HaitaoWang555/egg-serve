'use strict';
const Controller = require('egg').Controller;

class CategoryManageController extends Controller {
  /**
  * @param {Egg.Context} ctx - egg Context
  */
  constructor(ctx) {
    super(ctx);
    this.resquest = ctx.request;
    this.CategoryManageService = ctx.service.categoryManageService;
    this.ResponseCode = ctx.response.ResponseCode;
    this.ServerResponse = ctx.response.ServerResponse;
  }

  // 添加类别
  async addCategory() {
    // 默认0 根节点
    const { name, parentId = '0' } = this.resquest.body;
    const response = await this.CategoryManageService.addCategory(name, parentId);
    this.ctx.body = response;
  }

  // 更新品类的name
  async updateCategoryName() {
    const { name, id } = this.resquest.body;
    const response = await this.CategoryManageService.updateCategoryName(name, id);
    this.ctx.body = response;
  }

  // 获取某分类下平级子分类
  async getChildParallelCagtegory() {
    const { parentId = '0' } = this.ctx.params;
    const response = await this.CategoryManageService.getChildParallelCagtegory(parentId);
    this.ctx.body = response;
  }

  // 获取某分类下的递归子分类,  返回的是Array<id>
  async getCategoryAndDeepChildCategory() {
    const { parentId = '0' } = this.ctx.params;
    const response = await this.CategoryManageService.getCategoryAndDeepChildCategory(parentId);
    this.ctx.body = response;
  }

}


module.exports = CategoryManageController;
