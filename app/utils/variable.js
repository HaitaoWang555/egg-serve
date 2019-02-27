'use strict';


const response = function(msg) {
  return {
    code: 0,
    msg: msg || '成功',
    data: {
    },
  };
};

const InvalidParamCode = 40003;

module.exports = { response, InvalidParamCode };
