import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";
import Profile from "../components/profile";
import Actions from '../components/actions'


export default function HomePage() {

  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async (amount) => {
    if(amount <= 0){
      alert("You must deposit an amount greater than zero.")
      return;
    }
    if (atm) {
      let tx = await atm.deposit(amount);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async (amount) => {
    if(amount <= 0){
      alert("Amount must be greater than zero.")
      return;
    }
    if (atm) {
      let tx = await atm.withdraw(amount);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {

    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    if (!account) {
      return (
        <div className="flex items-center justify-center">
          <button
            className="text-center px-4 py-2 outline outline-slate-700 bg-slate-100 my-4 rounded-md"
            onClick={connectAccount}
          >
            Please connect your Metamask wallet
          </button>
        </div>
      );
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div className=" max-w-sm rounded-md ">
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-t-lg">
          <Profile address={account} balance={balance} />
        </div>
        <div>
          <Actions withdraw={withdraw} deposit={deposit}/>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <>
      <script src="https://cdn.tailwindcss.com"></script>
      <main className="min-h-screen flex justify-center items-center bg-gradient-to-r from-[#ebf4f5] to-[#b5c6e0]">
        <div>{initUser()}</div>
      </main>
    </>
  );
}
