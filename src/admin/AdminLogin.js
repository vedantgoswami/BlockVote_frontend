import {React,useState,useEffect} from 'react'
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom';
// import {FaFacebook,FaInstagram,FaTwitter} from 'react-icons/fa';
import Electionabi from '../contracts/Election.json'
import backgroundImg from '../images/admin-bg.jpg'
import Lottie from 'react-lottie'; 
import * as loader from "../images/loader.json"
// import 'core-js/es/array';
const AdminLogin = () => {
    const [Electionsm,SetElectionsm] = useState();
    const [currentaccount,setCurrentaccount] = useState("");
    const [username,Setusername] = useState("");
    const [password,Setpassword] = useState("");
    const [loged,SetLoged]=useState(false);
    var [alert,Setalert] = useState(false);
    const navigate = useNavigate();
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
            await election.methods.getUsername().call(function(err,res){
                Setusername(res);
            });
            await election.methods.admin.call(function(err,res){
              SetLoged(res);
              console.log(res);
            })
            if(loged)
              navigate('/admin/dashboard');

            await election.methods.getPassword().call(function(err,res){
                Setpassword(res);
            });
        };
      }
      LoadBlockchaindata();
    },[])
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
      useEffect(()=>{
          const dummy=async()=>{
            // Setalert(true)
            await Electionsm
                .methods
                .setAdmin(true)
                .send({from: currentaccount})
                .on('transectionhash',()=>{
                console.log("Good job!", "Registered Sucessfully!", "success");
                })
                Setalert(false);
                navigate('/admin/dashboard');
          }
          dummy();
      },[Electionsm])
    const handleLogin=async()=>{
      Setalert(true);
        const usr=document.getElementById("inp1").value;
        const pass=document.getElementById("inp2").value;
        const web3 = window.web3;
        const networkid = await web3.eth.net.getId();
        const networkData = Electionabi.networks[networkid];
        const accounts =await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
        if(username===usr && password===pass){
            if(networkData){
                const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
                SetElectionsm(election);
                
            }
        }
        else{
            await Toast.fire({
                icon: 'warning',
                title: 'Incorrect Username or Password'
              });
            document.getElementById("inp1").value="";
            document.getElementById("inp2").value="";
            
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
              <label class="alabel">Email Username</label>
              <input
                type="username"
                id="inp1"
                className="form-control mt-1"
                placeholder="Enter Username"
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
        </div>:<>
        <div>
      <Lottie options={defaultOptions}
              height={400}
              width={400}
              />
      </div>
        </> }
   
      
    </section>
  )
}

export default AdminLogin