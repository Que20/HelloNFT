const Hello = artifacts.require("Hello");

module.exports = function(deployer) {
  deployer.deploy(Hello , '0xDF6F6688C63347FCb95e7511cfD1F09082B4fAA4');
};
