module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "~@/styles/_colors";
          @import "~@/styles/_base";
          @import "~@/styles/_mixins";
          `,
      },
    },
  },
  devServer: {
    port: 8000,
  },
};
