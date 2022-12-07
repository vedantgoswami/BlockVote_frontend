import React, { useEffect ,useState} from 'react'
import logo from './images/logo.png'
import {Link,useNavigate} from 'react-router-dom';
import Electionabi from './contracts/Election.json';
import Lottie from 'react-lottie'; 
import * as loader from "./images/loader.json"
const SideMenu = ({value}) => {
        const [Electionsm,SetElectionsm] = useState();
        const [Electionsm2,SetElectionsm2] = useState();
        const [currentaccount,setCurrentaccount] = useState("");
        var [alert,Setalert] = useState(false);
        const navigate=useNavigate();
        const defaultOptions = {
            loop: true,
            autoplay: true, 
            animationData: loader.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };
        const handleClick=()=>{
            
            // console.log("clicked");
  
            var elements=document.getElementsByClassName('sidebar');
            for (var i = 0; i < elements.length; i++) {
                elements[i].classList.toggle("active");
            }
        }
        const ResetContract=async()=>{
            const web3 = window.web3;
            const networkid = await web3.eth.net.getId();
            const networkData = Electionabi.networks[networkid];
            const accounts =await web3.eth.getAccounts();
            const account = accounts[0];
            setCurrentaccount(account);
            if(networkData){
                const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
                SetElectionsm2(election);
            }

        }
        const handleLogout=async()=>{
            const web3 = window.web3;
            const networkid = await web3.eth.net.getId();
            const networkData = Electionabi.networks[networkid];
            const accounts =await web3.eth.getAccounts();
            const account = accounts[0];
            setCurrentaccount(account);
            Setalert(true);
            if(networkData){
                const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
                SetElectionsm(election); 
                // await Electionsm
                // .methods
                // .setAdmin(false)
                // .send({from: currentaccount})
                // .on('transectionhash',()=>{
                // console.log("Good job!", "Registered Sucessfully!", "success");
                // })
            }
        }
        useEffect(()=>{
            const dummy=async()=>{
            await Electionsm
                .methods
                .setAdmin(false)
                .send({from: currentaccount})
                .on('transectionhash',()=>{
                console.log("Good job!", "Registered Sucessfully!", "success");
                })
                Setalert(false);
                navigate("/");
            }
            dummy();
        },[Electionsm])

        useEffect(()=>{
            const dummy=async()=>{
            await Electionsm2
                .methods
                .reset()
                .send({from: currentaccount})
                .on('transectionhash',()=>{
                console.log("Good job!", "Registered Sucessfully!", "success");
                })
                navigate("/");
            }
            dummy();
        },[Electionsm2]);

        
        useEffect(()=>
            {
            var items = document.getElementById(value);
            // console.log("val: ",items);
            items.classList.add("on");
            // for (var i = 0; i < items.length; i++) {
            //     items[i].classList.add("on");
            // }
        },[])
        
            // .classList.toggle("active");
        
    
    return (<>
    { (!alert)?
    <div class="sidebar" >
        <div class="logo_content">
            <div class="logo">
                <Link to="/">
                <img  width="50px" src={logo}/>
                </Link>
                <div class="logo_name" ><span style={{color: "orange",fontFamily: "samarkan",fontSize:"28px"}}>Block</span><span style={{color: "green",fontFamily: "samarkan",fontSize:"28px"}}>Vote</span></div>
             </div>
             <i class='bx bx-menu' id="btn" onClick={handleClick}></i>
         </div>
         <ul class="nav_list">
         <li>
                <Link to="/admin/verify">
                    <i id="verify" class='bx bx-user-check'></i>
                    <span  class="links_name">Verify Voter</span>
                </Link>
                {/* <span class="tooltip">Dashboard</span> */}
            </li>
            <li>
                <Link to="/admin/dashboard">
                    <i id="dash" class='bx bx-grid-alt'></i>
                    <span  class="links_name">Dashboard</span>
                </Link>
                {/* <span class="tooltip">Dashboard</span> */}
            </li>
            <li>
                <Link to="/admin/candidDetails">
                <i id="cand" class=' bx bxs-user-detail' ></i>
                    <span  class="links_name">Candidate Detail</span>
                </Link>
                {/* <span class="tooltip">Candidate Detail</span> */}
            </li>
            <li>
                <Link to="/admin/addCand">
                <i id="add" class=' bx bxs-user-plus' ></i>
                    <span  class="links_name">Add Candidate</span>
                </Link>
                {/* <span class="tooltip">Add Candidate</span> */}
            </li>
            <li>
                <Link to="/admin/analysis">
                <i id="ana" class='bx bxs-pie-chart-alt-2' ></i>
                    <span  class="links_name">Analysis</span>
                </Link>
                {/* <span class="tooltip">Analysis</span> */}
            </li>
            <li>
                <Link to="/admin/chgstate">
                <i id="chg" class='bx bx-rotate-right' ></i>   
                 <span class="links_name">Change State</span>
                </Link>
                {/* <span class="tooltip">Change State</span> */}
            </li>
            <li>
                <div class="exit" style={{marginLeft: '15px'}} onClick={ResetContract}>
                <i id="chg" class='bx bx-refresh' ></i>   
                 <span class="links_name">Reset Voting</span>
                </div>
                {/* <span class="tooltip">Change State</span> */}
            </li>
            <li>
                <div class="exit" style={{marginLeft: '15px'}}  onClick={handleLogout}>
                    <i class='bx bx-exit'></i>
                    <span  class="links_name">Logout</span>
                </div>
                {/* <span class="tooltip">Dashboard</span> */}
            </li>
         </ul>
     </div>:<>
     <Lottie options={defaultOptions}
              height={550}
              width={550}
              />
     </>}
     </>
  )
}

export default SideMenu;