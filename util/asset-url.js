
module.exports = function (fileName) {
  return '/' + fileName + '?' + Date.now().toString(16);
};
