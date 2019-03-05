'use strict';

module.exports = app => {
  const { INTEGER, STRING, DATE, UUID, UUIDV4 } = app.Sequelize;

  const CategoryModel = app.model.define('category', {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true,
      // autoIncrement: true,
    },
    // 父类别id 为0时为根节点，一级类别
    parentId: {
      type: UUID,
      allowNull: true,
    },
    // 类别名称
    name: {
      type: STRING(50),
      allowNull: true,
    },
    // 类别状态1-正常，2-废弃
    status: {
      type: INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    // 排序编号，同类展示顺序，相等则自然排序
    sortOrder: {
      type: INTEGER,
      allowNull: true,
    },
    createTime: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    updateTime: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
  }, {
    timestamps: false,
    tablseName: 'category',
  }, {
    classMethods: {
      associate() { },
    },
  });

  CategoryModel.beforeBulkUpdate(category => {
    category.attributes.updateTime = new Date();
    return category;
  });

  return CategoryModel;
};
