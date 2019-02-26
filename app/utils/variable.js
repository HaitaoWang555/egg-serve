'use strict';

/**
 * HTTP 成功响应模板
 */
const response = {
  code: 0,
  data: {
    msg: '成功',
  },
};

const InvalidParamCode = 40003;

module.exports = { response, InvalidParamCode };
