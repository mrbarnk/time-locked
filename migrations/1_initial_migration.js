const TimeLockedGMTContract = artifacts.require("TimeLockedGMTContract");
const constants = require('../constants/Constants');


module.exports = function (deployer) {
  console.log('bla');
  deployer.deploy(TimeLockedGMTContract);
  // TimeLockedGMTContract.at(constants.LOCKED_GMT_CONTRACT);
};
