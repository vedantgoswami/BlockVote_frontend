
import './App.css';
import Web3 from "web3";
import React, {useEffect, useState} from 'react'
import Electionabi from './contracts/Election.json'
import Navbar from './Navbar';
import Body from './Body';
import Homepage from  './Homepage';
import SideMenu from './SideMenu';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import CandidDetail from './admin/CandidDetail';
import AddCand from './admin/AddCand';
import ChangeState from './admin/ChangeState';
import Analysis from './admin/Analysis';
import Dashboard from './admin/Dashboard';
import AdminLogin from './admin/AdminLogin';
import UserLogin from './User/UserLogin';
import UserRegister from './User/UserRegister';
import UserDash from './User/UserDash';
import Vote from './User/Vote';
import Verification from './admin/Verification';
function App() {
    useEffect(()=>{
        loadWeb3();
        LoadBlockchaindata();
    },[])
    const [currentaccount,setCurrentaccount] = useState("");
    const [loader,setloader] = useState(true);
    const [Electionsm,SetElectionsm] = useState();
    const [Candidate1,SetCandidate1] = useState();
    const [Candidate2,SetCandidate2] = useState();
    const loadWeb3 = async()=>{
    if(window.ethereum){
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if(window.web3){
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else{
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask."
      );
    }
  };
  const LoadBlockchaindata = async()=>{
    setloader(true);
    const web3 = window.web3;
    const accounts =await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
    const networkid = await web3.eth.net.getId();
    const networkData = Electionabi.networks[networkid];
    if(networkData){
      const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
      const candidate1 = await election.methods.candidates(1).call();
      const candidate2 = await election.methods.candidates(2).call();      
      SetCandidate1(candidate1);
      SetCandidate2(candidate2);
      // console.log(candidate1);
      // console.log(candidate2);
      SetElectionsm(election);
      setloader(false);
      // console.log(election);
    }
    else{
      window.alert("The smart contract is not deployed current Network.")
    }
  };
  const voteCandidate = async(candidateid)=>{
    setloader(true);
    await Electionsm
    .methods
    .vote(candidateid)
    .send({from: currentaccount})
    .on('transectionhash',()=>{
      console.log("successfully ran");
    })
    setloader(false);
  }
  if(loader){
    return <div>Loading...</div>
  }
  return (
    <Router>
      <div className="App">
      <Navbar accounts={currentaccount}/>
      <Routes>
        <Route path="/" exact element={<Homepage/>}/>
      <Route
      path="/election"
      exact
      element={
      <Body 
          candidate1={Candidate1}
          candidate2={Candidate2}
          votecandidate={voteCandidate}
          account={currentaccount}/>}
      />
      <Route path="/test" exact element={<AdminLogin />}/>
      <Route path="/admin/candidDetails" exact element={<CandidDetail/>}></Route>
      <Route path="/admin/addCand" exact element={<AddCand/>}></Route>
      <Route path="/admin/chgstate" exact element={<ChangeState/>}></Route>
      <Route path="/admin/analysis" exact element={<Analysis/>}></Route>
      <Route path="/admin/dashboard" exact element={<Dashboard/>}></Route>
      <Route path="/admin/verify" exact element={<Verification/>}></Route>
      <Route path="/admin" exact element={<AdminLogin/>}></Route>
      <Route path="/user/dash" exact element={<UserDash/>} />
      <Route path="/user/login" exact element={<UserLogin/>} />
      <Route path="/user/register" exact element={<UserRegister/>} />    
      <Route path="/user/vote" exact element={<Vote/>}/>
          </Routes>
          </div>
      
    </Router>
  );
}

export default App;
