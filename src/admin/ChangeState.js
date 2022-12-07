import React, { useState,useEffect } from 'react'
import SideMenu from '../SideMenu'
import Electionabi from '../contracts/Election.json'
import { Navigate, useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie'
import * as loader from "../images/loader.json"
const ChangeState=()=>{
    const map = {
        'Registration': 1,
        'Voting': 2,
        'Result': 3
    }
    const reversemap={
        1: 'Registration',
        2: 'Voting',
        3: 'Result'
    }
    const navigate = useNavigate();
    const [Electionsm,SetElectionsm] = useState();
    const [currentaccount,setCurrentaccount] = useState("");
    var [currState,SetcurrState]=useState('Registration');
    var [elu,Setelu] = useState();
    var [alert,Setalert] = useState(false);
    const defaultOptions = {
        loop: true,
        autoplay: true, 
        animationData: loader.default,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice'
        }
      };
    useEffect(()=>{
        async function LoadBlockchaindata(){
          const web3 = window.web3;
          const networkid = await web3.eth.net.getId();
          const networkData = Electionabi.networks[networkid];
          if(networkData){
            const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
            await election.methods.electionState().call(function(err,res){
              SetcurrState(reversemap[res]);
            });
        };
      }
      LoadBlockchaindata();
    },[])
    useEffect(()=>{
        const dummy=async()=>{
        await Electionsm
                .methods
                .changeState(map[elu])
                .send({from: currentaccount})
                .on('transectionhash',()=>{
                console.log("Good job!", "Registered Sucessfully!", "success");
                })
                SetcurrState(elu);
                Setalert(false);
                // window.location.reload();
            }
            dummy();
    },[elu])
    const handleRadioClick=async(e)=>{
        
        const web3 = window.web3;
        const networkid = await web3.eth.net.getId();
        const networkData = Electionabi.networks[networkid];
        const accounts =await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
          
        if(currState!==e)
            {
            if(networkData){
                const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
                SetElectionsm(election);
                Setelu(e);
                Setalert(true);
                
            }
        }
    }
    
  return (<>
    <SideMenu value="chg"/>
    <section class="home_content">
    {(!alert)?<>
    <div  class="text">Current Phase of Election : <span style={{color: "Red"}}>{currState}</span></div>
    <div class="form_box">
        <label class="icon_label" style={{marginRight: "110px", marginLeft:"80px"}}>
        <i 
        class='bx bx-edit' 
        type='radio'
        defaultChecked
        name='react-radio-btn'
        onClick={() => handleRadioClick('Registration')}
        style={{fontSize: "100px",color: currState==="Registration"?"#4caf50":"black"}}
      
        /><br/>
            
            Registration
        </label>
        <label class="icon_label" style={{marginRight: "110px"}}>
            <i 
            class='bx bx-checkbox-checked' 
            type='radio'
            defaultChecked
            name='react-radio-btn'
            onClick={() => handleRadioClick('Voting')}
            style={{fontSize: "100px",color: currState==="Voting"?"#4caf50":"black"}}
            
            /><br/>
            
        
        Voting
        </label>
        <label class="icon_label">
        <i 
            class='bx bx-food-menu' 
            type='radio'
            defaultChecked
            name='react-radio-btn'
            onClick={() => handleRadioClick('Result')}
            style={{fontSize: "100px",color: currState==="Result"?"#4caf50":"black"}}
            
            /><br/>
        
        Result
        </label>
    </div>
    </>:<>
    <div>
      <Lottie options={defaultOptions}
              height={400}
              width={400}
              />
      </div>
    </>}
    </section>
    </>
  )
};

export default ChangeState;