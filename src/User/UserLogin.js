import {React,useState,useEffect} from 'react'
import Electionabi from '../contracts/Election.json' 
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import backgroundImg from '../images/admin-bg.jpg'
import Lottie from 'react-lottie'
import * as loader from "../images/loader.json"
var pass;
var usr;
const UserLogin = () => {
    const [Electionsm,SetElectionsm] = useState();
    const [currentaccount,setCurrentaccount] = useState("");
    const [username,Setusername] = useState("");
    const [password,Setpassword] = useState("");
    const [loged,SetLoged]=useState(false);
    const navigate = useNavigate();
    var [alert,Setalert] = useState(false);
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: loader.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    });
    const handleUpdate=async()=>{
      // const usr = document.getElementById("inp1").value;
      const web3 = window.web3;
        const networkid = await web3.eth.net.getId();
        const networkData = Electionabi.networks[networkid];
        const accounts =await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
      await Electionsm
        .methods
        .SetVoter(usr)
        .send({from: currentaccount})
        .on('transectionhash',()=>{
        Swal("Good job!", "Registered Sucessfully!", "success");
                        
        })
          Setalert(false);           
          await Toast.fire({
          icon: 'success',
          title: 'Logged in successfully'
        });
        navigate('/user/dash');
    }
    useEffect(()=>{
      handleUpdate();
    },[Electionsm])
    
    const handleLogin=async()=>{
        usr=document.getElementById("inp1").value;
        pass=document.getElementById("inp2").value;
        const web3 = window.web3;
        const networkid = await web3.eth.net.getId();
        const networkData = Electionabi.networks[networkid];
        const accounts =await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
        var matdata = await election.methods.register(usr).call();
            if(networkData){
              try{
              if(matdata.password===pass)
              {
                if(matdata.verified)
                    {
                        const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
                        SetElectionsm(election);
                        Setalert(true);
                        // console.log(Electionsm);
                        // handleUpdate(usr,currentaccount);
                        
                  }
                else{
                  Swal.fire({
                    icon: 'error',
                    title: 'Your Registration is not Accepted!',
                    text: 'or you have not registered!'
                    
                  })
                  document.getElementById("inp1").value="";
                document.getElementById("inp2").value="";
                }
              }
            
              else
              {
                await Toast.fire({
                  icon: 'warning',
                  title: 'Invalid Block Address or Password'
                });
                document.getElementById("inp1").value="";
                document.getElementById("inp2").value="";
              }
            }
            catch(err)
            {
              console.log("error",err)
              await Toast.fire({
                icon: 'warning',
                title: 'Invalid Block Address or Password'
              });
              document.getElementById("inp1").value="";
              document.getElementById("inp2").value="";
            }
              // console.log(matdata); 
            }   
    }
  return (
    <section>

  {(!alert)?
    <div class="login" height="768px" width="500px" src={backgroundImg} style={{zIndex: "100",marginLeft:"-20px",marginTop: "-200px",minHeight: '768px',minWidth: "400px",backgroundImage: `url(${backgroundImg})`}}>
  <div className="Auth-form-container">
    <div className="Auth-form">
      <div className="Auth-form-content">
        <h3 className="Auth-form-title">Login In</h3>
        <div className="form-group mt-3">
          <label class="alabel">Block ID</label>
          <input
            type="username"
            id="inp1"
            className="form-control mt-1"
            placeholder="Enter BLOCK ID"
          />
        </div>
        <div className="form-group mt-3">
          <label class="alabel">Password</label>
          <input
            type="password"
            id="inp2"
            className="form-control mt-1"
            placeholder="Enter password"
          />
        </div>
        <div className="d-grid gap-2 mt-3">
          <button onClick={handleLogin}  className="btn btn-primary">
            Login
          </button>
        </div>
        
      </div>
    </div>
  </div>
  </div>:
  <>
    <div>
      <Lottie options={defaultOptions}
              height={400}
              width={400}
              />
      </div>
  </>  } 
    </section>
  )
}

export default UserLogin