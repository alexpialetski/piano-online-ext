const { CracoAliasPlugin, configPaths } = require("react-app-rewire-alias");

const aliasMap = configPaths("./tsconfig.paths.json"); // or jsconfig.paths.json

module.exports = {
  plugins: [
    {
      plugin: CracoAliasPlugin,
      options: { alias: aliasMap },
    },
  ],
  webpack: {
    configure: (webpackConfig, { env, paths }) => {
      return {
        ...webpackConfig,
        mode: "development",
        entry: {
          main: [
            env === "development" &&
              require.resolve("react-dev-utils/webpackHotDevClient"),
            paths.appIndexJs,
          ].filter(Boolean),
          content: "./src/content/content.ts",
          inject: "./src/content/inject.ts",
        },
        output: {
          ...webpackConfig.output,
          filename: "static/js/[name].js",
        },
        optimization: {
          ...webpackConfig.optimization,
          runtimeChunk: false,
        },
        devtool: "inline-source-map",
      };
    },
  },
};
