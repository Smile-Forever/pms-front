module.exports = {
  // 项目部署的基础路径
  // 我们默认假设你的应用将会部署在域名的根部，
  // 比如 https://www.my-app.com/
  // 如果你的应用时部署在一个子路径下，那么你需要在这里
  // 指定子路径。比如，如果你的应用部署在
  // https://www.foobar.com/my-app/
  // 那么将这个值改为 `/my-app/`
  baseUrl: "/zxb-pms",

  // 将构建好的文件输出到哪里
  outputDir: "dist/service-maintainer",
  // 构建部署项目是否需要source map, 加速生产环境能构建
  productionSourceMap: true,
  // // 配置 webpack-dev-server 行为。
  devServer: {
    port: 9528,
    disableHostCheck: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        pathRewrite: {
          "^/": "" // rewrite path          // remove base path
        }
      }
    } // string | Object
  },
  // 三方插件的选项
  pluginOptions: {
    // ...
  },
  transpileDependencies: [
    /\/node_modules\/vue-echarts\//,
    /\/node_modules\/resize-detector\//
  ]
};
