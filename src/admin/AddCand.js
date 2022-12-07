import React,{ useEffect,useState } from 'react'
import Button from '../Button'
import Inputbox from '../Components/Inputbox'
import SideMenu from '../SideMenu'
import Electionabi from '../contracts/Election.json'
import Swal from 'sweetalert2'
// import ImageUpload from '../Components/ImageUpload'
import { Navigate,useNavigate } from 'react-router-dom'
import Lottie from 'react-lottie'
import { ImageUpload } from 'react-ipfs-uploader'
import * as loader from "../images/loader.json"
const {create} = require("ipfs-http-client")
// const ipfsClient = require("ipfs-api");

// var name;
//     var age;
//     var party;
//     var qualification;
// const fs = require("fs")
const projectId = "2EUMJKh8ahmUurqPCbV9GV6CkuH";
const projectSecret = "6454834870481099a4f8ffc1e2d06254";
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
async function ipfsClient() {
    const ipfs = await create(
        {
            host: "ipfs.infura.io",
            port: 5001,
            protocol: "https",
            apiPath: "/api/v0",
            headers: {
            authorization: auth,
            }
        }
    );
    return ipfs;
}
const AddCand = () => {
  
    const navigate=useNavigate();
    const [selectedFile, SetselectedFile] = useState("");
    const [buffer,Setbuffer] = useState();
    const [hash,setHash] = useState();
    const [Electionsm,SetElectionsm] = useState();
    const [currentaccount,setCurrentaccount] = useState("");
    const [details,Setdetails]=useState([]);
    var [alert,Setalert] = useState(false);
    const defaultOptions = {
      loop: true,
      autoplay: true, 
      animationData: loader.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
    
    const imageUploaded=(e)=>{
      console.log(e.target.files[0].name);
      SetselectedFile(e.target.files[0].name);
      const file = e.target.files[0];
      const reader = new window.FileReader()
      reader.readAsArrayBuffer(file);
      reader.onloadend=()=>{
          Setbuffer(Buffer(reader.result));
      }
    
    //   console.log(result);
    } 
    useEffect(()=>{
      const dummy=async()=>{
      let ipfs = await ipfsClient();
      let result=await ipfs.add(buffer);
      console.log(result['path']);
      setHash(result['path']);
      }
      dummy();
    },[buffer]);
    const handleSubmit=async()=>{
          const web3 = window.web3;
          const networkid = await web3.eth.net.getId();
          const networkData = Electionabi.networks[networkid];
          const accounts =await web3.eth.getAccounts();
          const account = accounts[0];
          setCurrentaccount(account);
          var name =          document.getElementById("Name").value;
          var age =           document.getElementById("Age").value;
          var party =         document.getElementById("Party").value;
          var qualification = document.getElementById("Qualification").value;
          // console.log(name,age,party,qualification);
          Setdetails([name,age,party,qualification]);
          if(networkData){
            const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
            document.getElementById("Name").value="";
            document.getElementById("Age").value=""; 
            document.getElementById("Party").value="";
            document.getElementById("Qualification").value="";
            
            SetElectionsm(election);
            Setalert(true);
            
        }

    }
    useEffect(()=>{
      const dummy=async()=>{
        // var name =          document.getElementById("Name").value;
        // var age =           document.getElementById("Age").value;
        // var party =         document.getElementById("Party").value;
        // var qualification = document.getElementById("Qualification").value;
        var name = details[0];
        var age =  details[1];        
        var party = details[2];
        var qualification = details[3];
        console.log(name,age,party,qualification,hash);
        var flag = false;
        await Electionsm
            .methods
            .addCandidate(name,age,party,qualification,hash)
            .send({from: currentaccount})
            .on('transectionhash',()=>{
            console.log("successfully ran");

            Setalert(false);
            
            }).catch(function(error){
              Setalert(false);
              flag=true;
              Swal.fire(
                'Error!',
                'Transection Rejected!',
                'error'
              )
              window.location.reload();
            })
            if(flag===false)
            {
            Swal.fire(
              'Sucess!',
              'candidate Added Successfully!',
              'success'
            )
              setTimeout(
              window.location.reload(),5000);
            }
            
          
      }
      dummy();
    },[Electionsm])
    return (
  <>
    {(!alert)?<>
      <SideMenu value="add"/>
    <section class="home_content">
    <div  class="text">Add New Candidates</div>
    <div class="form_box">
    <Inputbox value="Name"/>
    <Inputbox value="Age"/>
    <Inputbox value="Party"/>
    <Inputbox value="Qualification"/>
    {/* <ImageUpload setUrl={Setbuffer} /> */}
    <div class="pht">
      <input type="file" id="file"  onChange={imageUploaded}/>
      <label for="file">
      <span class="material-icons">
add_photo_alternate
</span>&nbsp;
        Choose a Photo
      </label>
      <span>{selectedFile}</span>
    </div>
    
    <Button onClick={handleSubmit} text="Submit"/>
    </div>
    </section>
    </>:
    <>
    <div>
      <Lottie options={defaultOptions}
              height={400}
              width={400}
              />
      </div>
    </>}
</>
  )
}

export default AddCand;