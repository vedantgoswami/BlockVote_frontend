import React, { useState } from 'react';

const Body = ({
    candidate1,
    candidate2,
    votecandidate,
    account,
    }) => {
    const [candidate,setCandidate]=useState("");
    const onchnage=(e)=>{
        setCandidate(e.target.value);
    };
    const onsubmit=async(e)=>{
        e.preventDefault();
        if(candidate.id!=0) 
            await votecandidate(Number(candidate));
        else window.alert("there is error in submission")
        window.location.reload();
    }
    return (
    <div className='mt-4 text-center justify-content-center' style={{ color: "#000000" }}>
        <h2>Election Results</h2>
        <hr
            style={{
                width: "100%",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: "#000000",
            }}
        />
        <div className="p-3 ml-auto mr-auto" style={{width: "100%"}}>
            <div className="row ml-auto mr-auto mb-2" style={{width: "90%"}}>
                <div className="col">
                    <p>#</p>
                </div>
                <div className="col">
                    <p>Name</p>
                </div>
                <div className="col">
                    <p>Votes</p>
                </div>
            </div>
            <hr
                style={{width: "90%",borderStyle: "solid",borderColor: "#000000"}} 
            />
            <div 
                className="row ml-auto mr-auto mt-2 mb-2"
                style={{width: "90%"}}
            >
                <div className="col">
                    <p>{candidate1.id}</p>
                </div>
                <div className="col">
                    <p>{candidate1.name}</p>
                </div>
                <div className="col">
                    <p>{candidate1.voteCount}</p>
                </div>
            </div>
            <hr
                style={{width: "90%",borderStyle: "solid",borderColor: "#000000"}} 
            />
            <div 
                className="row ml-auto mr-auto mt-2 mb-2"
                style={{width: "90%"}}
            >
                <div className="col">
                    <p>{candidate2.id}</p>
                </div>
                <div className="col">
                    <p>{candidate2.name}</p>
                </div>
                <div className="col">
                    <p>{candidate2.voteCount}</p>
                </div>
            </div>
        </div>
        <div className="my-5 mr-auto ml-auto text-center " style={{width: "100%"}}>
            <h5>Cast Your Vote: </h5>
            <form onSubmit={onsubmit} style={{alignItems: 'center'}} >
                <div style={{width: '800px'}}>
                <select align-items="center" display="flex"  size="lg" name="candidate" className="form-control" onChange={onchnage}>
                    <option defaultValue value="">
                        Select
                    </option>
                    <option value="1">{candidate1.name}</option>
                    <option value="2">{candidate2.name}</option>
                </select>
                </div>
                <button className="btn btn-primary mt-2 btn-md w-10">
                    Vote Candidate{" : "}{candidate}
                </button>
            </form>
        </div>
        <p>
            Your Address: <span className='font-weight-bold'>{account}</span>
        </p>
    </div>
  );
}

export default Body