import {React,useEffect,useState} from 'react'
import styled from 'styled-components'
import Typewriter from 'typewriter-effect';
import Button from './Button';
import {Link,useNavigate} from 'react-router-dom';
import Electionabi from './contracts/Election.json'
    
    
const Title = styled.h1`
    font-size: 42px;
    text-transform: capitalize;
    width: 80%;
    color: ${props => props.theme.text};
    align-self: flex-start;
    span{
        text-transform: uppercase;
        font-family: "Alata", cursive;
    }.text-1{
      color: red;
      font-size: 28px;
    }
    .text-2{
      color: blue;
      font-size: 28px;
    }
    .text-3{
      color: green;
      font-size: 28px;
    }
`

const SubTitle = styled.h5`
    font-size: ${props=>props.theme.fontlg};
    text-transform: capitalize;
    color: ${props => `rgba(${props.theme.text},0.6)`};
    font-weight: 600;
    margin-bottom: 1rem;
    width: 80%;
    align-self: flex-start;
`
const ButtonContainer=styled.div`
    width: 80%;
    padding-left: 5px;
    align-self: flex-start;
`


    

const TypeWriterText = () => {
  const [loged,SetLoged]=useState(false);
  var [currState,SetcurrState]=useState('Registration');
  const reversemap={
    1: 'Registration',
    2: 'Voting',
    3: 'Result'
}
    const navigate = useNavigate();
    useEffect(()=>{
        async function LoadBlockchaindata(){
            // console.log("called...");
            const web3 = window.web3;
            const networkid = await web3.eth.net.getId();
            const networkData = Electionabi.networks[networkid];
            if(networkData){
            const election = new web3.eth.Contract(Electionabi.abi,networkData.address);
            await election.methods.admin().call(function(err,res){
              SetLoged(res);
              // console.log(res);
            })
            await election.methods.electionState().call(function(err,res){
              SetcurrState(reversemap[res]);
            });
        }
        else{
          console.log("Not connected");
        }
      }
      LoadBlockchaindata();
    },[])
  return (
    <>
    <Title>
        Transform Voting
        <p><span style={{color: "orange",fontFamily: "samarkan",fontSize: "54px"}}>Block</span><span style={{color: 'green',fontFamily: "samarkan",fontSize: "54px"}}>Vote</span></p>
        <Typewriter
        options={{
            autoStart: true,
            loop: true
        }}
  onInit={(typewriter) => {
    typewriter.typeString('<span class="text-1">Decentralized Voting</span>')
    .pauseFor(2000)
    .deleteAll()
    .typeString('<span class="text-2">Free From Ballot</span>')
    .pauseFor(2000)
    .deleteAll()
    .typeString('<span class="text-3">Vote from anywhere</span>')
    .deleteAll()
    .start()
      
  }}
/>
  
    </Title>
    <SubTitle>Let's move in the world of blockchain. Try this. </SubTitle>
    <ButtonContainer>
        <div>
      <Link to={currState==="Registration"?`/user/register`:`/user/login`}>
    <Button text={currState==="Registration"?"Register":"Login"}/>
    </Link>
    <Link to={loged?"/admin/dashboard":"/admin"}>
    <Button mgleft="5px" text={loged?"Dashboard":"Admin"}/>
    </Link>
    </div>
    </ButtonContainer>
    </>
  )
}

export default TypeWriterText