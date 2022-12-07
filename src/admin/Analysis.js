import {React,useState,useEffect} from 'react'
import SideMenu from '../SideMenu'
import Electionabi from '../contracts/Election.json'
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend,
    Tooltip,
    Bar,
    BarChart
} from 'recharts'
const Analysis = () => {
    function createData(
        idx,
        candidate_id,
        name,
        age,
        party,
        qualification
      ) {
        return { 
          idx,
          candidate_id,
          name,
          age,
          party,
          qualification };
      }
      function createData2(
        name,
        vote
      ) {
        return { 
          name,vote};
      }
    const [chart,Setchart] = useState("1");
    var [pdata,Setpdata]=useState([
        // {
        //     name: 'BJP',
        //     vote: 36
        // },
        // {
        //     name: 'AAP',
        //     vote: 52
        // },
        // {
        //     name: 'Congress',
        //     vote: 0

        // },
        // {
        //     name: 'BSP',
        //     vote: 5
        // }
        // {
        //   name: 'Rahul Gandhi',
        //   vote: 2
        // },
        // {
        //   name: 'Narendra Modi',
        //   vote: 4
        // }
    ]);
    var loaded = false;
    var [candidates,Setcandidates] = useState([]);
    var [voteraddress,Setvoteraddress] = useState();
    var [votestatus,Setvotestatus] = useState(false);
      
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
              // console.log(voteraddress);
              // await election.methods.voters(voteraddress).call(function(err,res){
              //       Setvotestatus(res);
              // });
              Setpdata([]);
              for(var i=1;i<=CandidateCount;i++)
              {
                  var cand = await election.methods.candidates(i).call();
                  // console.log(cand);
                  Setpdata((pdata)=>[...Array.from(new Set(pdata)),createData2(cand.name,parseInt(cand.voteCount))]);
                  // pdata.push({
                  //   name: cand.name,
                  //   vote: parseInt(cand.voteCount)
                  // });
                //   Setcandidates((candidates)=>[...Array.from(new Set(candidates)),createData(i,cand.id,cand.name,cand.age,cand.party,cand.qualification)]);
                  
              }
              console.log(pdata);
                       
            }
            else{
              window.alert("The smart contract is not deployed current Network.")
            }
            
          };
          // if(!loaded)
            LoadBlockchaindata();
          
    },[chart]);
    const handleChange=(e)=>{
        Setchart(e.target.value);
    }
  return (
    <>
<SideMenu value="ana"/>
<section class="home_content">
    
<div  class="text">Analysis</div>
    <select name="selectList" id="selectList" onChange={handleChange}>
          <option value="1">Line Chart</option>
          <option value="2">Bar Chart</option>
       </select>
    {
        chart==="1"?
        <ResponsiveContainer width="100%" aspect={3}>
        <LineChart margin={{top: 20}} data={pdata}>
            <CartesianGrid strokeDasharray="3 3"/>
            <XAxis dataKey="name" interval={'preserveStartEnd'} allowDuplicatedCategory={false}/>
            <YAxis />
            <Legend/>
            <Tooltip contentStyle={{backgroundColor: '#fff9c4'}}/>
            <Line type="monotone" strokeWidth={2} stroke="#ff5722" activeDot={{r: 8}} dataKey="vote"/>
            
        </LineChart>  
    </ResponsiveContainer>:
    
    <ResponsiveContainer width="100%" aspect={3}>
        <BarChart width={250}  data={pdata}>
        <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" allowDuplicatedCategory={false}/>
            <YAxis/>
            <Tooltip />
            <Legend/>
            <Bar data={pdata} dataKey="vote" fill="#8bc34a" stroke='#ff5722'/>
        </BarChart>
    </ResponsiveContainer>
    }
</section>
    </>
  )
}

export default Analysis