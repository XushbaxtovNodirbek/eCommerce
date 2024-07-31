module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          componets: './src/components',
          assets: './src/assets',
          api: './src/api',
          helpers: './src/helpers',
          icons: './src/assets/icons',
          screens: './src/screens',
          store: './src/store',
          navigator: './src/navigator',
          types: './src/types',
        },
      },
    ],
  ],
};
