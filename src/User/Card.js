import {React,useEffect,useState} from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, TableRow } from '@mui/material';
import Electionabi from '../contracts/Election.json'
import Swal from 'sweetalert2';
import Button from '../Button';
import Confetti from 'react-confetti'
const VoterCard = ({idx,img,name,age,party,qualification,button}) => {
  console.log(img);
    const [Electionsm,SetElectionsm] = useState();
    const [currentaccount,setCurrentaccount] = useState("");

    useEffect(()=>{
      const dummy=async()=>{
        const web3 = window.web3;
          const networkid = await web3.eth.net.getId();
          const networkData = Electionabi.networks[networkid];
          const accounts =await web3.eth.getAccounts();
          const account = accounts[0];
          setCurrentaccount(account);
          var voteraddress;
          const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
          await election.methods.currVoter().call(function(err,res){
            voteraddress = res;
          });
      await Electionsm
            .methods
            .vote(idx,voteraddress)
            .send({from: account})
            .on('transectionhash',()=>{
            console.log("successfully ran");
            
            Swal.fire("Good job!", "Voted Sucessfully!", "success");
            
            })
          }
          dummy();
    },[Electionsm])

    const handleVote=async(e)=>{
          const web3 = window.web3;
          const networkid = await web3.eth.net.getId();
          const networkData = Electionabi.networks[networkid];
          const accounts =await web3.eth.getAccounts();
          const account = accounts[0];
          setCurrentaccount(account);
          var voteraddress;
          const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
          await election.methods.currVoter().call(function(err,res){
            voteraddress = res;
            console.log(voteraddress);
          });
        //   const id = e.target.id;
          console.log(idx);
          if(networkData){
            const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
            SetElectionsm(election);
            
        }
    }
  return (
    <div className='card text-center' style={{margin: "10px"}}>
        <div className='overflow'>
            <img width="200px" src={`https://infura-ipfs.io/ipfs/${img}`}/>
        </div>
        <div className='card-body text-dark'>
            <h4 className='card-title'>
                {name}
            </h4>
            <p className='card-text text-center text-secondary'>
                <span><b>Age:</b>{age} </span><br/>
                <span><b>Party:</b>{party} </span><br/>
                <span><b>Qualification:</b>{qualification} </span>
            </p>{
            !button?
            <Button id={idx} onClick={handleVote} text="Vote">
                Vote
            </Button>:<></>
}
        </div>
    </div>
  )
}

export default VoterCard