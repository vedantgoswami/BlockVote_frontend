import {React,useState,useEffect} from 'react'
import Electionabi from '../contracts/Election.json' 
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import backgroundImg from '../images/admin-bg.jpg'
import Lottie from 'react-lottie'
import * as loader from "../images/loader.json"
var address;
var aadhar;
var passwd;
const UserRegister = () => {
  
    const [Electionsm,SetElectionsm] = useState();
    const [currentaccount,setCurrentaccount] = useState("");
    const [username,Setusername] = useState("");
    const [password,Setpassword] = useState("");
    const [loged,SetLoged]=useState(false);
    var [alert,Setalert] = useState(false);
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: loader.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    const navigate = useNavigate();
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
        console.log(address,aadhar,passwd);
        // console.log(currentaccount,address);
        await Electionsm
        .methods
        .registration(address,aadhar,passwd)
        .send({from: currentaccount})
        .on('transectionhash',()=>{
        console.log("Good job!", "Registered Sucessfully!", "success");
        })
        await Toast.fire({
            icon: 'success',
            title: 'Registered in successfully'
          });
        Setalert(false);
        navigate('/');
        }
        dummy();
      },[Electionsm])
    const handleRegister=async()=>{
        const usr=document.getElementById("inp1").value;
        const pass=document.getElementById("inp2").value;
        const web3 = window.web3;
        const networkid = await web3.eth.net.getId();
        const networkData = Electionabi.networks[networkid];
        const accounts =await web3.eth.getAccounts();
        const account = accounts[0];
        address = document.getElementById('inp1').value;
        aadhar = document.getElementById('inp2').value;
        passwd = document.getElementById('inp3').value;
        setCurrentaccount(account);
        
            if(networkData){

                const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
                
                SetElectionsm(election);
                Setalert(true);
                // await Electionsm
                // .methods
                // .registration(address,aadhar,passwd)
                // .send({from: currentaccount})
                // .on('transectionhash',()=>{
                // console.log("Good job!", "Registered Sucessfully!", "success");
                // })
                // await Toast.fire({
                //     icon: 'success',
                //     title: 'Registered in successfully'
                //   });
                // navigate('/');
            }
        
            
            
            
        
    }
  return (
    <section>
      {
        (!alert)?
    <div class="login" height="768px" width="500px" src={backgroundImg} style={{zIndex: "100",marginLeft:"-20px",marginTop: "-200px",minHeight: '768px',minWidth: "400px",backgroundImage: `url(${backgroundImg})`}}>
    <div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Registration</h3>
          <div className="form-group mt-3">
            <label class="alabel">Identity</label>
            <input
              type="username"
              id="inp1"
              className="form-control mt-1"
              placeholder="Enter Block Address "
            />
          </div>
          <div className="form-group mt-3">
            <label class="alabel">Aadhar ID</label>
            <input
              type="username"
              id="inp2"
              className="form-control mt-1"
              placeholder="Enter Aadhar ID "
            />
          </div>
          <div className="form-group mt-3">
            <label class="alabel">Password</label>
            <input
              type="password"
              id="inp3"
              className="form-control mt-1"
              placeholder="Enter password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button onClick={handleRegister}  className="btn btn-primary">
              Register
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
    </>}   
    </section>
  )
}

export default UserRegister