const IMSToken = artifacts.require('IMSToken')


module.exports = async function (deployer, network, accounts) {
    await deployer.deploy(IMSToken);
    const imsToken = await IMSToken.deployed();


}