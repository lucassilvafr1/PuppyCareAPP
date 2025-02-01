const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

// Obtenha as configurações padrão do Metro
const defaultConfig = getDefaultConfig(__dirname);

// Adicione suporte ao react-native-svg-transformer
const svgConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
    sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
  },
};

// Combine as configurações padrão e as personalizadas
module.exports = mergeConfig(defaultConfig, svgConfig);
