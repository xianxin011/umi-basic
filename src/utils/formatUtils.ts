import moment from "moment";

declare global {
  interface Window {}
}

class FormatUtils {
  public certificateType(type: any, certificateTypes: Array<any>): string {
    if (!certificateTypes) {
      return "";
    }
    for (let certificateType of certificateTypes) {
      if (certificateType.id == type) {
        return certificateType.name;
      }
    }
    return "";
  }

  /**
   * 金额格式化显示
   * @param value
   */
  public money(val: any): string {
    if (!val) {
      return val;
    }
    let str = `${val.toFixed(2)}`;
    let intSum = str
      .substring(0, str.indexOf("."))
      .replace(/\B(?=(?:\d{3})+$)/g, ","); // 取到整数部分
    let dot = str.substring(str.length, str.indexOf(".")); // 取到小数部分搜索
    if (dot.match("^[\\.0]+$")) {
      return intSum;
    }
    return intSum + dot;
  }

  /**
   * 金额格式化显示
   * @param value
   */
  public moneyFormat(val: any, decimal = 2): string {
    if (typeof val === "number") {
      return "" + Number(val).toFixed(decimal);
    }
    return val;
  }
  /**
   * 日期格式化
   * @param  fmt yyyy-MM-dd hh:mm:ss 和java一样
   * @param date
   */
  public date(fmt: string, date: any): string {
    if (!date) {
      return "";
    }
    if (typeof date === "number") {
      date = new Date(date);
    }
    let ret;
    const opt = {
      "y+": date.getFullYear().toString(), // 年
      "M+": (date.getMonth() + 1).toString(), // 月
      "d+": date.getDate().toString(), // 日
      "h+": date.getHours().toString(), // 时
      "m+": date.getMinutes().toString(), // 分
      "s+": date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    } as any;
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(
          ret[1],
          ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
        );
      }
    }
    return fmt;
  }

  /**
   * 还款日期格式化
   * @param date 时间戳
   * @returns
   */
  public dateForRepayment(date: any): string {
    if (!date) {
      return "";
    }
    const m = moment(date);
    if (m.month() == 4) {
      return m.format("MMM DD, YYYY");
    }
    return m.format("MMM DD, YYYY");
  }

  /**
   * 还款日期格式化
   * @param date 时间戳
   * @returns
   */
  public dateAddForRepayment(date: any, days: number, unit = "days"): string {
    if (!date) {
      return "";
    }
    const m = moment(date).add(days, unit);
    if (m.month() == 4) {
      return m.format("MMM DD, YYYY");
    }
    return m.format("MMM DD, YYYY");
  }
  /**
   * 还款日期格式化
   * @param date 时间戳
   * @returns
   */
  public dateForRepaymentWithHour(date: any): string {
    if (!date) {
      return "";
    }
    const m = moment(date);
    // if (m.month() == 4) {
    //   return m.format('MMM DD, YYYY');
    // }
    return m.format("MMM DD, YYYY HH:mm:ss");
  }

  public timeRemainUtilNow(date: number): string {
    if (!date) {
      return "";
    }
    const now = Date.now();
    const timeInterval = date - now;
    const days = Math.floor(timeInterval / 1000 / 60 / 60 / 24);
    const hours = Math.floor(
      (timeInterval - days * 24 * 60 * 60 * 1000) / 1000 / 60 / 60
    );
    const minutes = Math.floor(
      (timeInterval - days * 24 * 60 * 60 * 1000 - hours * 60 * 60 * 1000) /
        1000 /
        60
    );
    return `${days} days, ${hours} hours and ${minutes} minutes`;
  }

  public percent(value: number, decimal: number = 0) {
    return (value * 100).toFixed(decimal) + "%";
  }

  //还款码取款码格式化
  public code(val: string, prex = 5) {
    if (!val) {
      return val;
    }

    const start = val.slice(0, prex);
    const other = val
      .slice(prex)
      .replace(/\s/g, "")
      .replace(/(.{4})/g, "$1 ");

    return start + " " + other;
  }

  //账号每2个空一格格式化
  public account(val: string, prex = 2) {
    if (!val) {
      return val;
    }

    const start = val.slice(0, prex);
    const other = val
      .slice(prex)
      .replace(/\s/g, "")
      .replace(/(.{2})/g, "$1 ");

    return start + " " + other;
  }
}

const formatUtils: FormatUtils = new FormatUtils();
export default formatUtils;
