module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "~@/styles/_colors";
          @import "~@/styles/_base";
          `,
      },
    },
  },
};
