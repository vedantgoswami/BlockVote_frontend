import {React,useState,useEffect} from 'react'
import logo from '../images/logo.png'
import {Link,useNavigate} from 'react-router-dom';
import Electionabi from '../contracts/Election.json';
import Swal from 'sweetalert2';
import Lottie from 'react-lottie'; 
import * as loader from "../images/loader.json"
const UserSidebar = ({value}) => {
    const [Electionsm,SetElectionsm] = useState();
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
            
            
        }
    }
    useEffect(()=>{
        const dummy=async()=>{
        await Electionsm
            .methods
            .SetVoter("0x0000000000000000000000000000000000000000")
            .send({from: currentaccount})
            .on('transectionhash',()=>{
            console.log("successfully ran");
            Swal("Good job!", "Logout Sucessful!", "success");
            Setalert(false);
            navigate("/");
        })}
        dummy();
    },[Electionsm]);

return (<>{
(!alert)?
<div class="sidebar" >
    <div class="logo_content">
        <div class="logo">
            <Link to="/">
            <img  width="50px" src={logo}/>
            </Link>
            <div class="logo_name"><span style={{color: "orange"}}>Block</span><span style={{color: "green"}}>Vote</span></div>
         </div>
         <i class='bx bx-menu' id="btn" onClick={handleClick}></i>
     </div>
     <ul class="nav_list">
     <li>
            <Link to="/user/dash">
                <i id="info" class='bx bx-notification'></i>
                <span  class="links_name">Guidelines</span>
            </Link>
            {/* <span class="tooltip">Dashboard</span> */}
        </li>
        <li>
            <Link to="/user/vote">
                <i id="vote" class='bx bx-box'></i>
                <span  class="links_name">Vote</span>
            </Link>
            {/* <span class="tooltip">Dashboard</span> */}
        </li>
        <li>
                <div class="exit" style={{marginLeft: '15px'}}  onClick={handleLogout}>
                    <i class='bx bx-exit'></i>
                    <span  class="links_name">Logout</span>
                </div>
                {/* <span class="tooltip">Dashboard</span> */}
            </li>
     </ul>
 </div>:
 <>
 <Lottie options={defaultOptions}
              height={600}
              width={600}
              />   
 </>}
 </>
)
}

export default UserSidebar