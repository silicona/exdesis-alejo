const common = [
  './spec/bdd/features/**/*.feature',
  '--require ./spec/bdd/step-definitions/**/*.ts',
  '--require-module ts-node/register',
  // '--require ./src/support/*.ts',
  '--publish-quiet',
  // '--world-parameters ' + JSON.stringify({"url": "http://my.testsite.com/"}),
  '--format progress',
  //'--format progress-bar',
];

module.exports = {
  default: common.join(' ')
};