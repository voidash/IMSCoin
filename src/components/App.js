import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar'
import Home from './Home'
import Redeem from './Redeem'
import BoughtItems from './BoughtList';
import About from './About'

//web3 and ethereum stuff
import Web3 from 'web3';
import IMSToken from '../abis/IMSToken.json';


function App() {

  const [activeTab, setActiveTab] = useState('Home');
  const [mounted, setMounted] = useState(false);
  const [account, setAccount] = useState('0x');
  const [balance, setBalance] = useState('0');
  const [imsInstance, setImsInstance] = useState('');
  const [loading, setLoading] = useState(true);
  const [imsAccount,] = useState('0x2202984dF578938D934DBa8479E6822c5dd1ad19');

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. Please install MetaMask Extension from Your browser extension store')
    }
  }

  const loadBlockChainData = async () => {
    const web3 = await window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  }

  if (!mounted) {
    //iife
    (async () => {
      await loadWeb3();
      await loadBlockChainData();
    })()
  }


  useEffect(() => {
    setMounted(true)
    setLoading(false)
  }, []);

  useEffect(() => {

    const loadContract = async () => {
      const web3 = await window.web3;
      const networkId = await web3.eth.net.getId();

      const imsTokenData = IMSToken.networks[networkId];
      if (imsTokenData) {
        const imsToken = new web3.eth.Contract(IMSToken.abi, imsTokenData.address);
        setImsInstance(imsToken)
        let imsTokenBalance = await imsToken.methods.balanceOf(account).call();
        setBalance(imsTokenBalance.toString());
      } else {
        window.alert("IMSCoin hasn't been deployed to the Network. Check if you are connected to ethereum mainnet");
      }
    }

    if (account !== "0x")
      loadContract();
  }, [account]);



  const changeTab = (pos) => {
    setActiveTab(pos);
  }

  const transferTokens = async () => {
    console.log(imsInstance);
    console.log(typeof imsInstance.address);
    console.log(imsInstance.address);
    setLoading(true);
    console.log(account);
    console.log(imsAccount);

    let c = await imsInstance.methods.balanceOf(imsAccount).call();
    console.log(c.toString());
    imsInstance.methods.approve("0xACbCA90CBB08708aE5c15c56cA0F16D23Eed9662", "1000").send({ from: imsAccount });

    // .on('transactionHash',
    //   (hash) => {
    //     // imsInstance.methods.transferFrom(imsAccount, account, '100').send({ from: imsAccount }).on('transactionHash', (hash) => {
    //     //   setLoading(false);
    //     // });
    //   })
  }

  let activeBody;
  switch (activeTab) {
    case 'Redeem':
      activeBody = (<Redeem transfer={transferTokens} />);
      break;
    case 'BoughtItems':
      activeBody = (<BoughtItems />);
      break;
    case 'About':
      activeBody = (<About />);
      break;
    default:
      activeBody = (<Home tab={changeTab} />);
      break;
  };

  return (
    <div>
      <Navbar tab={changeTab} />
      {
        loading ? <h2>Loading</h2> :
          <>
            <div className="max-w-4xl bg-gray-100 p-4 mx-auto mt-4 flex justify-around">
              <div>
                Account:
                <hr />
                {account}
              </div>

              <div>
                IMS Token Balance:
                <hr /> {balance}
              </div>
            </div>
            {activeBody}
          </>
      }
    </div>
  );
}

export default App;
