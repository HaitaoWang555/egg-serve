'use strict';

class BaseHttp extends Error {
  /**
   * HTTP 请求错误处理
   * @param {*} msg 信息
   * @param {*} code 自定义错误码
   * @param {*} httpMsg 提示信息
   * @param {*} httpStatusCode HTTP 状态码
   */
  constructor(msg, code, httpMsg, httpStatusCode) {
    super(msg);
    this.code = code || BaseHttp.CODE;
    this.httpMsg = httpMsg;
    this.httpStatusCode = httpStatusCode;
  }
}

module.exports = BaseHttp;
