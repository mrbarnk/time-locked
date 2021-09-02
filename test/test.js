const TimeLockedGMTContract = artifacts.require('TimeLockedGMTContract')
const truffleAssert = require('truffle-assertions')
const chai = require('chai');
const constants = require('../constants/Constants');
const web3 = require('web3');

let assert = chai.assert;


contract('TimeLockedGMTContract', (accounts) => {
  let contract
  const owner = accounts[0]
  const user = accounts[1]
  const count = web3.utils.toWei('5');
  console.log('count', count);
  // return;
  // create global contract instance before executing tests
  before('setup contract', async () => {
    // contract = await TimeLockedGMTContract.deployed()
    contract = await TimeLockedGMTContract.at(constants.LOCKED_GMT_CONTRACT)
  })
  console.log('contract', contract);

  it('should owner equal accounts[1]', async () => {
    await truffleAssert.passes(
      contract.owner()
    );
    let ownerResult = await contract.owner();
    assert.equal(owner, ownerResult);
  })
  it('should owner equal accounts[1]', async () => {
    const totalSupply = await contract.totalSupply();
    console.log('totalSupply', totalSupply.toString());
  })
  it('should owner equal accounts[1]', async () => {
    const lockedSupply = await contract.lockedSupply();
    console.log('lockedSupply', lockedSupply.toString());
  })

  it('should owner equal accounts[1]', async () => {
    const balanceOf = await contract.balanceOf(owner);
    console.log('balanceOf', balanceOf.toString());
  })
  // it('should passes set count by owner', async () => {
  //   await truffleAssert.passes(
  //     contract.setCount(count, {from: owner})
  //   );
  // })
  // it('should passes get count', async () => {
  //   await truffleAssert.passes(
  //     contract.getCount({from: owner})
  //   );
  // })
  // it('should passes get count', async () => {
  //   await truffleAssert.passes(
  //     contract.getCount({from: user})
  //   );
  // })
  // it('should reverts set count by not owner', async () => {
  //   await truffleAssert.reverts(
  //     contract.setCount(count, {from: user})
  //   );
  // })

  it('should passes putTokensToTimeLock', async () => {
    try {
      const result = await contract.putTokensToTimeLock(count);
      console.log('result', result);
      truffleAssert.eventEmitted(result, 'PutTokens', (ev) => {
        return ev.owner == owner && ev.value == count;
      })
    } catch(e) {
      console.error('error', e);
    }
  })
  it('should return balance', async () => {
    const result = await contract.balanceOf(owner);
    console.log('balanceOf', result.toString());
  })
  it('should return array of purchases', async () => {
    const result = await contract.purchasesOf(owner);
    console.log('purchasesOf', result);
    result.forEach(result => {
      console.log('purchaseOf', result.toString());
    })
  })
  it('should return array of timestamps', async () => {
    const result = await contract.timestampsOf(owner);
    console.log('timestampsOf', result);
    result.forEach(result => {
      console.log('timestampOf', result.toString());
    })
  })
  it('should reverts exactTokens', async () => {
    await truffleAssert.reverts(
      contract.exactTokens()
    );
  })
  it('should passes exactTokens', async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 1000 * 70);
    })
    const result = await contract.exactTokens();
    truffleAssert.eventEmitted(result, 'ExactTokens', (ev) => {
      return ev.to == owner && ev.value == count;
    })
  })
})