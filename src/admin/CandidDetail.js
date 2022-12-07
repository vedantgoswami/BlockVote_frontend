import React, { useEffect,useState } from 'react'
import SideMenu from '../SideMenu';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Electionabi from '../contracts/Election.json'

const CandidDetail = () => {
  var CandidateCount;
  var loaded=false;
     function createData(
        candidate_id,
        name,
        age,
        party,
        qualification
      ) {
        return { candidate_id,
          name,
          age,
          party,
          qualification };
      }
      var [candidates,Setcandidates] = useState([]);
      useEffect(()=>{
        async function LoadBlockchaindata(){
          
          const web3 = window.web3;
          const networkid = await web3.eth.net.getId();
          const networkData = Electionabi.networks[networkid];
          CandidateCount=0;
          if(networkData){
            const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
            await election.methods.candidatesCount().call(function(err,res){
              CandidateCount = res;
            });
            
            for(var i=1;i<=CandidateCount;i++)
            {
                var cand = await election.methods.candidates(i).call();
                // console.log(cand);
                Setcandidates((candidates)=>[...Array.from(new Set(candidates)),createData(cand.id,cand.name,cand.age,cand.party,cand.qualification)]);
                
            }
                     
          }
          else{
            window.alert("The smart contract is not deployed current Network.")
          }
          
        };
        if(!loaded)
          LoadBlockchaindata();
        loaded=true;
        
      },[])
return (
<>
<SideMenu value="cand"/>
<section class="home_content">
<div  class="text">Registered Candidates</div>
<TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead style={{background: "#1d1b31"}}>
          <TableRow >
            <TableCell style={{color: "#fff"}}>Candidate ID</TableCell>
            <TableCell style={{color: "#fff"}}align="right">Name</TableCell>
            <TableCell style={{color: "#fff"}}align="right">Age</TableCell>
            <TableCell style={{color: "#fff"}}align="right">Party</TableCell>
            <TableCell style={{color: "#fff"}}align="right">Qualification</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
          candidates.map((row) => (
            
            <TableRow
              key={row.candidate_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.candidate_id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.age}</TableCell>
              <TableCell align="right">{row.party}</TableCell>
              <TableCell align="right">{row.qualification}</TableCell>
              {/* <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))
          }
        </TableBody>
      </Table>
    </TableContainer>
    
</section>
</>
);
}

export default CandidDetail