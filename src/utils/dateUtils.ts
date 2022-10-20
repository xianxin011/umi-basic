const dateUtils = {
  toDate(v: any): Date | null {
    //将number,string,等转为date
    if (!v) {
      return null;
    }
    if (typeof v === "number" || new RegExp(/^\d+$|-\d+$/).test(v)) {
      return new Date(parseInt(v));
    }
    if (typeof v === "string") {
      return new Date(v);
    }
    return new Date(v);
  },
  toTime(v: any): number {
    //将日期转为time豪秒数
    let date: Date | null = this.toDate(v);
    if (!date) {
      return -1;
    }
    return date.getTime();
  },
};
export default dateUtils;
