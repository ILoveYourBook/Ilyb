module.exports = {
  preset: 'react-native',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native-community/google-signin' +
      '|@react-native-firebase/app' +
      '|@react-native-firebase/firestore' +
      '|@react-native-firebase/storage' +
      '|react-native-router-flux' +
      ')/)',
  ],
};
