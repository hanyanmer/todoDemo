module.exports = {
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": "postcss-nesting",
    tailwindcss: {},
    autoprefixer: {},
    // 压缩
    ...(process.env.NODE_ENV === "production" ? { cssnano: {} } : {}),
  },
};
