module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            '@babel/preset-env',
            '@babel/preset-react',
            '@babel/preset-typescript',
          ],
      plugins: [
        [
          'module-resolver',
          {
            alias: {
              '@assets': './assets',
              '@components': './src/components',
              '@constants': './src/constants',
              '@hooks': './src/hooks',
              '@screens': './src/screens',
              '@types': './src/types',
              '@utils': './src/utils',
              '@context': './src/context',
            },
          },
        ],
      ],
    };
};
  