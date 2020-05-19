module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ["disable"],
  processor: "disable/disable",
  settings:{
    'import/resolver': {
      'babel-plugin-root-import': {
        rootPathSuffix: 'src',
      },
    },
  }
};
