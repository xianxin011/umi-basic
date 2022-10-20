// @ts-ignore
import _extend from "dva-model-extend";

export const baseModel = {
  reducers: {
    updateState(state: any, { payload }: any): any {
      return { ...state, ...payload };
    },
  },
};

/**
 * 基于baseModel生成一个Model
 */
export function gen(arg0: any): any {
  const result = _extend(baseModel, arg0);
  return result;
}
