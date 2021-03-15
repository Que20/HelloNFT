const Hello = artifacts.require("Hello");

module.exports = function(deployer) {
  deployer.deploy(Hello , '0x67c76F852453c2924D7Bb63C075627C9055c0Bba');
};
