'use strict';

const uuid = require('uuid/v4');
const InvalidParam = require('../error/invalid_param');

module.exports = app => {
  const { UUID, STRING, INTEGER } = app.Sequelize;

  const TestList = app.model.define('testList', {
    id: { type: UUID, primaryKey: true },
    name: { type: STRING, unique: true },
    priceInCent: { type: INTEGER, min: 0 },
  });
  TestList.sync()
    .catch(e => {
      app.logger.error('error syncing sequelize model', {
        error: e,
        model: 'TestList',
      });
    });

  TestList.list = async (query = { limit: 10, offset: 0 }) => {
    const { limit, offset } = query;
    const products = await TestList.findAll({
      limit,
      offset,
    });
    return products;
  };

  TestList.addOne = async (name, priceInCent) => {
    if (!name) {
      throw new InvalidParam('name', 'name is STRING', '请输入商品名字');
    } else if (!priceInCent) {
      throw new InvalidParam('priceInCent', 'priceInCent is INTEGER', '请输入商品价格');
    }
    const toCreate = {
      name, priceInCent,
    };
    toCreate.id = uuid();
    const created = TestList
      .create(toCreate)
      .catch(e => {
        app.logger.error(e.errors);
      });
    return created;
  };

  TestList.getOneById = async id => {
    if (!id) throw new InvalidParam('id', 'id is UUID', '无效ID');
    const testList = TestList.findOne({
      where: {
        id,
      },
    });
    return testList;
  };
  TestList.removeOneById = async id => {
    const testList = await TestList.getOneById(id);
    if (!testList) throw new InvalidParam('id', 'name is UUID', '已删除或不存在');
    return testList.destroy();
  };
  return TestList;
};
