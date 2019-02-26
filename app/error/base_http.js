'use strict';

class BaseHttp extends Error {
  constructor(msg, code, httpMsg, httpStatusCode) {
    super(msg);
    this.code = code || BaseHttp.CODE;
    this.httpMsg = httpMsg;
    this.httpStatusCode = httpStatusCode;
  }
}

module.exports = BaseHttp;
