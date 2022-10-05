export class ResultData {
  constructor(code = 200, data?: any, msg = 'ok') {
    this.code = code;
    this.data = data || null;
    this.msg = msg;
  }

  code: number;

  data?: any;

  msg?: string;

  static ok(data: any, msg?: string): ResultData {
    return new ResultData(200, data, msg);
  }

  static fail(msg = 'fail', code = 500, data?: any): ResultData {
    return new ResultData(code, data, msg);
  }
}
