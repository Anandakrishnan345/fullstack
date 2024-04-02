// import React,{useEffect,useState} from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Link } from "react-router-dom";
// function ViewUser(){
//     const[data,setData] =useState({});
//     const { id } = useParams();
// console.log("ID:", id);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3000/viewuser/${id}`);
//                 console.log('Response:', response);
//                 setData(response.data.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
            
//         };
//         fetchData();
//     }, [id]);
    
//     return (
//         <>
//          <div className="ctn">
//         <div className="title">
//             <h1>Users</h1>
//         </div>
        
//             {data.length ? (
//                 data.map((user) => (
                   
//                     <div className="userctn" key={user._id} style={{border:"2px solid black" , display:"flex",flexDirection:"column",width:"300px",margin:"auto",gap:"5px",marginTop:"8px"}}>
//                         <div style={{ margin: "auto", borderBottom:"1px solid black",padding:"10px"}}>User-details</div>

//                     <div className="details" style={{margin:"auto",display:"flex",flexDirection:"column",justifyContent:"center",gap:"5px",padding:"10px"}}>
//                         <div style={{padding:"5px"}}>name: {data.name} </div>
//                         <div style={{padding:"5px"}}>email : {data.email}</div>
//                         <div style={{padding:"5px"}}>ph.number: {data.phonenumber}</div>
//                         <div style={{padding:"5px"}}>pincode: {data.pincode}</div>
//                         <div style={{padding:"5px"}}>Address: {data.Address}</div>
//                         <div style={{padding:"5px"}}><Link to={`/update/${user._id}`}><button>update user</button></Link></div>
        
//                     </div>
        
//                 </div>
//                 ))
//             ) : (
//                 <h1>Loading....</h1>
//             )}
//        </div>

//         </>
//     );
// }export default ViewUser
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

function ViewUser() {
    const [data, setData] = useState({});
    const { id } = useParams();
    console.log("ID:", id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/viewuser/${id}`);
                console.log('Response:', response);
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    return (
        <>
            <div className="ctn">
                <div className="title">
                   <h1>Users</h1>
                </div>

                {Object.keys(data).length ? (  // Check if data is not an empty object
                    <div className="userctn" style={{ border: "2px solid black", display: "flex", flexDirection: "column", width: "300px", margin: "auto", gap: "5px", marginTop: "8px" }}>
                        <div style={{ margin: "auto", borderBottom: "1px solid black", padding: "10px" }}>User-details</div>

                        <div className="details" style={{ margin: "auto", display: "flex", flexDirection: "column", justifyContent: "center", gap: "5px", padding: "10px" }}>
                            <div style={{ padding: "5px" }}>name: {data.name} </div>
                            <div style={{ padding: "5px" }}>email: {data.email}</div>
                            <div style={{ padding: "5px" }}>ph.number: {data.phonenumber}</div>
                            <div style={{ padding: "5px" }}>pincode: {data.pincode}</div>
                            <div style={{ padding: "5px" }}>Address: {data.Address}</div>
                            <div style={{ padding: "5px" }}><Link to={`/update/${data._id}`}><button>update user</button></Link></div>
                            <div style={{ padding: "5px" }}><Link to={`/delete/${data._id}`}><button>delete user</button></Link></div>
                        </div>
                    </div>
                ) : (
                    <h1>Loading....</h1>
                )}
            </div>
        </>
    );
}

export default ViewUser;
