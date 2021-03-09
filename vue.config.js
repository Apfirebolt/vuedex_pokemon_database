module.exports = {
  lintOnSave: true,
  crossorigin: 'anonymous',
  integrity: true,
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Vuedex',
    },
  },
  devServer: {
    disableHostCheck: true,
    useLocalIp: false,
    proxy: {
      '': {
        target: 'https://pokeapi.co',
        changeOrigin: true,
      },
    },
  },
};
