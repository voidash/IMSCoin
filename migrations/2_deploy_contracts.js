const IMSToken = artifacts.require('IMSToken')
const TokenMediator = artifacts.require('TokenMediator')


module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(IMSToken);
    const imsToken = await IMSToken.deployed();

    await deployer.deploy(TokenMediator, imsToken.address);
    const mediator = await TokenMediator.deployed();

    await imsToken.transfer(mediator.address, '1000000000000000000000000000');
}