import {React,useState,useEffect} from 'react'
import SideMenu from '../SideMenu'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Electionabi from '../contracts/Election.json'
import Swal from 'sweetalert2';
import { Button } from '@mui/material';
import Lottie from 'react-lottie'
import * as loader from "../images/loader.json"
import { Navigate,useNavigate } from 'react-router-dom';
const Verification = () => {
  const [Electionsm,SetElectionsm] = useState();
    const [currentaccount,setCurrentaccount] = useState("");
    const [_address,Setaddress]=useState();
    const [vtrCount,SetvtrCount]=useState();
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
      const dummy=async()=>{
        await Electionsm
        .methods
        .verifyall()
        .send({from: currentaccount})
        .on('transectionhash',()=>{
        console.log("Good job!", "Registered Sucessfully!", "success");
        })
      Setalert(false);
      // navigate('/admin/verify');
      window.location.reload();
    }
    dummy();
    },[vtrCount])
    const handleConfirm =async()=>{
        
        const web3 = window.web3;
        const networkid = await web3.eth.net.getId();
        const networkData = Electionabi.networks[networkid];
        const accounts =await web3.eth.getAccounts();
        const account = accounts[0];
        setCurrentaccount(account);
          if(networkData){
            const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
            SetElectionsm(election);
            
            await election.methods.votersCount().call(function(err,res){
              SetvtrCount(res);
              Setalert(true);
            });
            
          }
          // window.location.reload();
    }
    useEffect(()=>{
      const dummy=async()=>{
      await Electionsm
      .methods
      .verify(_address)
      .send({from: currentaccount})
      .on('transectionhash',()=>{
      console.log("Good job!", "Registered Sucessfully!", "success");
      })
      Setalert(false);
    await Swal.fire('Verified!', '', 'success');
    // navigate("/admin/verify");
    window.location.reload();
      }
      dummy();
    },[_address])
    const handleClick=async(e)=>{
      const web3 = window.web3;
      const networkid = await web3.eth.net.getId();
      const networkData = Electionabi.networks[networkid];
      const accounts =await web3.eth.getAccounts();
      const account = accounts[0];
      setCurrentaccount(account);
      const address = e.target.id;
      
      if(networkData){
        await Swal.fire({
          title: 'Confirm the Voter!',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm!'
        }).then(async(result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            console.log(networkData);
            const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
              SetElectionsm(election);
              Setaddress(address);
              Setalert(true);
              
            
          } else if (result.isDenied) {
            Swal.fire('Rejected!', '', '')
          }
          
        })
        
        // window.location.reload();
    }
    }
    var loaded=false;
    var votersCount=0;
    function createData(uid,aadhar,verified) {
        return { uid,
          aadhar,
          verified
          
          };
      }
      var [voters,Setvoters] = useState([]);
      useEffect(()=>{
        async function LoadBlockchaindata(){
          
          const web3 = window.web3;
          const networkid = await web3.eth.net.getId();
          const networkData = Electionabi.networks[networkid];
          votersCount=0;
          if(networkData){
            const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
            await election.methods.votersCount().call(function(err,res){
              votersCount = res;
            });
            
            for(var i=1;i<=votersCount;i++)
            {
                var cand = await election.methods.registertemp(i).call();
                // console.log(cand);
                Setvoters((voters)=>[...Array.from(new Set(voters)),createData(cand.uid,cand.aadhar,cand.verified)]);
                
            }
                     
          }
          else{
            window.alert("The smart contract is not deployed current Network.")
          }
          
        };
        if(!loaded)
          LoadBlockchaindata();
        loaded=true;
        
      },[]);
  return (
    <>
    <SideMenu value="verify"/>
    <section class="home_content">
    {(!alert)?
      <>
    <div style={{display: 'flex',justifyContent:"space-between"}}>
    <div  class="text">Voter's Verification</div>
    <Button onClick={handleConfirm} style={{background: "#7CDF7C" ,color: "#fff"}}>Confirm all</Button>
    </div>
    <Paper >
    <TableContainer sx={{maxHeight: 450,overflowY: 'scroll'}}>
      <Table sx={{ minWidth: 650}}  aria-label="sticky table">
        <TableHead style={{background: "#1d1b31",color: "white"}}>
          <TableRow >
            <TableCell style={{color: "#fff"}}>Voter's Address</TableCell>
            <TableCell style={{color: "#fff"}}align="right">Aadhaar Number</TableCell>
            <TableCell style={{color: "#fff"}}align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {
          voters.map((row) => (
            <TableRow
              key={row.uid}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              style={{background: (!row.verified)?"#f44336":"#8bc34a" ,color: "white"}}>
              <TableCell component="th" scope="row" >
                {row.uid}
              </TableCell>
              <TableCell align="right">{row.aadhar}</TableCell>
              <TableCell align="right">{!row.verified?<i  id={row.uid} onClick={handleClick} style={{fontSize: "20px"}} class='bx bx-badge'/>:<i style={{fontSize: "20px"}} class='bx bx-badge-check'/>}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    </Paper></>:
    <>
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
}

export default Verification