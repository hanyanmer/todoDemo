import { defineConfig } from "@umijs/max";
import routes from "./routes";

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: false,
  routes: routes,
  npmClient: "yarn",
  extraPostCSSPlugins: [require("tailwindcss"), require("autoprefixer")],
  define: {
    BASE_URL: "", //定义变量
  },
});
