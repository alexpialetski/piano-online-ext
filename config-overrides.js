const { alias, aliasJest, configPaths } = require("react-app-rewire-alias");

const aliasMap = configPaths("./tsconfig.paths.json"); // or jsconfig.paths.json

const options = {
  alias: aliasMap,
};

module.exports = alias(options);
module.exports.jest = aliasJest(options);
