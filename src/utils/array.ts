class ArrayUtils {
  /**
   * 根据属性名查找元素
   * @param array
   * @param propName
   * @param value
   */
  public findByProp(array: Array<any>, propName: any, value: any): any {
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      if (item[propName] == value) {
        return item;
      }
    }
    return null;
  }

  /**
   * 排序
   * @param array
   * @param compare arg1-arg2>0升序，<0降序
   */
  public sort(
    array: Array<any>,
    compare: (arg1: any, arg2: any) => number
  ): void {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1 - i; j++) {
        if (compare(array[j], array[j + 1]) > 0) {
          let t = array[j + 1];
          array[j + 1] = array[j];
          array[j] = t;
        }
      }
    }
  }
}

const arrayUtils = new ArrayUtils();
export default arrayUtils;
