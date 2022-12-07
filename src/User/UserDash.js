import React from 'react'
import SideMenu from '../SideMenu';
import UserSidebar from './UserSidebar';
import backgroundImg from '../images/27797.jpg'
const UserDash = () => {
  return(<>
    <UserSidebar value="info"/>
    <section class="home_content"> 
    <div class="mb-3 status" style={{zIndex: "200",alignItems: 'center',width: "99%",height: "550px",boxShadow: ' 1px 2px 9px #c1e1c5',marginRight: '20px',marginTop: '20px',marginLeft: '5px',padding: "1em"}}>
    <div  class="text" style={{textAlign:'center'}}><span style={{fontFamily: "samarkan",fontSize: "32px"}}>Jai Hind</span></div>
    These are few Guidelines for Voters:<br></br>
    <ol>
      <li style={{listStyleType: "circle"}}><b>Requirements for registering to vote: </b></li>
      <ol>
        <li>are an Indian citizen</li>
        <li>have attained the age of 18 years on the qualifying date i.e. 1st of January of the year of revision of electoral roll</li>
        <li>are ordinarily resident of the part/polling area of the constituency where you want to be enrolled.</li>
        <li>are not disqualified to be enrolled as an elector.</li>
      </ol>
    </ol>
    
    </div>
    </section>
</>
  );
}

export default UserDash