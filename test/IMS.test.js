const assert = require('chai');

require('chai').user(
    require('chai-as-promised')
).should()


function tokens(n) {
    return web3.utils.toWei(n, 'Ether')
}

