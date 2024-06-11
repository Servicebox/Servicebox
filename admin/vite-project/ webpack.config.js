module.exports = {
  output: {
    publicPath: '/admin/',
  },
  devServer: {
    historyApiFallback: {
      index: '/admin/', // Обеспечивает корректную работу маршрутизации
    },
  },
};