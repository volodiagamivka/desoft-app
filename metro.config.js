const { getDefaultConfig } = require('expo/metro-config');

// Отримуємо базову конфігурацію Expo
const config = getDefaultConfig(__dirname);

// Додаємо підтримку SVG файлів
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== 'svg'),
  sourceExts: [...config.resolver.sourceExts, 'svg'],
};

// Додаємо плагін для хешування активів
config.transformer.assetPlugins = ['expo-asset/tools/hashAssetFiles'];

module.exports = config;
