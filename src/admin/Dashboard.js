import {React,useState,useEffect} from 'react'
import SideMenu from '../SideMenu'
import Electionabi from '../contracts/Election.json'
import img4 from '../images/4.png'
import VoterCard from '../User/Card'
import Confetti from 'react-confetti'
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
const Dashboard = () => {
    var [currState,SetcurrState]=useState('Registration');
    var [voted,Setvoted] = useState(0);
    var [voters,Setvoters] = useState(0);
    var [pdata,Setpdata] = useState([]);
    var [pdata2,Setpdata2] = useState([]);
    var [pdata3,Setpdata3] = useState([]);
    var [flag,Setflag] = useState(false);
    var [winner,SetWinner] = useState(false);
    var [wincand,Setwincand]=useState();
    var [CandidateCount,SetCandidateCount] = useState(0);
    
    const reversemap={
        1: 'Registration',
        2: 'Voting',
        3: 'Result'
    }
    function createData(
      name,
      value
    ) {
      return { 
        name,value };
    }
    function createData2(
      name,
      age,
      party,
      qualification
    ) {
      return { 
        name,age,party,qualification };
  }
    useEffect(()=>{
      console.log("Winner",wincand);
    },[wincand])
    useEffect(()=>{
        async function LoadBlockchaindata(){
          console.log("LoadBlockchaindata wala useEffect");
          const web3 = window.web3;
          const networkid = await web3.eth.net.getId();
          const networkData = Electionabi.networks[networkid];
         
          if(networkData){
            const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
            await election.methods.candidatesCount().call(function(err,res){
              SetCandidateCount(res);
            });
            await election.methods.electionState().call(function(err,res){
              SetcurrState(reversemap[res]);
              if(res === reversemap[res])
                SetWinner(true);
            });
            await election.methods.votedCount().call(function(err,res){
              Setvoted(res);
            });

            await election.methods.votersCount().call(function(err,res){
              Setvoters(res);
            });
            Setflag(true);
        };
        
        // console.log(pdata);
        // console.log(pdata2);
      }
      LoadBlockchaindata();
    },[])
    useEffect(()=>{
      console.log("flag wala useEffect");
      Setpdata((pdata)=>[...Array.from(new Set(pdata)),{name: "voted",value: parseInt(voted)},
      {name: "Non-voted",value: (parseInt(voters)-parseInt(voted))}]);
      var dummy=async()=>{
        const web3 = window.web3;
            const networkid = await web3.eth.net.getId();
            const networkData = Electionabi.networks[networkid];
            const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
            // console.log("candidate count: ",CandidateCount);
            var win=await election.methods.candidates(0).call();;
            for(var i=1;i<=CandidateCount;i++)
              {
                  var cand = await election.methods.candidates(i).call();
                  if(cand.voteCount>win.voteCount)
                    win=cand;
                  Setpdata2((pdata2)=>[...Array.from(new Set(pdata2)),createData(cand.name,parseInt(cand.voteCount))]);
                  
              }
              Setwincand(win);
            }
            dummy();
    },[flag])
    
    // useEffect(()=>{
    //   var dummy=async()=>{
    //       console.log("called...");
    //         const web3 = window.web3;
    //         const networkid = await web3.eth.net.getId();
    //         const networkData = Electionabi.networks[networkid];
    //         const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
    //         console.log("candidate count: ",CandidateCount);
    //         var win=null;
    //         for(var i=1;i<=CandidateCount;i++)
    //           {
    //               var cand = await election.methods.candidates(i).call();
    //               console.log("Candidate Details: ",cand);
    //               if(win===null || cand.voteCount>win.voteCount)
    //                 win=cand;
    //           }
    //         Setwincand(win);
    //         }
    //         dummy();
    // },[winner])
    const  COLORS1 = ["#ff5722", "#607d8b"];
    const COLORS2 = ["#ff5722", "#8bc34a","#fcdc00"]
  return (<>
    <SideMenu value="dash"/>
    {
      currState==="Result"?
    <Confetti
      style={{marginTop: "66px"}}
      width={2048}
      height={768}
    />:<></>
  }
    <section class="home_content"> 
    
    <div class="text">Dashboard</div>
    <div style={{display: 'flex'}}>
    <div class="mb-3 status" style={{alignItems: 'center',textAlign:'center',width: "35%",height: "450px",boxShadow: ' 1px 2px 9px #c1e1c5',marginRight: '20px',marginTop: '20px',marginLeft: '5px',padding: "1em"}}>
        {
            currState==="Registration"?
            <>
            <div class="text">
            Election Status 
        </div>
        <label class="icon_label" style={{position: 'relative',top: "20%"}}>
        <i 
        class='bx bx-edit' 
        type='radio'
        defaultChecked
        name='react-radio-btn'
        style={{fontSize: "100px",color: currState==="Registration"?"#4caf50":"black"}}
      
        /><br/>
            Registration
        </label>
        </>:currState==="Voting"?
        <>
        <div class="text">
        Election Status 
    </div>
        <label class="icon_label" style={{position: 'relative',top: "20%"}}>
            <i 
            class='bx bx-checkbox-checked' 
            type='radio'
            defaultChecked
            name='react-radio-btn'
            style={{fontSize: "100px",color: currState==="Voting"?"#4caf50":"black"}}
            
            /><br/>
        Voting
        </label>
        </>:
        <>
        <div class="text">
        Elected Candidate 
    </div>
    <VoterCard img={wincand.ipfsHash}
               name={wincand.name}
               age={wincand.age}
               party={wincand.party}
               qualification={wincand.qualification}
               button={true}
               />

        </>
        

        
    }


    </div>
    {currState==="Result"?
    <div class="mb-3 status" style={{alignItems: 'center',textAlign:'center',width: "60%",height: "450px",boxShadow: ' 1px 2px 9px #c1e1c5',marginTop: '20px',marginLeft: '20px',padding: "1em"}}>
        <div class="text">
            Result
        </div>
        <ResponsiveContainer>
        <PieChart>
        <Tooltip/>
        <Legend/>
        
          <Pie
            data={pdata2}
            dataKey="value"
            cx={"50%"}
            cy={"40%"}
            innerRadius={80}
            outerRadius={150}
          >
            {pdata.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS2[index % COLORS2.length]}
              />
            ))}
            
          </Pie>
          
        </PieChart>
      </ResponsiveContainer>
    </div>:
    <div class="mb-3 status" style={{alignItems: 'center',textAlign:'center',width: "60%",height: "450px",boxShadow: ' 1px 2px 9px #c1e1c5',marginTop: '20px',marginLeft: '20px',padding: "1em"}}>
        <div class="text">
            Voters Share
        </div>
        <ResponsiveContainer>
        
        <PieChart>
        {/* <Legend layout="vertical" verticalAlign="top" align="right" /> */}
        <Tooltip/>
        
          <Pie
            data={pdata}
            dataKey="value"
            cx={"50%"}
            cy={"40%"}
            innerRadius={50}
            outerRadius={100}
          >
            {
            pdata.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS1[index % COLORS1.length]}
              />
            ))
            }
            
          </Pie>
          
        </PieChart>
      </ResponsiveContainer>
    </div>
}
    </div>
    </section>
</>
  )
}

export default Dashboard;