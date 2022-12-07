import {React,useEffect,useState} from 'react'
import UserSidebar from './UserSidebar'
import img1 from '../images/1.jpeg'
import img2 from '../images/2.jpeg'
import img3 from '../images/3.png'
import img4 from '../images/4.png'
import VoterCard from './Card';
import Electionabi from '../contracts/Election.json';
import Swal from 'sweetalert2';
import Confetti from 'react-confetti';
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from 'recharts'
const Vote = () => {
  const images = [img1,img2,img3]
  const  COLORS1 = ["#ff5722", "#607d8b"];
  const COLORS2 = ["#ff5722", "#8bc34a","#fcdc00"]
  function createData2(
    name,
    value
  ) {
    return { 
      name,value };
  }
    function createData(
        idx,
        ipfsHash,
        candidate_id,
        name,
        age,
        party,
        qualification,
        voteCount
      ) {
        return { 
          idx,
          ipfsHash,
          candidate_id,
          name,
          age,
          party,
          qualification,
        voteCount };
      }
      const reversemap={
        1: 'Registration',
        2: 'Voting',
        3: 'Result'
    }
      var loaded=false;
      var [candidates,Setcandidates] = useState([]);
      var [votestatus,Setvotestatus] = useState(false);
      var [voteraddress,Setvoteraddress] = useState();
      var [currState,SetcurrState]= useState("Voting");
      var [winner , SetWinner] = useState();
      var [flag,Setflag] = useState(false);
      var [pdata2,Setpdata2] = useState([]);
      useEffect(()=>{
        async function LoadBlockchaindata(){
          const web3 = window.web3;
          const networkid = await web3.eth.net.getId();
          const networkData = Electionabi.networks[networkid];
          var CandidateCount=0;
          if(networkData){
            const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
            await election.methods.candidatesCount().call(function(err,res){
              CandidateCount = res;
          
            });
            await election.methods.currVoter().call(function(err,res){
              Setvoteraddress(res);
            });
            
            var win = await election.methods.candidates(0).call();
            for(var i=1;i<=CandidateCount;i++)
            {
                var cand = await election.methods.candidates(i).call();
                // console.log(cand);
                if(win.voteCount<cand.voteCount)
                win=cand;
                Setcandidates((candidates)=>[...Array.from(new Set(candidates)),createData(i,cand.ipfsHash,cand.id,cand.name,cand.age,cand.party,cand.qualification,parseInt(cand.voteCount))]);
                
            }
            SetWinner(win);
            await election.methods.electionState().call(function(err,res){
              SetcurrState(reversemap[res]);
            });
                     
          }
          else{
            window.alert("The smart contract is not deployed current Network.")
          }
          
        };
        if(!loaded)
          LoadBlockchaindata();
        loaded=true;
        
      },[])
      // useEffect(()=>{
      //   const dummy=async()=>
      //   {var CandidateCount=0;
      //     const web3 = window.web3;
      //     const networkid = await web3.eth.net.getId();
      //     const networkData = Electionabi.networks[networkid];
      //   const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
      //   await election.methods.candidatesCount().call(function(err,res){
      //     CandidateCount = res;
      //   });
      //   for(var i=1;i<=CandidateCount;i++)
      //       {
      //           var cand = await election.methods.candidates(i).call();
                
      //           Setcandidates((candidates)=>[...Array.from(new Set(candidates)),createData(i,cand.id,cand.name,cand.age,cand.party,cand.qualification)]);
      //           // Setpdata2((pdata2)=>[...Array.from(new Set(pdata2)),createData2(cand.name,parseInt(cand.voteCount))]);
      //         }
      //   SetWinner(win);}
      //   dummy();
        
      // },[flag])
      // useEffect(()=>{
      //   console.log("Winner",winner);
      // },[winner])
  return (<>

    <UserSidebar value="vote"/>
    {
      currState==="Result"?
    <Confetti
      style={{marginTop: "66px"}}
      width={2048}
      height={768}
    />:<></>
  }
  <section class="home_content">
  
    <div style={{display: "flex"}}>
  <div class="text">Voter's Address:  </div>
  <span style={{color: '#1d1b31',
  marginTop:  '18px',marginLeft: "5px"}}>{voteraddress}</span>
  </div>
    {currState==="Voting"?
      <div style={{display: "flex"}}>
        
       {
        candidates.map((row)=>(
          
          <VoterCard img={row.ipfsHash} idx={row.candidate_id} name={row.name} age={row.age} party={row.party} qualification={row.qualification} button={false}/>
        ))
       }
       </div>:
      
       <div style={{display: 'flex'}}>
       <div class="mb-3 status" style={{alignItems: 'center',textAlign:'center',width: "35%",height: "450px",boxShadow: ' 1px 2px 9px #c1e1c5',marginRight: '20px',marginTop: '20px',marginLeft: '5px',padding: "1em"}}>
        <div class="text">
        Elected Candidate 
    </div>
    <div>
    <VoterCard img={winner.ipfsHash}
               name={winner.name}
               age={winner.age}
               party={winner.party}
               qualification={winner.qualification}
               button={true}
               />
       </div>
       </div>
       <div class="mb-3 status" style={{alignItems: 'center',textAlign:'center',width: "60%",height: "450px",boxShadow: ' 1px 2px 9px #c1e1c5',marginTop: '20px',marginLeft: '20px',padding: "1em"}}>
        <div class="text">
            Result
        </div>
        <ResponsiveContainer>
        <PieChart>
        <Tooltip/>
        {/* <Legend/> */}
        
          <Pie
            data={candidates}
            dataKey="voteCount"
            cx={"50%"}
            cy={"40%"}
            innerRadius={80}
            outerRadius={150}
          >
            {candidates.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS2[index % COLORS2.length]}
              />
            ))}
            
          </Pie>
          
        </PieChart>
      </ResponsiveContainer>
    </div>
      </div>
       
}
       
      
       
    </section>
    </>
  )
}

export default Vote