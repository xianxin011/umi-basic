interface Model {
  state: any;
  namespace: string;
}

interface GApp {
  _models: Array<Model>;
  _store: {
    dispatch: (arg: any) => void;
  };
}

declare global {
  interface Window {
    g_app: GApp;
  }
}

class DvaUtils {
  /**
   * 获取全局Dva对象
   */
  public app = (): GApp => {
    return window.g_app;
  };

  /**
   * 根据namespace获取某个model
   * @param namespace
   */
  public getModel(namespace: string): Model | null {
    for (let model of window.g_app._models) {
      if (model.namespace === namespace) {
        return model;
      }
    }
    return null;
  }
}

const dvaUtils: DvaUtils = new DvaUtils();
export default dvaUtils;
