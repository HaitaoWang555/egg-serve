'use strict';

const BaseHttp = require('./base_http');
const InvalidParamCode = require('../utils/variable').InvalidParamCode;

class InvalidParam extends BaseHttp {
  /**
   * 处理接口参数错误
   * @param {*} paramName 出错的接口名
   * @param {*} requirement 提示信息
   * @param {*} httpMsg HTTP状态码
   */
  constructor(paramName, requirement, httpMsg) {
    const msg = `${paramName} does not meet requirement: ${requirement}`;
    super(msg, InvalidParamCode, httpMsg || '输入有问题', 403);
  }
}

module.exports = InvalidParam;
