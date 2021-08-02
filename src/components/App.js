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
import TokenMediator from '../abis/TokenMediator.json';

//axios 
import axios from 'axios';


function App() {

  const [activeTab, setActiveTab] = useState('Home');
  const [mounted, setMounted] = useState(false);
  const [account, setAccount] = useState('0x');
  const [balance, setBalance] = useState('0');
  const [imsInstance, setImsInstance] = useState('');
  const [mediator, setMediatorInstance] = useState('');
  const [loading, setLoading] = useState(true);
  const [imsAccount,] = useState('0x2202984dF578938D934DBa8479E6822c5dd1ad19');
  const [tableData, setTableData] = useState('');

  const [message, setshowMessage] = useState('');

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

      const mediatorData = TokenMediator.networks[networkId];
      if (mediatorData) {
        const med = new web3.eth.Contract(TokenMediator.abi, mediatorData.address);
        setMediatorInstance(med);
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

  const showBoughtItems = async (uid) => {
    try {
      const response = await axios.get(`https://voidash.pythonanywhere.com/product/redeem/${uid}/`);
      console.log(response.data);
      console.log(response.data.message);

      if (response.data.message === 'Error: Code not valid!!!') {
        setshowMessage('The code you are trying to redeem is not valid. Please recheck it');
      } else {
        try {
          const getReceipt = await axios.get(`https://voidash.pythonanywhere.com/product/receipt/${uid}/`);
          console.log(getReceipt.data);
          let quantity = getReceipt.data['quantity'].split(",");
          let products = getReceipt.data['product'];

          let tableMap = products.map(
            (data, index) => {
              return (<tr>
                <th className="py-2 pl-2 text-xs text-lightblue-600 whitespace-pre border-b-2">{data['product_name']}</th>
                <th className="py-2 pl-2 text-xs text-lightblue-600 whitespace-pre border-b-2">{quantity[index]}</th>
                <th className="py-2 pl-2 text-xs text-lightblue-600 whitespace-pre border-b-2">{data['product_max_price']}</th>
                <th className="py-2 pl-2 text-xs text-lightblue-600 whitespace-pre border-b-2">{data['product_max_price'] * quantity[index]}</th>
              </tr>);
            }
          );
          setTableData(tableMap);

        } catch (error) {
          console.log("this shouldn't happen");
        }
        setshowMessage('Showing you the data');
      }

    } catch (error) {
      // if error has response
      setshowMessage(`Error Communicating with server`);
      if (error.response) {
        console.log(error.response.data);
      }
    }

  }

  const validateUID = async (uid) => {
    try {
      const response = await axios.get(`https://voidash.pythonanywhere.com/product/redeem/${uid}/`);
      console.log(response.data);
      console.log(response.data.message);

      if (response.data.message === 'Error: Code not valid!!!') {
        setshowMessage('The code you are trying to redeem is not valid. Please recheck it');
      } else if (response.data.message === 'Error: Code already redeemed!!!') {
        setshowMessage('The code you used has already been redeemed');
      } else if (response.data.message === 'Congrats! You redeemed your token') {
        try {
          const getReceipt = await axios.get(`https://voidash.pythonanywhere.com/product/receipt/${uid}/`);
          let tokenAmountToRedeem = (parseInt(parseInt(getReceipt.data['purchase_price']) / 1000 * 100) + '');
          console.log(tokenAmountToRedeem);
          setshowMessage(`Now redeeming your token. The token rewarded is ${tokenAmountToRedeem} Please refresh your browser after transaction has been completed.`);
          transferTokens(tokenAmountToRedeem);
        } catch (e) {
          setshowMessage('Error');
        }
      }

    } catch (error) {
      // if error has response
      setshowMessage(`Error Communicating with server`);
      if (error.response) {
        console.log(error.response.data);
      }
    }

  }

  const transferTokens = async (amount) => {
    console.log(imsInstance);
    console.log(typeof imsInstance.address);
    console.log(imsInstance.address);
    setLoading(true);
    console.log(account);
    console.log(imsAccount);

    let c = await imsInstance.methods.balanceOf(imsAccount).call();
    console.log(c.toString());

    let d = await imsInstance.methods.name().call();
    console.log(d);
    mediator.methods.redeemTokens(`${amount}`).send({ from: account }).on('transactionHash', (hash) => {
      setLoading(false);
    });
  }

  let activeBody;
  switch (activeTab) {
    case 'Redeem':
      activeBody = (<Redeem transfer={validateUID} message={message} />);
      break;
    case 'BoughtItems':
      activeBody = (<BoughtItems data={tableData} viewItems={showBoughtItems} message={message} />);
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
