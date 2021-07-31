const { assert } = require('chai');
const IMSToken = artifacts.require('IMSToken')

require('chai').use(
    require('chai-as-promised')
).should()


function tokens(n) {
    return web3.utils.toWei(n, 'Ether')
}

contract('IMSToken', (accounts) => {
    let imsToken;


    before(async () => {
        imsToken = await IMSToken.new();
    });
    describe('IMS Deployment ', async () => {
        it('IMSCoin Check name', async () => {
            const name = await imsToken.name()
            assert.equal(name, 'IMSToken');
        })

        it('IMSCoin Approve and Transfer', async () => {
            await imsToken.approve(accounts[1], tokens('100'), { from: accounts[0] });
            const tok = await imsToken.allowance(accounts[0], accounts[1]);
            assert.equal(tok, tokens('100'));
            await imsToken.transferFrom(accounts[0], accounts[1], tokens('100'), { from: accounts[0] });
            let balance = await imsToken.balanceOf(accounts[1]);
            assert.equal(balance.toString(), tokens('100'))
        })
    })

})

