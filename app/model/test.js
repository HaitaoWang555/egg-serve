'use strict';

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

  return TestList;
};
