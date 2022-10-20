import { defineConfig } from "umi";
import routes from './router.config'


export default defineConfig({
  outputPath:'dist/',
  title:'Bounstate',

  nodeModulesTransform: {
    type: 'none',
  },
  antd:{},
  dva: {
    hmr: true,
    immer: true,
    lazyLoad: true,
    disableModelsReExport: true,
    skipModelValidate: true
  },
  autoprefixer:{
    grid:'autoplace'
  },
  runtimePublicPath: false,
  hash: true,
  locale: {
    default: 'en-US',
    baseNavigator: true,
  },
  fastRefresh: {},
  alias:{
    '@config':__dirname,
  },
  define: {
    "process.env":{
      WEB_TYPE: process.env.WEB_TYPE || ''
    },
  },
  history: { type: 'browser' },
  manifest: {
    basePath: '/',
  },
  pwa: false,
  targets: { chrome: 49, firefox: 64, safari: 10, edge: 13, ios: 10 },
  proxy: {
    "/h5/": {
      target: "http://testapi.us.bowenfin.com:88/",
      changeOrigin: true
    }
  },
  routes,
})
