const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const sdkEnv = process.env.sdkEnv;

let backendEndPoint =
  sdkEnv === "prod"
    ? "https://checkout.hyperswitch.io/api/payments"
    : sdkEnv === "sandbox"
    ? "https://beta.hyperswitch.io/api/payments"
    : sdkEnv === "integ"
    ? "https://integ-api.hyperswitch.io/payments"
    : "https://beta.hyperswitch.io/api/payments";

let devServer = {
  contentBase: path.join(__dirname, "dist"),
  hot: true,
  port: 9050,
  historyApiFallback: true,
  proxy: {
    "/payments": {
      target: backendEndPoint,
      changeOrigin: true,
      secure: true,
      pathRewrite: { "^/payments": "" },
    },
  },
  headers: {
    "Cache-Control": "max-age=31536000,must-revalidate",
  },
};

module.exports = merge([
  common(),
  {
    mode: "development",
    devServer: devServer,
  },
]);
